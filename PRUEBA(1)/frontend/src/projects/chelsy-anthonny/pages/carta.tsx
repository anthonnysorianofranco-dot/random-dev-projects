import { useState } from "react";
import "./carta.css";

interface CartaProps {
  onAceptar: () => void;
}

function Carta({ onAceptar }: CartaProps) {
  const [sobreAbierto, setSobreAbierto] = useState(false);
  const [mostrarCarta, setMostrarCarta] = useState(false);

  function abrirSobre() {
    if (sobreAbierto) return;

    setSobreAbierto(true);

    // Esperamos a que termine la animación del sobre.
    window.setTimeout(() => {
      setMostrarCarta(true);
    }, 1100);
  }

  return (
    <main className="carta-escena">
      {!mostrarCarta ? (
        <section className="sobre-pantalla">
          <p className="carta-etiqueta">PARA LAMASTEMIDA Y ESPECIAL</p>

          <h1 className="sobre-titulo">Tengo algo para ti...</h1>

          <p className="sobre-instruccion">
            Toca el sobre para descubrir que es.
          </p>

          <button
            type="button"
            className={`sobre ${sobreAbierto ? "sobre-abierto" : ""}`}
            onClick={abrirSobre}
            disabled={sobreAbierto}
            aria-label="Abrir carta"
          >
            <span className="sobre-fondo" />

            <span className="sobre-papel">
              <span className="papel-corazon">♥</span>
              <span>Para Chelsy...</span>
            </span>

            <span className="sobre-solapa" />
            <span className="sobre-frente" />
            <span className="sobre-sello">♥</span>
          </button>

          <p className="sobre-pie">Hecho con cariño ♥</p>
        </section>
      ) : (
        <section className="carta-revelada">
          <article className="carta-papel-completo">
            <div className="carta-decoracion">♥</div>

            <p className="carta-etiqueta">UNA CARTA SOLO PARA TI</p>

            <h1 className="carta-saludo">Querida Chelsy</h1>

            <div className="carta-separador" />

            <div className="carta-mensaje">
              <p>
                Hay personas que llegan a nuestra vida y, sin buscarlo, se
                convierten en ese refugio donde todo se siente más bonito,
                tranquilo y lleno de risas.
              </p>

              <p>
                Entre nuestras conversaciones diarias, las ocurrencias de
                madrugada, los días ajetreados y la complicidad que hemos
                creado, me he dado cuenta de lo valiosa que eres para mí y de lo
                mucho que me alegra la vida compartir mi tiempo contigo.
              </p>

              <p>
                Me encanta cómo encajamos, cómo nos entendemos y la bonita
                energía que hay cuando estamos juntos. No quiero que esto sea
                solo coincidencia, quiero construir algo lindo, real y con
                futuro a tu lado.
              </p>

              <p className="carta-pregunta-final">
                Por eso hoy quiero preguntarte con todo mi corazón:
                <br />
                <strong>¿Quieres ser mi novia?</strong>
              </p>
            </div>

            <div className="carta-firma">
              Con todo mi cariño,
              <strong>Anthonny</strong>
            </div>

            <div className="carta-corazon-final">♥</div>
          </article>

          <button type="button" className="carta-continuar" onClick={onAceptar}>
            Sí, quiero ♥
          </button>
        </section>
      )}
    </main>
  );
}

export default Carta;
