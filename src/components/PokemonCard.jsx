import { Link } from 'react-router-dom';

export default function PokemonCard({ name, image }) {
  return (
    <article className="pokemon-card">
      {image && (
        <img src={image} alt={name} className="pokemon-card-image" loading="lazy" />
      )}
      <h3 className="pokemon-card-name">{name}</h3>
      <Link to={`/pokemon/${name}`} className="btn btn-primary">
        Ver detalle
      </Link>
    </article>
  );
}
