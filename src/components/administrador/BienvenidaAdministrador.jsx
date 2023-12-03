import React,{useState,useEffect} from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import axios from "axios";
import { Route, Link, Outlet,useLocation} from 'react-router-dom';

const BienvenidaAdministrador = () => {
  const {showSidebar,setShowSidebar, authUser,direccionIP} = useAuth()
  const [universidades, setUniversidades] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  let datosPreprocesados;

  const getUniversidades = async () => {
    const response = await axios.get(
      `http://${direccionIP}/universidad/filtro/todas`
    );
    datosPreprocesados = response.data.universidades.map((universidad) => ({
      ...universidad,
      cantidadModulos: universidad.modulos ? universidad.modulos.length : 0,
    }));
    setUniversidades(datosPreprocesados); // Actualiza el estado con los datos obtenidos
  };

  const getUsuarios = async () => {
    const response = await axios.get(
      `http://${direccionIP}/usuario_roluniversidad_universidad/countByUniversidad`
    );
    console.log(response.data.filas)
    const datosConvertidos = Object.entries(response.data.filas.fila).map(([nombre, cantidad]) => ({
      nombre,
      cantidad
    }));
    console.log(datosConvertidos)
    setUsuarios(datosConvertidos);
  };

  useEffect(() => {
    getUniversidades();
    getUsuarios();
  }, []);


  return (
    <div className='imagen-fondo'>
      <div className='justify-content-center text-center mb-5 mt-2  p-1' style={{color:"#7a8584"}}>
        <h1>Te damos la bienvenida {authUser.nombres} {authUser.apellidos}</h1>
      </div>

      <div className='container border-0 text-center  mb-3 mt-3 p-1'>
        <div className='mb-2 pb-2 pt-2 box-titulo-bienvenida'>
          <h3>Acceso rapido</h3>
        </div>
        <div className='pb-3 pt-3 d-flex justify-content-around'>
          <h5 className="d-flex"><Link className='link-acceso-directo' to="administrador/usuarios/agregar-excel"><i className="bi bi-file-earmark-plus me-2"></i>Agregar Usuarios con plantilla</Link></h5>
          <h5 className="d-flex"><Link className='link-acceso-directo' to="administrador/universidades/agregar"><i className="bi bi-plus-square me-2"></i>Agregar Universidad</Link></h5>
          <h5 className="d-flex"><Link className='link-acceso-directo' to="administrador/universidades/editar"><i className="bi bi-pen me-2"></i>Editar Universidad</Link></h5>
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
                <h2 style={{color:"#7a8584"}}>Usuarios por universidad</h2>
              </div>
              <div className=''>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={usuarios}>
                    <XAxis dataKey="nombre" stroke="#8884d8" />
                    <YAxis />
                    <Bar dataKey="cantidad" fill="#8884d8" barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <div>
                <h2 style={{color:"#7a8584"}}>Modulos por universidad</h2>
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

export default BienvenidaAdministrador
