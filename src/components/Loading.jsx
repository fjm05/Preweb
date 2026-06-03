export default function Loading({ message = 'Cargando...' }) {
  return <p className="status-message loading">{message}</p>;
}
