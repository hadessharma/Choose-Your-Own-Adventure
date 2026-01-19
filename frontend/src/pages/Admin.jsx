import React, { useState } from 'react';
import { uploadStory } from '../api';

const Admin = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [status, setStatus] = useState('');
    const [adminSecret, setAdminSecret] = useState('');

    const handlePreFill = () => {
        const template = {
            title: "New Adventure",
            genre: "Fantasy",
            description: "A short description of the adventure.",
            nodes: [
                {
                    id: "n1",
                    text: "You are standing in a dark forest.",
                    options: [
                        { label: "Go North", target_node_id: "n2" },
                        { label: "Go South", target_node_id: "n3" }
                    ]
                },
                {
                    id: "n2",
                    text: "You found a treasure chest!",
                    is_ending: true,
                    options: []
                },
                {
                    id: "n3",
                    text: "You fell into a pit.",
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
            if (!data.title || !data.nodes) {
                setStatus('Error: Missing required fields (title, nodes)');
                return;
            }
            if (!adminSecret) {
                setStatus('Error: Please enter Admin Secret');
                return;
            }

            uploadStory(data, adminSecret).then(res => {
                setStatus('Upload successful! Story ID: ' + res.data.story_id);
                setJsonInput('');
            }).catch(err => {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    setStatus('Error: Unauthorized. Check your Admin Secret.');
                } else {
                    setStatus('Error uploading story: ' + (err.response?.data?.detail || err.message));
                }
            });
        } catch (e) {
            setStatus('Invalid JSON format.');
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Admin Upload</h1>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="password"
                    placeholder="Enter Admin Secret"
                    value={adminSecret}
                    onChange={(e) => setAdminSecret(e.target.value)}
                    style={{
                        padding: '10px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backgroundColor: 'var(--color-bg-secondary)',
                        color: 'var(--color-text-primary)',
                        width: '100%',
                        maxWidth: '300px',
                        marginBottom: '10px',
                        display: 'block'
                    }}
                />
            </div>

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
