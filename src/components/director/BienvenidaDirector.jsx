import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Route, Link, Outlet,useLocation} from 'react-router-dom';

const BienvenidaDirector = () => {
  const {showSidebar,setShowSidebar, authUser,direccionIP} = useAuth()
  //console.log(authUser)
  return (
    <div className='imagen-fondo'>
      <div className='justify-content-center text-center mb-5 mt-2  p-1' style={{color:"#7a8584"}}>
        <h1>Te damos la bienvenida {authUser.usuario.nombres} {authUser.usuario.apellidos}</h1>
      </div>

      <div className='container border-0 text-center  mb-3 mt-3 p-1'>
        <div className='mb-2 pb-2 pt-2 box-titulo-bienvenida'>
          <h3>Acceso rapido</h3>
        </div>
        <div className='pb-3 pt-3 d-flex justify-content-around'>
          <h5 className="d-flex"><Link className='link-acceso-directo' to="director/instancias/agregar"><i className="bi bi-patch-plus me-2"></i>Agregar Instancia de Módulo</Link></h5>
          <h5 className="d-flex"><Link className='link-acceso-directo' to="#"><i className="bi bi-people me-2"></i>Ver usuarios</Link></h5>
          <h5 className="d-flex"><Link className='link-acceso-directo' to="director/instancias"><i className="bi bi-card-checklist me-2"></i>Ver instancias</Link></h5>
        </div>
      </div>

      <div className=''>
        <div className='container text-center mb-3 mt-3 p-1'>
          <div className='mb-4  pb-2 pt-2 box-titulo-bienvenida'>
            <h3>Resumen</h3>
          </div>
          <div className='pb-4 pt-3  d-flex justify-content-around'>
            <div>
              <div>
                <h2 style={{color:"#7a8584"}}>Modulos de la universidad</h2>
              </div>
              <div>
                {/* <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={usuarios}>
                    <XAxis dataKey="nombre" stroke="#8884d8" />
                    <YAxis />
                    <Bar dataKey="cantidad" fill="#8884d8" barSize={30} />
                  </BarChart>
                </ResponsiveContainer> */}
              </div>
            </div>
            <div>
              <div>
                <h2 style={{color:"#7a8584"}}>Usuarios de la universidad</h2>
              </div>
              <div>
                {/* <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={usuarios}>
                    <XAxis dataKey="nombre" stroke="#8884d8" />
                    <YAxis />
                    <Bar dataKey="cantidad" fill="#8884d8" barSize={30} />
                  </BarChart>
                </ResponsiveContainer> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BienvenidaDirector
