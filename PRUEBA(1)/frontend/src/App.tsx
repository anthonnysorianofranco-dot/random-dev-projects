import { useState } from "react";
import Carta from "./projects/chelsy-anthonny/pages/carta";
import Main from "./projects/chelsy-anthonny/pages/main";

function App() {
  const [mostrarContador, setMostrarContador] = useState(false);

  if (mostrarContador) {
    return <Main />;
  }

  return <Carta onAceptar={() => setMostrarContador(true)} />;
}

export default App;
