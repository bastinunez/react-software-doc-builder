import React, { useEffect,useState} from 'react'
import CardModulo from '../general/CardModulo'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useAuth } from "../../context/AuthContext"
import axios from "axios";

const ModulosAcademico = () => {
  const {authUser,updateAuth,lastPath,setLastPath,direccionIP} = useAuth()
  const [modulos,setModulos] = useState([])
  const [modulosFiltrador,setModulosFiltrado] = useState([])
  const [year,setYear] = useState()
  const [semestre,setSemestre] = useState()

  const getModulos = async () => {
    const response = await axios.get(`http://${direccionIP}/instanciamodulo/findByRutProfesor`,
    {params:{
      rut:authUser.usuario.rut
      }
    }
    );
    //console.log(response.data.filas)
    setModulos(response.data.filas)
  };

  const getMaxYear = () => {
    //console.log("año:",Math.max(...modulos.map(instancia => instancia.instanciaModuloPK.ano)))
    return Math.max(...modulos.map(instancia => instancia.instanciaModuloPK.ano));
  };

  const filtrarInstancias = (ano, semestre) => {
    //console.log("filtrador:",modulos.filter(instancia => instancia.instanciaModuloPK.ano === ano && instancia.instanciaModuloPK.semestre === semestre))
    return modulos.filter(
      instancia => instancia.instanciaModuloPK.ano === ano && instancia.instanciaModuloPK.semestre === semestre);
  };

  useEffect(()=>{
    getModulos()
    setModulosFiltrado(filtrarInstancias(getMaxYear(),2))
    //console.log(modulosFiltrador)
  },[])

  return (
    <div>
        <div className='d-flex'>
            <div className='d-flex'>
              <div className='align-items-center d-flex'>
                <div className='pe-1 ps-1' style={{width:"10rem"}}>
                  <Form.Select aria-label="Default select example">
                    <option defaultValue={"2022"} value="2022">2022</option>
                    <option value="2023">2023</option>
                  </Form.Select>
                </div>
                <div className='pe-1 ps-1' style={{width:"10rem"}}>
                  <Form.Select aria-label="Default select example">
                    <option defaultValue={"1"} value="1">1</option>
                    <option value="2">2</option>
                  </Form.Select>
                </div>
              </div>
            </div>
        </div>
        <div>
          <Row xs={1} md={2} lg={3} className='m-3 g-3'>
            {modulos.map( (modulo,index) => (
              <Col key={index}>
                <CardModulo nombre={modulo.instanciaModuloPK.modulo.nombre} seccion={modulo.instanciaModuloPK.seccion}/>
              </Col>
            ))}
          </Row>
        </div>
    </div>
  )
}

export default ModulosAcademico
