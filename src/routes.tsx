import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateProfile from './pages/CreateProfile';
import { CharactersFindings } from './pages/Home';

const routes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<CreateProfile />} />
        <Route path="/characters" element={<CharactersFindings />} />
      </Routes>
    </Router>
  );
};

export default routes;
