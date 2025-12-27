import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Product from './pages/Product';
import AI from './pages/AI';
import Entrepreneurship from './pages/Entrepreneurship';
import ChatWidget from './components/ChatWidget';
import './index.css';

import ArticleDetail from './pages/ArticleDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/entrepreneurship" element={<Entrepreneurship />} />
          <Route path="/:category/:slug" element={<ArticleDetail />} />
        </Routes>
      </main>
      <ChatWidget />
    </Router>
  );
}

export default App;
