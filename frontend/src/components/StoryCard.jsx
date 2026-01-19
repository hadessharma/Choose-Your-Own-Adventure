import React from 'react';
import { Link } from 'react-router-dom';

const StoryCard = ({ story }) => {
    return (
        <div className="story-card">
            <h3 className="story-title">{story.title}</h3>
            <span className="story-genre">{story.genre}</span>
            <p className="story-blurb">{story.blurb || "Embark on a new adventure..."}</p>
            <Link to={`/story/${story.id}`} className="story-link">
                Start Adventure <span>→</span>
            </Link>
        </div>
    );
};

export default StoryCard;
