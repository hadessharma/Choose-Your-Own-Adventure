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
        <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '40px',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <h1>Choose Your Adventure</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <label style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Filter by Genre:</label>
                    <select
                        onChange={(e) => setGenreFilter(e.target.value)}
                        value={genreFilter}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            backgroundColor: 'var(--color-bg-secondary)',
                            color: 'var(--color-text-primary)',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        <option value="">All Genres</option>
                        {genres.map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Grid Layout */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '30px',
                alignItems: 'stretch'
            }}>
                {stories.map(story => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>

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
