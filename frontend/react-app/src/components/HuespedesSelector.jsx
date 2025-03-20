import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import "./huespedesSelector.css";

function HuespedesSelector({ huespedes, setHuespedes }) {
  const [mostrarOpciones, setMostrarOpciones] = useState(false); // 🔥 Se agregó de nuevo
  const opcionesRef = useRef(null);
  const totalHuespedes = huespedes.adultos + huespedes.ninos;

  const handleClickFuera = (e) => {
    if (opcionesRef.current && !opcionesRef.current.contains(e.target)) {
      setMostrarOpciones(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  return (
    <div style={{ position: "relative", width: "27%" }}>
      <Form.Label htmlFor="checkout" className="d-block">
        <h4>Huéspedes</h4>
      </Form.Label>
      <Form.Control
        type="text"
        value={`${totalHuespedes} huésped${totalHuespedes !== 1 ? "es" : ""} - ${huespedes.bebes} bebé${huespedes.bebes !== 1 ? "s" : ""}`}
        onClick={() => setMostrarOpciones((prev) => !prev)}
        readOnly
      />

      {mostrarOpciones && ( // 🔥 Ahora no dará error porque está definido
        <div ref={opcionesRef} className="opciones-huespedes">
          <div className="opcion">
            <span>Adultos</span>
            <div>
              <Button onClick={() => setHuespedes(prev => ({ ...prev, adultos: Math.max(1, prev.adultos - 1) }))}>-</Button>
              <span>{huespedes.adultos}</span>
              <Button onClick={() => setHuespedes(prev => ({ ...prev, adultos: prev.adultos + 1 }))}>+</Button>
            </div>
          </div>

          <div className="opcion">
            <span>Niños</span>
            <div>
              <Button onClick={() => setHuespedes(prev => ({ ...prev, ninos: Math.max(0, prev.ninos - 1) }))}>-</Button>
              <span>{huespedes.ninos}</span>
              <Button onClick={() => setHuespedes(prev => ({ ...prev, ninos: prev.ninos + 1 }))}>+</Button>
            </div>
          </div>

          <div className="opcion">
            <span>Bebés</span>
            <div>
              <Button onClick={() => setHuespedes(prev => ({ ...prev, bebes: Math.max(0, prev.bebes - 1) }))}>-</Button>
              <span>{huespedes.bebes}</span>
              <Button onClick={() => setHuespedes(prev => ({ ...prev, bebes: prev.bebes + 1 }))}>+</Button>
            </div>
          </div>

          <Button variant="primary" className="btn-listo" onClick={() => setMostrarOpciones(false)}>Listo</Button>
        </div>
      )}
    </div>
  );
}

HuespedesSelector.propTypes = {
  huespedes: PropTypes.shape({
    adultos: PropTypes.number.isRequired,
    ninos: PropTypes.number.isRequired,
    bebes: PropTypes.number.isRequired,
  }).isRequired,
  setHuespedes: PropTypes.func.isRequired,
};

export default HuespedesSelector;
