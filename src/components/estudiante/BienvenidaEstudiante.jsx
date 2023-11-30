import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Route, Link, Outlet,useLocation} from 'react-router-dom';

const BienvenidaEstudiante = () => {
    const {showSidebar,setShowSidebar, authUser,direccionIP} = useAuth()
  return (
    <div className='imagen-fondo'>
      <div className='justify-content-center text-center mb-5 mt-3  p-1'>
        <h1>Te damos la bienvenida {authUser.usuario.nombres}</h1>
      </div>

      <div className='container bordeNegro text-center  mb-5 mt-5 p-1'>
        <div className='mb-4 pb-2 pt-2'>
          <h3>Acceso rapido</h3>
        </div>
        <div className='pb-5 pt-5 d-flex justify-content-around'>
          <h5 className="d-flex"><Link className='link-acceso-directo' to="#"><i className="bi bi-card-checklist me-2"></i>Ver mis cursos</Link></h5>
          <h5 className="d-flex"><Link className='link-acceso-directo' to="#"><i className="bi bi-people me-2"></i>Acceso Directo 2</Link></h5>
          <h5 className="d-flex"><Link className='link-acceso-directo' to="#"><i className="bi bi-card-checklist me-2"></i>Acceso Directo 3</Link></h5>
        </div>
      </div>

      <div className='bordeNegro'>
        <div className='container text-center mb-3 mt-3 p-1'>
          <div className='mb-4'>
            <h3>Resumen</h3>
          </div>
          <div className='pb-4 pt-4  d-flex justify-content-around'>
            <h2>AQUI VAN GRAFICOS</h2>
            <i className="bi bi-bar-chart-fill bi-md"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BienvenidaEstudiante
