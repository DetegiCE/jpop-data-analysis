import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components';
import {
  HomePage,
  WordCloudPage,
  GraphPage,
  NgramPage,
  MatrixPage,
  ConcorPage,
  ShortestPathPage
} from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:season/*" element={<MainLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

function MainLayout() {
  return (
    <div className="main-layout">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="wordcloud" element={<WordCloudPage />} />
          <Route path="graph" element={<GraphPage />} />
          <Route path="ngram" element={<NgramPage />} />
          <Route path="matrix" element={<MatrixPage />} />
          <Route path="concor/:clusters" element={<ConcorPage />} />
          <Route path="shortest-path" element={<ShortestPathPage />} />
          <Route path="*" element={<Navigate to="wordcloud" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
