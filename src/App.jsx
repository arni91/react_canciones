import { useState } from "react";
import CancionesAnalytics from "./components/CancionesAnalytics/CancionesAnalytics.jsx";
import Hobbies from "./components/Hobbies/Hobbies.jsx";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <main>
      <h1>Mi música y yo</h1>
      <CancionesAnalytics />
      <Hobbies />
    </main>
  );
}