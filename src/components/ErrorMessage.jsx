export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <p className="status-message error" role="alert">{message}</p>;
}
