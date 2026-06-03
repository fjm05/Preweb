import { Link } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';

export default function Analysis() {
  const { analysisList, removePokemon } = useAnalysis();

  const selectedNames = analysisList.map((p) => p.name);

  return (
    <section className="page">
      <header className="page-header">
        <h1>Lista de análisis</h1>
        <p>Pokémon seleccionados para el laboratorio de investigación.</p>
      </header>

      <aside className="analysis-summary">
        <h2>Resumen de análisis</h2>
        <p>
          <strong>Total de Pokémon seleccionados:</strong> {analysisList.length}
        </p>
        <div>
          <strong>Pokémons seleccionados:</strong>
          {selectedNames.length === 0 ? (
            <p className="empty-summary">Ninguno todavía.</p>
          ) : (
            <ul className="summary-names">
              {selectedNames.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      {analysisList.length === 0 ? (
        <div className="empty-state">
          <p className="status-message">No hay Pokémon en la lista de análisis.</p>
          <Link to="/" className="btn btn-primary">
            Ir al listado
          </Link>
        </div>
      ) : (
        <div className="analysis-grid">
          {analysisList.map((pokemon) => (
            <article key={pokemon.id} className="analysis-card">
              {pokemon.image && (
                <img src={pokemon.image} alt={pokemon.name} className="analysis-image" />
              )}
              <h3>{pokemon.name}</h3>
              <dl className="analysis-stats">
                <div>
                  <dt>Altura</dt>
                  <dd>{pokemon.height / 10} m</dd>
                </div>
                <div>
                  <dt>Peso</dt>
                  <dd>{pokemon.weight / 10} kg</dd>
                </div>
              </dl>
              <ul className="tag-list">
                {pokemon.types.map((type) => (
                  <li key={type} className="tag">
                    {type}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removePokemon(pokemon.id)}
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
