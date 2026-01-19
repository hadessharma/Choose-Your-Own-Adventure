# Choose Your Own Adventure

A web-based interactive storytelling platform where users can read branching narratives and choose their own path.

## Description

This project allows users to read interactive stories with branching storylines. It features a backend built with FastAPI and SQLite for managing stories and nodes, and a React-based frontend for a modern reading experience. Users can filter stories by genre and explore different narrative paths.

## Features

- Interactive story reader with branching choices
- Branching narratives support multiple endings
- Genre filtering on the home page
- Dark mode premium UI
- Admin interface for submitting new stories via JSON template

## Tech Stack

### Frontend
- React
- Vite
- React Router
- CSS Modules

### Backend
- Python
- FastAPI
- SQLite
- SQLAlchemy

## Setup and Installation

### Prerequisites
- Node.js and npm
- Python 3.8+

### Backend Setup

1. Navigate to the backend directory:
   cd backend

2. Create a virtual environment:
   python -m venv venv

3. Activate the virtual environment:
   # Windows
   .\venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate

4. Install dependencies:
   pip install -r requirements.txt

5. Run the server:
   uvicorn main:app --reload

The API will be available at http://localhost:8000.

### Frontend Setup

1. Navigate to the frontend directory:
   cd frontend

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

The application will be available at http://localhost:5173.

## Usage

1. Open the application in your browser.
2. Browse the available stories on the Home page.
3. Click "Start Adventure" to begin reading.
4. Make choices to progress through the story.
5. To submit a story, navigate to "Submit Story" and follow the instructions to email your storyboard JSON.

## License

This project is open source.
