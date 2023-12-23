import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const CardProyecto = ({nombre, proyecto}) => {
  const navigate = useNavigate()
  const {showSidebar,setShowSidebar, authUser,direccionIP} = useAuth()
  console.log(proyecto)

  const handleSubmit = () => {
    //console.log(proyecto)
    //console.log("Aqui hay que enviar los datos para obtener las instancias")
    if (authUser.rol.nombre === 'Estudiante') {
      navigate("/estudiante/modulos/proyectos/seccion",{state:{proyecto:proyecto}})
    } else if (authUser.rol.nombre === 'Profesor') {
      navigate("/profesor/modulos/proyectos/proyecto",{state:{proyecto:proyecto}})
    }
  }
  
  return (
    <div className=''>
      <button className='estilo-card h-auto' onClick={handleSubmit}>
        <div className='grid-contenido-card'>
              <div className='grid-card-1'>
              </div>
              <div className='grid-card-2'>
                <h4>{nombre}</h4>
              </div>
          </div>
      </button>
    </div>
  )
}

export default CardProyecto
