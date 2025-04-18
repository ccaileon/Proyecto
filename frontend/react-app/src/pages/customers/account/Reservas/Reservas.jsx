import TablaReservas from "./components/TablaReservas";
import EstructuraUsuario from "../components/EstructuraUsuario";

function Reservas() {
  return (
    <EstructuraUsuario>
    <>
      <h1>Reservas</h1>
      <TablaReservas />
    </>
  </EstructuraUsuario>
  
  );
}

export default Reservas;
