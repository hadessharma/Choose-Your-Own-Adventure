import React, { useState } from 'react';

const Admin = () => {
    const template = {
        title: "New Adventure",
        genre: "Fantasy",
        blurb: "A short description...",
        nodes: [
            {
                id: "n1",
                text: "Start of the story...",
                options: [
                    { label: "Option A", target_node_id: "n2" }
                ]
            },
            {
                id: "n2",
                text: "The End.",
                is_ending: true,
                options: []
            }
        ]
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(template, null, 2));
        alert("Template copied to clipboard!");
    };

    return (
        <div className="container animate-fade-in" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Submit Your Story</h1>
            <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                We are currently accepting story submissions via email. Please structure your story using the JSON format below and send it to:
            </p>

            <div style={{
                background: 'var(--color-bg-secondary)',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '2rem',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <a href="mailto:de.sharma993@gmail.com" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>
                    de.sharma993@gmail.com
                </a>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>(Click to send)</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>JSON Format</h3>
                <button className="btn btn-secondary" onClick={handleCopy}>Copy Template</button>
            </div>

            <pre style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                overflowX: 'auto',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                color: '#e2e8f0'
            }}>
                {JSON.stringify(template, null, 2)}
            </pre>
        </div>
    );
};

export default Admin;
