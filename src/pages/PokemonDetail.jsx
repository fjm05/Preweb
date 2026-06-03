import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { useAnalysis } from '../context/AnalysisContext';
import { fetchPokemonByName, mapPokemonToAnalysis, mapPokemonDetail } from '../services/api';

export default function PokemonDetail() {
  const { name } = useParams();
  const { addPokemon, isInAnalysis, analysisList, maxAnalysis } = useAnalysis();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadDetail() {
      setLoading(true);
      setError('');
      setFeedback('');
      try {
        const data = await fetchPokemonByName(name);
        if (!cancelled) {
          setPokemon(mapPokemonDetail(data));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Error al cargar el detalle');
          setPokemon(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDetail();
    return () => {
      cancelled = true;
    };
  }, [name]);

  if (loading) {
    return <Loading message={`Cargando ${name}...`} />;
  }

  if (error) {
    return (
      <section className="page">
        <ErrorMessage message={error} />
        <Link to="/" className="btn btn-secondary">
          Volver al listado
        </Link>
      </section>
    );
  }

  if (!pokemon) {
    return <p className="status-message">No hay datos disponibles.</p>;
  }

  const alreadyAdded = isInAnalysis(pokemon.id);
  const listFull = analysisList.length >= maxAnalysis;

  const handleAdd = () => {
    const result = addPokemon(mapPokemonToAnalysis(pokemon));
    setFeedback(result.message);
  };

  return (
    <section className="page detail-page">
      <Link to="/" className="back-link">
        ← Volver al listado
      </Link>

      <div className="detail-card">
        {pokemon.image && (
          <img src={pokemon.image} alt={pokemon.name} className="detail-image" />
        )}
        <div className="detail-info">
          <h1>{pokemon.name}</h1>
          <dl className="detail-stats">
            <div>
              <dt>Altura</dt>
              <dd>{pokemon.height / 10} m</dd>
            </div>
            <div>
              <dt>Peso</dt>
              <dd>{pokemon.weight / 10} kg</dd>
            </div>
          </dl>

          <div className="detail-section">
            <h2>Tipos</h2>
            <ul className="tag-list">
              {pokemon.types.map((type) => (
                <li key={type} className="tag">
                  {type}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h2>Habilidades</h2>
            <ul className="tag-list abilities">
              {pokemon.abilities.map((ability) => (
                <li key={ability} className="tag">
                  {ability}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAdd}
            disabled={alreadyAdded || listFull}
          >
            {alreadyAdded
              ? 'Ya está en análisis'
              : listFull
                ? 'Lista de análisis llena'
                : 'Agregar a lista de análisis'}
          </button>

          {feedback && <p className="feedback">{feedback}</p>}
          {alreadyAdded && !feedback && (
            <p className="feedback">Este Pokémon ya está en la lista de análisis.</p>
          )}
        </div>
      </div>
    </section>
  );
}
