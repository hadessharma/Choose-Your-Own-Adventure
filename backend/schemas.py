from typing import List, Optional
from pydantic import BaseModel

# --- Database / Internal Schemas ---

class OptionBase(BaseModel):
    label: str
    to_node_id: Optional[int] = None

class OptionCreate(OptionBase):
    target_node_index: int 

class NodeBase(BaseModel):
    content: str
    is_ending: bool = False

class NodeCreate(NodeBase):
    id: int 
    options: List["OptionCreateForUpload"] = []

class OptionCreateForUpload(BaseModel):
    label: str
    to_node_id: int 

class StoryCreate(BaseModel):
    title: str
    genre: str
    blurb: str
    start_node_id: int 
    nodes: List[NodeCreate]

class Option(OptionBase):
    id: int
    to_node_id: int

    class Config:
        orm_mode = True

class Node(NodeBase):
    id: int
    story_id: int
    options: List[Option] = []

    class Config:
        orm_mode = True

class Story(BaseModel):
    id: int
    title: str
    genre: str
    blurb: str
    start_node_id: Optional[int] = None

    class Config:
        orm_mode = True

# Response for Play
class PlayNode(NodeBase):
    id: int
    options: List[Option]

    class Config:
        orm_mode = True

# --- New Flexible Upload Schemas ---

class OptionUpload(BaseModel):
    label: str
    target_node_id: str

class NodeUpload(BaseModel):
    id: str
    text: str
    is_ending: bool = False
    options: List[OptionUpload] = []

class StoryUpload(BaseModel):
    title: str
    genre: str
    description: str
    nodes: List[NodeUpload]
