import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';

export default function Layout() {
  const { analysisList } = useAnalysis();

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="brand">
          <span className="brand-icon">⚗️</span>
          Laboratorio Pokémon
        </Link>
        <nav className="nav">
          <NavLink to="/" end>
            Listado
          </NavLink>
          <NavLink to="/analysis">
            Análisis ({analysisList.length}/4)
          </NavLink>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
