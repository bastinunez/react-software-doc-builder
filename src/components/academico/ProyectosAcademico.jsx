import React, { useEffect,useState} from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import CardProyecto from '../general/CardProyecto'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useAuth } from "../../context/AuthContext"
import axios from "axios";


const ProyectosAcademico = () => {
  const {authUser,updateAuth,lastPath,setLastPath,direccionIP} = useAuth()
  const location = useLocation();
  const navigate = useNavigate()

  const [proyectos,setProyectos] = useState([])
  const [modulo,setModulo] = useState(location.state.modulo)

  const [yearList,setYearList] = useState([])
  const [semestre,setSemestre] = useState(null)
  const [semestreList,setSemestreList] = useState([])


  const getProyectos = async () => {
    const response = await axios.get(`http://${direccionIP}/proyecto/`)
    if (response.data.filas){
      //console.log(response.data.filas)
      const proyectosFiltrados = response.data.filas.filter(proyecto => {
        // Verifica si el nombre del módulo coincide con el nombre deseado
        return proyecto.proyectoPK.instanciaModulo.instanciaModuloPK.modulo.nombre === modulo.instanciaModuloPK.modulo.nombre;
      });
      //console.log(proyectosFiltrados)
      setProyectos(proyectosFiltrados)
    }
  }

  const volver = () => {
    navigate('/profesor/modulos');
  }

  useEffect( ()  => {
    getProyectos()
  })

  return (
    <div className='container'>
        <div className="pt-2 pb-5">
            <h1 className="text-center">Proyectos</h1>
        </div>
        <button className='btn btn-primary' onClick={volver}>Volver atrás</button>
        <div>
          <Row xs={1} md={1} lg={1} className='m-3 g-3'>
            {
              proyectos.length == 0 ?
              <>
                <h2>No hay proyectos asociados</h2>
              </>
              :
              <>
              {proyectos.map( (proyecto,index) => (
                <Col key={index}>
                  <CardProyecto nombre={proyecto.proyectoPK.nombre} proyecto={proyecto} />
                </Col>
              ))}
              </>
              
            }
           
          </Row>
        </div>
    </div>
  )
}

export default ProyectosAcademico
