import "./banner.css"
{/*import { useEffect } from 'react';*/}

function Banner() {
{/*useEffect(() => { BUG, NO FUNCIONA
    const handleScroll = () => {
      let scrollPosition = window.scrollY;
      let banner = document.querySelector(".banner-inicio");

      if (banner) {

        let newBackgroundPosition = scrollPosition * -0.5 + "px"; 
        banner.style.backgroundPosition = "center " + newBackgroundPosition;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);*/}
  return(

    <div className="container-fluid banner-inicio" id="banner-inicio">
      <div className="container">
 <div className='row'>
          <div className='col-8'>
            <h1>Descubre Almería</h1>
            <h3>Parque Natural Cabo de Gata</h3>
            <p>Nos encontramos en la prestigiosa zona del <b>Parque Natural de Cabo de Gata</b>, un paraíso único donde las dunas doradas se encuentran con aguas cristalinas, creando un auténtico oasis de <b>tranquilidad y belleza natural.</b></p>
         <a href="#cabecera">
  <button className="btn">Haz tu Reserva</button>
</a>
          </div>
    </div>
    </div>
    </div>

  );
}

export default Banner