import { useEffect, useMemo, useState } from "react";
import "./CancionesAnalytics.css";

export default function CancionesAnalytics() {
  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("valoracion");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/canciones.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCanciones(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "Error cargando JSON");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = useMemo(() => {
    if (!canciones.length) return { avg: 0, count: 0, top: null };
    const total = canciones.reduce((s, c) => s + (c.valoracion ?? 0), 0);
    const top = canciones.reduce(
      (acc, c) => ((c.valoracion ?? 0) > (acc?.valoracion ?? -1) ? c : acc),
      null
    );
    return { avg: total / canciones.length, count: canciones.length, top };
  }, [canciones]);

  const lista = useMemo(() => {
    const f = canciones
      .filter((c) =>
        c.titulo.toLowerCase().includes(query.trim().toLowerCase())
      )
      .filter((c) => (c.valoracion ?? 0) >= Number(minRating));

    const s = [...f].sort((a, b) => {
      let comp = 0;
      if (sortBy === "valoracion") comp = (a.valoracion ?? 0) - (b.valoracion ?? 0);
      else if (sortBy === "duracion") comp = (a.duracion ?? 0) - (b.duracion ?? 0);
      else if (sortBy === "titulo") comp = a.titulo.localeCompare(b.titulo);
      else if (sortBy === "album") comp = a.album.localeCompare(b.album);
      return sortDir === "asc" ? comp : -comp;
    });

    return s;
  }, [canciones, query, minRating, sortBy, sortDir]);

  if (loading) return <p className="status">Cargando…</p>;
  if (error) return <p className="error">Error: {error}</p>;

  const mmss = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <section className="wrapper">
      <header className="header">
        <h2>Canciones</h2>
        <div className="stats">
          <span>Total: <strong>{stats.count}</strong></span>
          <span>Promedio ★ <strong>{stats.avg.toFixed(2)}</strong></span>
          {stats.top && <span>Top: <strong>{stats.top.titulo} ({stats.top.valoracion})</strong></span>}
        </div>
      </header>

      <div className="controls">
        <input
          className="input"
          placeholder="Buscar por título…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label className="row">
          Min ★
          <input
            className="number"
            type="number"
            min="0"
            max="5"
            step="1"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
          />
        </label>
        <label className="row">
          Ordenar por
          <select
            className="select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="valoracion">valoracion</option>
            <option value="duracion">duracion</option>
            <option value="titulo">titulo</option>
            <option value="album">album</option>
          </select>
        </label>
        <label className="row">
          Dirección
          <select
            className="select"
            value={sortDir}
            onChange={(e) => setSortDir(e.target.value)}
          >
            <option value="desc">desc</option>
            <option value="asc">asc</option>
          </select>
        </label>
      </div>

      <ul className="grid">
        {lista.map((c, i) => (
          <li key={i} className="card">
            <img
              className="cover"
              src={c.imagenAlbum}
              alt={`Portada de ${c.album}`}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/300x300?text=Sin+Imagen";
              }}
            />
            <div className="body">
              <h3 className="title">{c.titulo}</h3>
              <p className="meta">
                {c.album} • ⏱ {mmss(c.duracion)} • ⭐ {c.valoracion}/5
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
