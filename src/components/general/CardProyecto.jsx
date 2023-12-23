import { Link, useNavigate, useLocation } from "react-router-dom";
import React from 'react';

const CardProyecto = ({nombre, proyecto, modulo}) => {
  
  const navigate = useNavigate();

  const irHaciaProyecto = () => {
    navigate('/estudiante/modulos/proyectos/seccion', {state: {proyecto: proyecto}, state: {modulo: modulo}});
  }

  return (
    <div className=''>
      <button className='estilo-card h-auto'>
        <div className='grid-contenido-card'>
              <div className='grid-card-1'>
              </div>
              <div className='grid-card-2'>
                <h4 onClick={irHaciaProyecto}>{nombre}</h4>
              </div>
          </div>
      </button>
    </div>
  )
}

export default CardProyecto
