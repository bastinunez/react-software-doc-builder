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
  const [year,setYear] = useState(null)
  const [yearList,setYearList] = useState([])
  const [semestre,setSemestre] = useState(null)
  const [semestreList,setSemestreList] = useState([])

  const getModulos = async () => {
    const response = await axios.get(`http://${direccionIP}/instanciamodulo/findByRutProfesor`,
    {params:{
      rut:authUser.usuario.rut
      }
    }
    );
    if (response.data.filas){
      setModulos(response.data.filas)
      setYearList([...new Set(response.data.filas.map(item => item.instanciaModuloPK.ano))])
      setSemestreList([...new Set(response.data.filas.map(item => item.instanciaModuloPK.semestre))])
    }else{
      setModulos([])
      setYearList([])
      setSemestreList([])
    }
    
  };

  const filtrarInstancias = (ano, semestre) => {
    if (ano == null && semestre == null){
      ano = yearList[yearList.length-1]
      semestre = semestreList[semestreList.length-1]
    }
    return modulos.filter(
      instancia => instancia.instanciaModuloPK.ano === ano && instancia.instanciaModuloPK.semestre === semestre);
  };

  useEffect(()=>{
    getModulos()
  }, [])

  useEffect(()=>{
    setModulosFiltrado( filtrarInstancias(year, semestre) )
  }, [year, yearList, semestre, semestreList])

  return (
    <div>
        <div className='d-flex'>
            <div className='d-flex'>
              <div className='align-items-center d-flex'>
                <div className='pe-1 ps-1' style={{width:"10rem"}}>
                  <Form.Select aria-label="Default select example" onChange={(e) => setYear(parseInt(e.target.value))}>
                    {yearList.map( (year,index) => (
                      <option key={index} value={year}>{year}</option>
                    ))}
                  </Form.Select>
                </div>
                <div className='pe-1 ps-1' style={{width:"10rem"}}>
                  <Form.Select aria-label="Default select example" onChange={(e) => setSemestre(parseInt(e.target.value))}>
                  {semestreList.map( (semestre,index) => (
                      <option key={index} value={semestre}>{semestre}</option>
                    ))
                  }
                  </Form.Select>
                </div>
              </div>
            </div>
        </div>
        <div>
          <Row xs={1} md={2} lg={3} className='m-3 g-3'>
            {
              modulos.length === 0?
              <>
                <h2>No tienes modulos asociados</h2>
              </>
              :
              <>
                {modulosFiltrador.map( (modulo,index) => (
                  <Col key={index}>
                    <CardModulo modulo={modulo} nombre={modulo.instanciaModuloPK.modulo.nombre} seccion={modulo.instanciaModuloPK.seccion} rol={'Profesor'}/>
                  </Col>
                ))}
              </>
              
            }
            
          </Row>
        </div>
    </div>
  )
}

export default ModulosAcademico
