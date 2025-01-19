from sqlalchemy import Column, Integer, String, Float, ForeignKey, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Image(Base):
    __tablename__ = "images"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, unique=True, index=True)
    filepath = Column(String)
    annotations = relationship("Annotation", back_populates="image")

class Annotation(Base):
    __tablename__ = "annotations"
    
    id = Column(Integer, primary_key=True, index=True)
    x = Column(Float)
    y = Column(Float)
    width = Column(Float)
    height = Column(Float)
    label = Column(String)
    image_id = Column(Integer, ForeignKey("images.id"))
    image = relationship("Image", back_populates="annotations")

# Create SQLite database
engine = create_engine("sqlite:///./app.db")
Base.metadata.create_all(bind=engine) 