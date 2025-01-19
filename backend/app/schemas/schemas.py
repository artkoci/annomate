from pydantic import BaseModel
from typing import List, Optional

class AnnotationBase(BaseModel):
    x: float
    y: float
    width: float
    height: float
    label: str

class AnnotationCreate(AnnotationBase):
    pass

class Annotation(AnnotationBase):
    id: int
    image_id: int

    class Config:
        from_attributes = True

class ImageBase(BaseModel):
    filename: str

class ImageCreate(ImageBase):
    pass

class Image(ImageBase):
    id: int
    filepath: str
    annotations: List[Annotation] = []

    class Config:
        from_attributes = True 