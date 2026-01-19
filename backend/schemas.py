from typing import List, Optional
from pydantic import BaseModel

class OptionBase(BaseModel):
    label: str
    to_node_id: Optional[int] = None # For upload, might be relative or index? Or we assume explicit IDs in upload? 
    # Actually, for upload, we probably want to ignore database IDs and use temporary IDs or just structure.
    # The requirement says: "Accepts a JSON object representing a full story tree (nodes + options)".
    # Let's assume nested structure or list of nodes.

class OptionCreate(OptionBase):
    target_node_index: int # helper to link nodes in the list if using list upload
    # OR 
    # from_node_id: int
    # to_node_id: int
    pass

class NodeBase(BaseModel):
    content: str
    is_ending: bool = False

class NodeCreate(NodeBase):
    # If uploading a list of nodes, we might need a temporary ID to link options.
    id: int # Client-side ID for linking
    options: List["OptionCreateForUpload"] = []

class OptionCreateForUpload(BaseModel):
    label: str
    to_node_id: int # Points to the 'id' in NodeCreate

class StoryCreate(BaseModel):
    title: str
    genre: str
    blurb: str
    start_node_id: int # Points to the 'id' in NodeCreate of the start node
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
    start_node_id: int

    class Config:
        orm_mode = True

# Response for Play
class PlayNode(NodeBase):
    id: int
    options: List[Option]

    class Config:
        orm_mode = True
