const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(limit = 20) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  if (!response.ok) {
    throw new Error('No se pudo cargar el listado de Pokémon');
  }
  return response.json();
}

export async function fetchPokemonByName(name) {
  const response = await fetch(`${BASE_URL}/pokemon/${encodeURIComponent(name)}`);
  if (!response.ok) {
    throw new Error(`No se encontró el Pokémon "${name}"`);
  }
  return response.json();
}

export function mapPokemonToAnalysis(data) {
  const types = Array.isArray(data.types)
    ? typeof data.types[0] === 'string'
      ? data.types
      : data.types.map((t) => t.type.name)
    : [];

  return {
    id: data.id,
    name: data.name,
    image: data.image ?? data.sprites?.front_default ?? '',
    height: data.height,
    weight: data.weight,
    types,
  };
}

export function mapPokemonDetail(data) {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites?.front_default ?? '',
    height: data.height,
    weight: data.weight,
    types: data.types?.map((t) => t.type.name) ?? [],
    abilities: data.abilities?.map((a) => a.ability.name) ?? [],
  };
}
