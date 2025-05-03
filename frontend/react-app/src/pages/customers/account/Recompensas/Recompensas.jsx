import EstructuraUsuario from "../components/EstructuraUsuario";
import PuntosAcumulados from "./components/PuntosAcumulados";
import { Container } from "react-bootstrap";

function Recompensas() {
  return (
    <EstructuraUsuario>
      <Container>
        <h1>Recompensas cada 100 puntos</h1>
        <p>Estos son sus puntos acumulados:</p>
        <PuntosAcumulados />
      </Container>
    </EstructuraUsuario>
  );
}

export default Recompensas;
