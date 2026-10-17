import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PlayerBar from './components/PlayerBar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import { usePlayer } from './player';

export default function App() {
  const { pathname } = useLocation();
  const { current } = usePlayer();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="grain relative min-h-screen flex flex-col">
      <Header />
      <main className={`relative z-10 flex-1 ${current ? 'pb-28' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <PlayerBar />
    </div>
  );
}
