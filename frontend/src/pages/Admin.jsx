import React, { useState } from 'react';
import { uploadStory } from '../api';

const Admin = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [status, setStatus] = useState('');

    const handlePreFill = () => {
        const template = {
            title: "New Adventure",
            genre: "Fantasy",
            blurb: "A short description of the adventure.",
            start_node_id: 1,
            nodes: [
                {
                    id: 1,
                    content: "You are standing in a dark forest.",
                    options: [
                        { label: "Go North", to_node_id: 2 },
                        { label: "Go South", to_node_id: 3 }
                    ]
                },
                {
                    id: 2,
                    content: "You found a treasure chest!",
                    is_ending: true,
                    options: []
                },
                {
                    id: 3,
                    content: "You fell into a pit.",
                    is_ending: true,
                    options: []
                }
            ]
        };
        setJsonInput(JSON.stringify(template, null, 2));
    };

    const handleUpload = () => {
        try {
            const data = JSON.parse(jsonInput);
            if (!data.title || !data.nodes || !data.start_node_id) {
                setStatus('Error: Missing required fields (title, nodes, start_node_id)');
                return;
            }
            uploadStory(data).then(res => {
                setStatus('Upload successful! Story ID: ' + res.data.story_id);
                setJsonInput('');
            }).catch(err => {
                console.error(err);
                setStatus('Error uploading story: ' + (err.response?.data?.detail || err.message));
            });
        } catch (e) {
            setStatus('Invalid JSON format.');
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Admin Upload</h1>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={handlePreFill}>Pre-fill Template</button>
                <button onClick={handleUpload} style={{ backgroundColor: 'var(--color-accent)' }}>Upload Story</button>
            </div>

            <textarea
                rows="20"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste story JSON here..."
                style={{
                    width: '100%',
                    fontFamily: 'monospace',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    color: 'var(--color-text-primary)'
                }}
            />
            {status && <div style={{
                marginTop: '20px',
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: status.includes('Error') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                color: status.includes('Error') ? '#fca5a5' : '#6ee7b7'
            }}>
                {status}
            </div>}
        </div>
    );
};

export default Admin;
