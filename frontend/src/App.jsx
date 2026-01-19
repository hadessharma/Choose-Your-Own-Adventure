import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reader from './pages/Reader';
import Admin from './pages/Admin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/story/:id" element={<Reader />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
