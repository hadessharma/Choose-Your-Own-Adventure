from database import SessionLocal
import models

def clear_db():
    db = SessionLocal()
    try:
        print("Fetching all stories...")
        stories = db.query(models.Story).all()
        print(f"Found {len(stories)} stories. Deleting...")
        
        for story in stories:
            db.delete(story)
        
        db.commit()
        print(f"Successfully deleted {len(stories)} stories.")
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    clear_db()
