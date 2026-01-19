from database import SessionLocal
import models
import schemas
from pydantic import TypeAdapter

def debug_query():
    db = SessionLocal()
    try:
        print("Querying stories...")
        stories = db.query(models.Story).all()
        print(f"Found {len(stories)} stories.")
        
        # Try to validate with Pydantic to catch validation errors
        # This mimics what FastAPI does
        ta = TypeAdapter(list[schemas.Story])
        try:
            ta.validate_python(stories, from_attributes=True)
            print("Pydantic validation passed.")
        except Exception as e:
            print(f"Pydantic Validation Error: {e}")

    except Exception as e:
        print(f"DB Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    debug_query()
