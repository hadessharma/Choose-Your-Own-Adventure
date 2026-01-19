import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

export const getStories = (genre) => api.get('/stories', { params: { genre } });
export const getGenres = () => api.get('/genres');
export const getStoryStart = (id) => api.get(`/story/${id}/play`);
export const getNextNode = (currentNodeId, choiceId) => api.post('/story/next', null, { params: { current_node_id: currentNodeId, choice_id: choiceId } });
// Note: Backend expects query params for correct mapping or body. 
// My backend implementation:
// @app.post("/story/next")
// def next_node(current_node_id: int, choice_id: int, ...):
// These are query parameters by default in FastAPI unless defined as Body.
// So { params: ... } is correct.

export const uploadStory = (storyData, adminSecret) => api.post('/upload_story', storyData, {
    headers: {
        'X-Admin-Secret': adminSecret
    }
});

export default api;
