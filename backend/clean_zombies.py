from database import SessionLocal
import models

def clean_zombies():
    db = SessionLocal()
    try:
        print("Searching for zombie stories (start_node_id=None)...")
        zombies = db.query(models.Story).filter(models.Story.start_node_id == None).all()
        print(f"Found {len(zombies)} zombies.")
        for z in zombies:
            print(f" - Deleting: ID={z.id}, Title='{z.title}'")
            db.delete(z)
        
        db.commit()
        if zombies:
             print("Cleaned up successfully.")
        else:
             print("No zombies found.")
            
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    clean_zombies()
