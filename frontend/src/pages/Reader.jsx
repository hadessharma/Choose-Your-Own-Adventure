import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStoryStart, getNextNode } from '../api';

const Reader = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [node, setNode] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>Loading...</div>;
    if (!node) return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>Story not found or error loading.</div>;

    return (
        <div className="container animate-fade-in" style={{ maxWidth: '800px', padding: '4rem 2rem', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
                fontSize: '1.4rem',
                lineHeight: '1.8',
                marginBottom: '3rem',
                color: 'var(--color-text-primary)',
                textAlign: 'justify'
            }}>
                {node.content}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                {!node.is_ending ? (
                    node.options.map(option => (
                        <button
                            key={option.id}
                            className="btn btn-secondary"
                            onClick={() => handleChoice(option)}
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                justifyContent: 'space-between',
                                fontSize: '1.1rem',
                                padding: '1.2rem 2rem'
                            }}
                        >
                            {option.label}
                            <span style={{ opacity: 0.7 }}>→</span>
                        </button>
                    ))
                ) : (
                    <div className="animate-fade-in" style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '2rem', color: 'var(--color-accent)', marginBottom: '1.5rem' }}>The End</h3>
                        <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Menu</button>
                    </div>
                )}
            </div>
        </div>
    );

};

export default Reader;
