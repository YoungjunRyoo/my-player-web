import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { LoginProvider } from './contexts/LoginContext';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
