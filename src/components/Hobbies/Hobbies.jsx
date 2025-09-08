import "./Hobbies.css";

export default function Hobbies() {
  const hobbies = ["Desarrollo web", "Música", "Cine", "Ciclismo"];
  return (
    <section className="hobbies">
      <h2>Sobre mí</h2>
      <p>Mis aficiones:</p>
      <ul className="list">
        {hobbies.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </section>
  );
}
