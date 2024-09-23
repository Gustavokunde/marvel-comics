import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { LanguageSelector } from '../components/LanguageSelector';
import ProfileIcon from '../components/ProfileIcon/ProfileIcon';
import { CharactersFindings } from '../pages/CharactersFindings';
import { CreateProfile } from '../pages/CreateProfile';
import { FavoriteCharacters } from '../pages/FavoriteCharacters';

export const paths = {
  PROFILE: '/',
  FIND_CHARACTERS: '/characters',
  FAVORITE_CHARACTERS: '/favorite-characters',
};

const routes = () => {
  return (
    <Router>
      <div className="flex items-center">
        <LanguageSelector />
        <ProfileIcon />
      </div>
      <Routes>
        <Route path={paths.PROFILE} element={<CreateProfile />} />
        <Route path={paths.FIND_CHARACTERS} element={<CharactersFindings />} />
        <Route
          path={paths.FAVORITE_CHARACTERS}
          element={<FavoriteCharacters />}
        />
      </Routes>
    </Router>
  );
};

export default routes;
