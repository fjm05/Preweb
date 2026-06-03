import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AnalysisProvider } from './context/AnalysisContext';
import Layout from './components/Layout';
import Analysis from './pages/Analysis';
import PokemonDetail from './pages/PokemonDetail';
import PokemonList from './pages/PokemonList';
import './App.css';

function App() {
  return (
    <AnalysisProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PokemonList />} />
            <Route path="pokemon/:name" element={<PokemonDetail />} />
            <Route path="analysis" element={<Analysis />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AnalysisProvider>
  );
}

export default App;
