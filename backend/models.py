from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class Story(Base):
    __tablename__ = "stories"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    genre = Column(String, index=True)
    blurb = Column(String)
    start_node_id = Column(Integer, nullable=True) # Can be null initially if nodes aren't created yet, or linked after.

    nodes = relationship("Node", back_populates="story", cascade="all, delete-orphan")

class Node(Base):
    __tablename__ = "nodes"

    id = Column(Integer, primary_key=True, index=True)
    story_id = Column(Integer, ForeignKey("stories.id"))
    content = Column(Text)
    is_ending = Column(Boolean, default=False)

    story = relationship("Story", back_populates="nodes")
    # Options leading out from this node
    options = relationship("Option", foreign_keys="[Option.from_node_id]", back_populates="from_node", cascade="all, delete-orphan")

class Option(Base):
    __tablename__ = "options"

    id = Column(Integer, primary_key=True, index=True)
    from_node_id = Column(Integer, ForeignKey("nodes.id"))
    to_node_id = Column(Integer, ForeignKey("nodes.id")) # Defines the transition
    label = Column(String)

    from_node = relationship("Node", foreign_keys=[from_node_id], back_populates="options")
    to_node = relationship("Node", foreign_keys=[to_node_id])
