import React from 'react';
import { useNavigate } from 'react-router-dom';

const StoryCard = ({ story }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/story/${story.id}`)}
            style={{
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                height: '100%',
                boxSizing: 'border-box'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                e.currentTarget.style.borderColor = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>{story.title}</h3>
                <span style={{
                    background: 'var(--color-accent)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>{story.genre}</span>
            </div>

            <p style={{
                color: 'var(--color-text-secondary)',
                margin: 0,
                lineHeight: '1.6',
                flex: 1
            }}>{story.blurb}</p>

            <div style={{
                marginTop: '16px',
                color: 'var(--color-accent)',
                fontSize: '0.9rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                Start Adventure <span>→</span>
            </div>
        </div>
    );
};

export default StoryCard;
