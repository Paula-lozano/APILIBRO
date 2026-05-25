import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Home from './pages/Home';
import Favoritos from './pages/Favoritos';
import Navbar from './components/Navbar';  // <-- Importación correcta
import './App.css';

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />   {/* Aquí se renderiza el navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/informativa" element={<div>Informativa</div>} />
          <Route path="/original" element={<div>Original</div>} />
          <Route path="/usuario" element={<div>Usuario</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
