import './header.css';
import { useEffect } from 'react';

function Header() {
  useEffect(() => {
    const handleScroll = () => {
      let scrollPosition = window.scrollY;
      let cabecera = document.querySelector(".cabecera");

      if (cabecera) {
        let newBackgroundPosition = scrollPosition * -0.5 + "px";
        cabecera.style.backgroundPosition = "center " + newBackgroundPosition;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <div className='container-fluid cabecera' id='cabecera'> 
        <div className='row'>
          <div className='col-8'>
            <h1>Dunas de Oro</h1>
            <div className='d-flex flex-row gap-2'>
              <h2>Resort</h2>
              <h2 className='h2-white'>&</h2>
              <h2>Spa</h2>
            </div>
          </div>
          <div className='col-4'>
            <h3 className='mx-auto d-flex justify-content-center'>Buscar Habitación</h3>

            {/* Formulario Búsqueda de Habitaciones */}
            <form className='form'>
              <div className="row">
                <div className="col">
                  <label htmlFor="checkin"><h4>Check-in</h4></label>
                  <input className="form-control" type="date" id="checkin" name="checkin"></input>
                </div>
                <div className="col">
                  <label htmlFor="checkout"><h4>Check-out</h4></label>
                  <input className="form-control" type="date" id="checkout" name="checkout"></input>
                </div>
              </div>

              <div className="d-flex justify-content-center gap-3 custom-select">
                <div className="col-3">
                  <label htmlFor="adultos"><h4>Adultos</h4></label>
                  <select className="form-select" name="adultos" id="adultos">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                <div className="col-3">
                  <label htmlFor="children"><h4>Niños</h4></label>
                  <select className="form-select" name="children" id="children">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
              </div>

              <div className='container d-flex justify-content-center'>
                <input className='btn' type='submit' value='Buscar'></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
