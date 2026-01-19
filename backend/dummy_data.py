from database import SessionLocal, engine
import models

def create_dummy_data():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if data exists
    if db.query(models.Story).first():
        print("Data already exists.")
        db.close()
        return

    print("Seeding data...")

    # Create Story
    story = models.Story(
        title="The Haunted House",
        genre="Horror",
        blurb="You perform a dare to enter the old mansion on the hill. Will you survive?"
    )
    db.add(story)
    db.commit()
    db.refresh(story)

    # Create Nodes
    node1 = models.Node(story_id=story.id, content="You stand before the creaky door. It's dark.", is_ending=False)
    node2 = models.Node(story_id=story.id, content="You enter the hall. A ghost appears!", is_ending=True) # Bad ending
    node3 = models.Node(story_id=story.id, content="You run away effectively. You are safe.", is_ending=True) # Good ending
    
    db.add(node1)
    db.add(node2)
    db.add(node3)
    db.commit()
    db.refresh(node1)
    db.refresh(node2)
    db.refresh(node3)

    # Link Story to Start Node
    story.start_node_id = node1.id
    db.add(story)

    # Create Options
    opt1 = models.Option(from_node_id=node1.id, to_node_id=node2.id, label="Enter the house")
    opt2 = models.Option(from_node_id=node1.id, to_node_id=node3.id, label="Run away")

    db.add(opt1)
    db.add(opt2)
    db.commit()

    print("Seeding complete.")
    db.close()

if __name__ == "__main__":
    create_dummy_data()
