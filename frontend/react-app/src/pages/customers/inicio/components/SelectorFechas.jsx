import PropTypes from 'prop-types';
import Flatpickr from "react-flatpickr";  // Importar el componente Flatpickr de react-flatpickr
import "flatpickr/dist/flatpickr.min.css";  // Importar los estilos de Flatpickr

function SelectorFechas({ onChange }) {
  return (
    <Flatpickr
      className="form-control"
      options={{
        mode: "range",  // Habilita selección de rango de fechas
        dateFormat: "d-m-Y",  // Formato de fecha
      }}
      onChange={onChange}  // Llama a la función onChange pasada como prop
    />
  );
}

SelectorFechas.propTypes = {
  onChange: PropTypes.func.isRequired
}
export default SelectorFechas;
