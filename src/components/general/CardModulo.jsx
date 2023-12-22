import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const CardModulo = ({nombre,seccion,modulo, rol}) => {
  const navigate = useNavigate()

  const handleSubmit = () => {
    //console.log("Aqui hay que enviar los datos para obtener las instancias")
    if (rol === 'Estudiante') {
      navigate("/estudiante/modulos/proyectos",{state:{modulo:modulo}})
    } else if (rol === 'Profesor') {
      navigate("/profesor/modulos/proyectos",{state:{modulo:modulo}})
    }
  }

  return (
    <div className=''>
      <button className='estilo-card h-auto' onClick={handleSubmit}>
        <div className='grid-contenido-card'>
              <div className='grid-card-1'>
              </div>
              <div className='grid-card-2 d-block'>
                <h4>{nombre}</h4>
                <h5>Seccion {seccion}</h5>
              </div>
          </div>
      </button>
    </div>
  )
}

export default CardModulo
