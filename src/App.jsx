import { useState } from 'react'
import './App.css'
import miFoto from './assets/miFoto.jpg' 

function App() {
  const [count, setCount] = useState(0)

  let variable = 10;
  variable = 20;

  return (
    <>
      <h1>Arnau</h1>
      <h2>Marí</h2>
      <p>Que sirva de descripción</p>

      <h2>Aficiones:</h2>
      <ol>
        <li>Música</li>
        <li>Deporte</li>
        <li>Juegos de rol / mesa</li>
      </ol>

      {/* Imagen personal */}
      <img src={miFoto} alt="Foto personal" width="200" />

      {/* Enlace de interés */}
      <p>
        Visita <a href="https://www.google.com" target="_blank">Google</a>
      </p>

      {/* Ejemplo de variable */}
      <p>Inyectar el valor de una variable = {variable}</p>
    </>
  )
}

export default App
