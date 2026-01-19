from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db, engine, Base
import models, schemas
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Create tables if not exist (redundant if init_db run, but safe)
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload_story")
def upload_story(story: schemas.StoryCreate, db: Session = Depends(get_db)):
    # 1. Create Story
    db_story = models.Story(
        title=story.title,
        genre=story.genre,
        blurb=story.blurb
    )
    db.add(db_story)
    db.commit()
    db.refresh(db_story)

    # Map temporary IDs in upload to real DB IDs
    # Upload format: nodes list, each has 'id' (temp) and 'options' with 'to_node_id' (temp)
    
    temp_id_map = {} # temp_id -> db_id

    # 2. Create Nodes first (without options)
    # We need to process all nodes to get their DB IDs
    for node_data in story.nodes:
        db_node = models.Node(
            story_id=db_story.id,
            content=node_data.content,
            is_ending=node_data.is_ending
        )
        db.add(db_node)
        db.commit()
        db.refresh(db_node)
        temp_id_map[node_data.id] = db_node.id
    
    # 3. Create Options and Link Start Node
    for node_data in story.nodes:
        current_real_id = temp_id_map[node_data.id]
        for option_data in node_data.options:
            if option_data.to_node_id not in temp_id_map:
                raise HTTPException(status_code=400, detail=f"Option points to unknown node ID: {option_data.to_node_id}")
            
            db_option = models.Option(
                from_node_id=current_real_id,
                to_node_id=temp_id_map[option_data.to_node_id],
                label=option_data.label
            )
            db.add(db_option)
    
    # Set start node
    if story.start_node_id not in temp_id_map:
         raise HTTPException(status_code=400, detail=f"Start node ID {story.start_node_id} not found in uploaded nodes")

    db_story.start_node_id = temp_id_map[story.start_node_id]
    db.add(db_story)

    db.commit()
    return {"status": "success", "story_id": db_story.id}

@app.get("/stories", response_model=List[schemas.Story])
def get_stories(genre: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Story)
    if genre:
        query = query.filter(models.Story.genre == genre)
    return query.all()

@app.get("/story/{id}/play", response_model=schemas.PlayNode)
def play_story(id: int, db: Session = Depends(get_db)):
    story = db.query(models.Story).filter(models.Story.id == id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    
    start_node = db.query(models.Node).filter(models.Node.id == story.start_node_id).first()
    if not start_node:
        raise HTTPException(status_code=404, detail="Start node not found")
    
    return start_node

@app.post("/story/next", response_model=schemas.PlayNode)
def next_node(current_node_id: int, choice_id: int, db: Session = Depends(get_db)):
    # Verify the choice exists and is valid for current node
    # Actually payload should probably be just {choice_id} or {current_node_id, choice_id}
    # But wait, choice_id (Option ID) uniquely identifies the transition.
    
    option = db.query(models.Option).filter(models.Option.id == choice_id).first()
    if not option:
        raise HTTPException(status_code=404, detail="Option not found")
    
    if option.from_node_id != current_node_id:
        raise HTTPException(status_code=400, detail="Invalid option for current node")

    next_n = db.query(models.Node).filter(models.Node.id == option.to_node_id).first()
    return next_n

# Pydantic model for Next Node Request
class NextNodeRequest(BaseModel):
    current_node_id: int
    choice_id: int

@app.post("/story/next_param") 
def next_node_endpoint(req: NextNodeRequest, db: Session = Depends(get_db)):
    return next_node(req.current_node_id, req.choice_id, db)
