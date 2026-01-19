import React, { useEffect, useState } from 'react';
import { getStories, getGenres } from '../api';
import StoryCard from '../components/StoryCard';

const Home = () => {
    const [stories, setStories] = useState([]);
    const [genres, setGenres] = useState([]);
    const [genreFilter, setGenreFilter] = useState('');

    useEffect(() => {
        // Fetch genres on mount
        getGenres().then(res => {
            setGenres(res.data);
        }).catch(err => console.error("Failed to fetch genres", err));
    }, []);

    useEffect(() => {
        getStories(genreFilter || null).then(res => {
            setStories(res.data);
        }).catch(err => console.error(err));
    }, [genreFilter]);

    return (
        <div className="container animate-fade-in">
            {/* Hero Section */}
            <div className="hero">
                <h1>Choose Your Level</h1>
                <p className="hero-subtitle">
                    Immerse yourself in interactive tales where your choices shape the narrative.
                    Select a story below to begin your journey.
                </p>
            </div>

            {/* Filter Bar */}
            <div className="filter-bar">
                <button
                    className={`btn ${genreFilter === '' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setGenreFilter('')}
                >
                    All Genres
                </button>
                {genres.map(g => (
                    <button
                        key={g}
                        className={`btn ${genreFilter === g ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setGenreFilter(g)}
                    >
                        {g}
                    </button>
                ))}
            </div>

            {/* Story Grid */}
            <div className="story-grid">
                {stories.map(story => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>

            {/* Empty State */}
            {stories.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-secondary)' }}>
                    <h3>No stories found</h3>
                    <p>Try adjusting your filter or check back later.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
