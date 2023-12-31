import React,{useState,useEffect} from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import axios from "axios";
import { Route, Link, Outlet,useLocation} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const BienvenidaAdministrador = () => {
  const {showSidebar,setShowSidebar, authUser,direccionIP} = useAuth()
  const [modulos, setModulos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  let datosPreprocesados;

  const getCantidadMoudulos = async () => {
    const response = await axios.get(
      `http://${direccionIP}/modulo/cantidadModulosEnUniversidad`
    );
    setModulos(response.data.filas)
    //console.log(response.data.filas)
  };

  const getCantidadUsuarios = async () => {
    const response = await axios.get(
      `http://${direccionIP}/usuario_roluniversidad_universidad/countByUniversidad`
    );
    //console.log(response.data.filas)
    const datosConvertidos = Object.entries(response.data.filas.fila).map(([nombre, cantidad]) => ({
      nombre,
      cantidad
    }));
    //console.log(datosConvertidos)
    setUsuarios(datosConvertidos);
  };

  useEffect(() => {
    getCantidadMoudulos();
    getCantidadUsuarios();
  }, []);


  return (
    <div className='imagen-fondo'>
      <div className='justify-content-center text-center mb-5 mt-2  p-1' style={{color:"#7a8584"}}>
        <h1>Te damos la bienvenida {authUser.nombres} {authUser.apellidos}</h1>
      </div>

      <div className='container border-0 text-center  mb-3 mt-3 p-1'>
        <div className='mb-1 pb-2 pt-2 box-titulo-bienvenida'>
          <h3>Acceso rapido</h3>
        </div>
        <div className='pb-3 pt-1 justify-content-around'>
          <Row xs={1} md={2} lg={3} className='m-3 g-3'>
            <Col  className='justify-content-center'>
              <div className="d-flex texto-restringido"><Link className='link-acceso-directo' to="administrador/usuarios/agregar-excel"><i className="bi bi-file-earmark-plus me-2"></i>Agregar Usuarios con plantilla</Link></div>
            </Col>
            <Col>
              <div className="d-flex texto-restringido"><Link className='link-acceso-directo' to="administrador/universidades/agregar"><i className="bi bi-plus-square me-2"></i>Agregar Universidad</Link></div>
            </Col>
            <Col>
            <div className="d-flex texto-restringido"><Link className='link-acceso-directo' to="administrador/universidades/editar"><i className="bi bi-pen me-2"></i>Editar Universidad</Link></div>
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
                    <h2 style={{color:"#7a8584"}}>Usuarios por universidad</h2>
                  </div>
                  <div className='justify-content-center'>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={usuarios}>
                        <XAxis dataKey="nombre" stroke="#8884d8" />
                        <YAxis />
                        <Bar dataKey="cantidad" fill="#8884d8" barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Col>
            <Col className='mb-4'>
              <div>
                  <div>
                    <h2 style={{color:"#7a8584"}}>Modulos por universidad</h2>
                  </div>
                  <div>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={modulos}>
                        <XAxis dataKey="universidad.abreviacion" stroke="#8884d8" />
                        <YAxis />
                        <Bar dataKey="totalCursos" fill="#8884d8" barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
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

export default BienvenidaAdministrador
