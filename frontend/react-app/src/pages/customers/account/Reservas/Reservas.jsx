import TablaReservas from "./components/TablaReservas";
import EstructuraUsuario from "../components/EstructuraUsuario";

function Reservas() {
  return(
EstructuraUsuario(
  <>
<h1>Reservas</h1>
<TablaReservas/>
</>
)
  )
}

export default Reservas