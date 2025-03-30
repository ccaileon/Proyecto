import EstructuraUsuario from "../components/EstructuraUsuario";
import PuntosAcumulados from "./components/PuntosAcumulados";
import { Container } from "react-bootstrap";

function Recompensas() {
  return(
EstructuraUsuario(
<>
<Container>
<h1>Recompensas</h1>
<p>Estos son sus puntos acumulados:</p>
<PuntosAcumulados />
</Container>
</>
)
  )
}

export default Recompensas