import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStoryStart, getNextNode } from '../api';

const Reader = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [node, setNode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState([]); // to track history if we want to go back, though not required by prompt.

    useEffect(() => {
        getStoryStart(id).then(res => {
            setNode(res.data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [id]);

    const handleChoice = (option) => {
        setLoading(true);
        getNextNode(node.id, option.id).then(res => {
            setNode(res.data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    };

    if (loading) return <div>Loading...</div>;
    if (!node) return <div>Story not found or error loading.</div>;

    return (

        <div style={{
            padding: '60px 20px',
            maxWidth: '800px',
            margin: '0 auto',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <div style={{
                fontSize: '1.4rem',
                lineHeight: '1.8',
                marginBottom: '60px',
                color: 'var(--color-text-primary)',
                textAlign: 'justify'
            }}>
                {node.content}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', width: '100%' }}>
                {!node.is_ending ? (
                    node.options.map(option => (
                        <button
                            key={option.id}
                            onClick={() => handleChoice(option)}
                            style={{
                                padding: '16px 32px',
                                fontSize: '1.1rem',
                                width: '100%',
                                maxWidth: '500px',
                                textAlign: 'left',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            {option.label}
                            <span style={{ opacity: 0.7 }}>→</span>
                        </button>
                    ))
                ) : (
                    <div style={{ animation: 'fadeIn 1s ease' }}>
                        <h3 style={{ fontSize: '2rem', color: 'var(--color-accent)', marginBottom: '20px' }}>The End</h3>
                        <button onClick={() => navigate('/')}>Back to Menu</button>
                    </div>
                )}
            </div>
        </div>
    );

};

export default Reader;
