import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Route, Link, Outlet,useLocation} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BienvenidaAcademico = () => {
  const {showSidebar,setShowSidebar, authUser,direccionIP} = useAuth()
  return (
    <div className='imagen-fondo' >
      <div className='justify-content-center text-center mb-5 mt-2  p-1' style={{color:"#7a8584"}}>
        <h1>Te damos la bienvenida {authUser.usuario.nombres}</h1>
      </div>

      <div className='container border-0 text-center  mb-3 mt-3 p-1'>
        <div className='box-titulo-bienvenida'>
          <h3>Acceso rapido</h3>
        </div>
        <div className='pb-3 pt-1 justify-content-around'>
          <Row xs={1} md={2} lg={3} className='m-3 g-3'>
            <Col>
              <div className="d-flex texto-restringido"><Link className='link-acceso-directo' to="director/instancias/agregar"><i className="bi bi-patch-plus me-2"></i>Agregar Instancia de Módulo</Link></div>
            </Col>
            <Col>
              <div className="d-flex texto-restringido"><Link className='link-acceso-directo' to="#"><i className="bi bi-people me-2"></i>Ver usuarios</Link></div>
            </Col>
            <Col>
              <div className="d-flex texto-restringido"><Link className='link-acceso-directo' to="director/instancias"><i className="bi bi-card-checklist me-2"></i>Ver instancias</Link></div>
            </Col>
          </Row>
        </div>
      </div>

      <div className=''>
        <div className='container text-center mb-3 mt-3 p-1'>
          <div className='box-titulo-bienvenida'>
            <h3>Resumen</h3>
          </div>
          <div className='pb-4 pt-3  d-flex justify-content-center w-100'>
            <Row xs={1} md={1} lg={2} className='m-3 g-5 w-100'>
              <Col className='mb-4'>
                <div>
                  <div>
                    <h2 style={{color:"#7a8584"}}>Modulos Inscritos</h2>
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
              </Col>
              <Col className='mb-4'>
                <div>
                  <div>
                    <h2 style={{color:"#7a8584"}}>Notificaciones</h2>
                  </div>
                  <div>
                    <div>
                      <i class="bi bi-bell" style={{fontSize: "3rem"}}></i>
                    </div>
                    <div>
                      Tienes X notificaciones de proyectos
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BienvenidaAcademico
