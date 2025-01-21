import os
from fastapi import FastAPI, File, UploadFile, Depends, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Dict
import shutil

from app.models.models import Base, Image, Annotation, engine
from app.schemas.schemas import ImageCreate, Image as ImageSchema, AnnotationCreate, Annotation as AnnotationSchema

app = FastAPI(title="Annomate API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files directory
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Create tables
Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = Session(engine)
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root() -> Dict[str, object]:
    """
    Root endpoint showing API information and available endpoints.
    """
    return {
        "app": "Annomate API",
        "version": "1.0.0",
        "endpoints": {
            "GET /": "This information",
            "POST /upload": "Upload a new image",
            "GET /images/{image_id}": "Get image details",
            "POST /images/{image_id}/annotations": "Create annotation for an image",
            "GET /images/{image_id}/annotations": "Get all annotations for an image"
        }
    }

@app.post("/upload", response_model=ImageSchema)
async def upload_image(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Create images directory if it doesn't exist
    os.makedirs("app/static/images", exist_ok=True)
    
    # Save file to disk
    file_path = f"app/static/images/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Save to database
    db_image = Image(filename=file.filename, filepath=f"/static/images/{file.filename}")
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image

@app.post("/images/{image_id}/annotations", response_model=AnnotationSchema)
async def create_annotation(
    image_id: int,
    annotation: AnnotationCreate,
    db: Session = Depends(get_db)
):
    db_annotation = Annotation(**annotation.dict(), image_id=image_id)
    db.add(db_annotation)
    db.commit()
    db.refresh(db_annotation)
    return db_annotation

@app.get("/images/{image_id}", response_model=ImageSchema)
async def get_image(image_id: int, db: Session = Depends(get_db)):
    image = db.query(Image).filter(Image.id == image_id).first()
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    return image

@app.get("/images/{image_id}/annotations", response_model=List[AnnotationSchema])
async def get_annotations(image_id: int, db: Session = Depends(get_db)):
    annotations = db.query(Annotation).filter(Annotation.image_id == image_id).all()
    return annotations

@app.get("/images", response_model=List[ImageSchema])
async def list_images(db: Session = Depends(get_db)):
    """List all images in the database"""
    return db.query(Image).all()

@app.get("/stats")
async def get_stats(db: Session = Depends(get_db)):
    """Get database statistics"""
    total_images = db.query(Image).count()
    total_annotations = db.query(Annotation).count()
    images_with_annotations = db.query(Image).filter(Image.annotations.any()).count()
    
    return {
        "total_images": total_images,
        "total_annotations": total_annotations,
        "images_with_annotations": images_with_annotations,
        "average_annotations_per_image": total_annotations / total_images if total_images > 0 else 0
    }

@app.get("/annotations", response_model=List[AnnotationSchema])
async def list_all_annotations(db: Session = Depends(get_db)):
    """List all annotations in the database"""
    return db.query(Annotation).all()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 