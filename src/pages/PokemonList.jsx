import { useEffect, useMemo, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import PokemonCard from '../components/PokemonCard';
import { fetchPokemonByName, fetchPokemonList } from '../services/api';

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadList() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchPokemonList(20);
        const entries = data.results ?? [];

        const detailed = await Promise.all(
          entries.map(async (item) => {
            const name = item.name;
            const detail = await fetchPokemonByName(name);
            return {
              name,
              image: detail.sprites?.front_default ?? '',
            };
          }),
        );

        if (!cancelled) {
          setPokemon(detailed);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Error al cargar los Pokémon');
          setPokemon([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadList();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPokemon = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return pokemon;
    return pokemon.filter((p) => p.name.toLowerCase().includes(query));
  }, [pokemon, search]);

  if (loading) {
    return <Loading message="Cargando listado de Pokémon..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (pokemon.length === 0) {
    return <p className="status-message">No hay datos disponibles.</p>;
  }

  return (
    <section className="page">
      <header className="page-header">
        <h1>Listado de Pokémon</h1>
        <p>Explora los primeros 20 Pokémon y selecciona algunos para tu análisis.</p>
      </header>

      <div className="search-bar">
        <label htmlFor="search">Buscar por nombre</label>
        <input
          id="search"
          type="search"
          placeholder="Ej: pika, char..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredPokemon.length === 0 ? (
        <p className="status-message">No se encontraron Pokémon con ese criterio.</p>
      ) : (
        <div className="pokemon-grid">
          {filteredPokemon.map((item) => (
            <PokemonCard key={item.name} name={item.name} image={item.image} />
          ))}
        </div>
      )}
    </section>
  );
}
