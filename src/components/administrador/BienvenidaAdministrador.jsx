import React,{useState,useEffect} from 'react'
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
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
      `http://${direccionIP}/usuario/filtro/todos`
    );
    const usuariosData = response.data.usuarios;

    // Crear un objeto para almacenar la cantidad de usuarios por universidad
    const usuariosPorUniversidad = {};

    // Contar la cantidad de usuarios por universidad
    usuariosData.forEach((usuario) => {
      try {
        const abreviatura =
        usuario.usuarioUniversidadRoles[0].universidad.abreviacion;

        if (!usuariosPorUniversidad[abreviatura]) {
          usuariosPorUniversidad[abreviatura] = 1;
        } else {
          usuariosPorUniversidad[abreviatura]++;
        }
      } catch (error) {
        
      }

    });

    const datosPreprocesados = Object.keys(usuariosPorUniversidad).map(
      (abreviatura) => ({
        abreviatura,
        cantidadUsuarios: usuariosPorUniversidad[abreviatura],
      })
    );

    setUsuarios(datosPreprocesados);
    
    // console.log(response.data.usuarios[1].usuarioUniversidadRoles[0].universidad.nombre);
  };

  useEffect(() => {
    getUniversidades();
    getUsuarios();
  }, []);


  return (
    <div className='imagen-fondo'>
      <div className='justify-content-center text-center mb-5 mt-3  p-1'>
        <h1>Te damos la bienvenida {authUser.nombres} {authUser.apellidos}</h1>
      </div>

      <div className='container bordeNegro text-center  mb-5 mt-5 p-1'>
        <div className='mb-4 pb-2 pt-2'>
          <h3>Acceso rapido</h3>
        </div>
        <div className='pb-5 pt-5 d-flex justify-content-around'>
          <h5 className="d-flex"><Link className='link-acceso-directo' to="administrador/usuarios/agregar-excel"><i className="bi bi-file-earmark-plus me-2"></i>Agregar Usuarios con plantilla</Link></h5>
          <h5 className="d-flex"><Link className='link-acceso-directo' to="administrador/universidades/agregar"><i className="bi bi-plus-square me-2"></i>Agregar Universidad</Link></h5>
          <h5 className="d-flex"><Link className='link-acceso-directo' to="administrador/universidades/editar"><i className="bi bi-pen me-2"></i>Editar Universidad</Link></h5>
        </div>
      </div>

      <div className='bordeNegro'>
        <div className='container text-center mb-3 mt-3 p-1'>
          <div className='mb-4'>
            <h3>Resumen</h3>
          </div>
          <div className='pb-4 pt-4  d-flex justify-content-around'>
            <div>
              <div>
                <h2>Usuarios por universidad</h2>
              </div>
              <div>
                <BarChart width={600} height={300} data={universidades}>
                  <XAxis dataKey="abreviacion" stroke="#8884d8" />
                  <YAxis />
                  <Bar dataKey="cantidadModulos" fill="#8884d8" barSize={30} />
                </BarChart>
              </div>
            </div>
            <div>
              <div>
                <h2>Modulos por universidad</h2>
              </div>
              <div>
                <BarChart width={600} height={300} data={universidades}>
                  <XAxis dataKey="abreviacion" stroke="#8884d8" />
                  <YAxis />
                  <Bar dataKey="cantidadModulos" fill="#8884d8" barSize={30} />
                </BarChart>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default BienvenidaAdministrador
