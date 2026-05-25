import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favoritos from './pages/Favoritos';
import Usuario from './pages/Usuario';
// ... otros imports (Informativa, Original)
import './App.css';

function App() {
  return (
    <UserProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/original" element={<div>Original</div>} />
            <Route path="/informativa" element={<div>Informativa</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </UserProvider>
  );
}

export default App;