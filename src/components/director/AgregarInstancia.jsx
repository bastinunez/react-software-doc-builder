import React,{useState} from 'react'
import { Route, Link, Outlet,useLocation, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import VentanaModal from '../general/VentanaModal';
import {useAuth} from '../../context/AuthContext'
import axios from 'axios';
import { useEffect } from 'react';

const AgregarInstanciaDirector = () => {
    const fechaActual = new Date();
    const {showSidebar,setShowSidebar,authUser, updateAuth,direccionIP} = useAuth()
    const [profesores,setProfesores] = useState([])
    const [profesor,setProfesor] = useState()
    const [seccion,setSeccion] = useState()

    // Obtener los componentes de la fecha (día, mes, año)
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript comienzan desde 0
    const año = fechaActual.getFullYear();

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const mostrarModal = () => setShowModal(true);
    const [cuerpoModal, setCuerpoModal] = useState("");
    const [tituloModal, setTituloModal] = useState("");

    const navigate = useNavigate()
    const location = useLocation()

    const getProfesoresUniversidad = async () => {
        try {
            const datos = {
                abreviacion: authUser.universidad.abreviacion,
                rol:"Profesor"
            }
            //console.log(authUser.universidad.abreviacion)
            const response = await axios.get(`http://${direccionIP}/usuario_roluniversidad_universidad/findByUniversidadAndRol`,{
                params:datos
            });
            //console.log(response.data.filas)
            setProfesores(response.data.filas);
        } catch (error) {
            console.error("Hubo un problema al obtener las universidades: ", error);
        }
    }

    useEffect(() => {
        getProfesoresUniversidad()
    },[])

    const volver = () => {
        navigate( '/director/modulos/instancia',{state:{abreviacion:authUser.universidad.abreviacion,nombreModulo:location.state.nombreModulo}});
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post(`http://${direccionIP}/instanciamodulo/guardar`,{
                nombre:location.state.nombreModulo,
                ano:año,
                semestre:mes > 5 ? "2":"1",
                seccion:seccion.toLowerCase(),
                rutProfesor:profesor,
                abreviacionUniversidad:authUser.universidad.abreviacion
            })
            if (response.data){
                setTituloModal('<span class="bi bi-check-circle text-success mx-2"></span>Éxito');
                setCuerpoModal('Se agregó correctamente la instancia.');
                mostrarModal();
                return;
            }
        }catch{
            setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
            setCuerpoModal("Ocurrió un error al agregar la instancia.");
            mostrarModal();
            return;
        }
    }

    return (
        <div>
            <div>
                <div>
                    <h1 className='text-center'>Agregar Usuario</h1>
                </div>
                <button className='btn btn-primary' onClick={volver}>Volver atrás</button>
                <div className='w-100 d-flex justify-content-center '>
                    <div className='w-100' style={{maxWidth:"600px"}}>
                        <div className='p-4'>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group className="mb-3" controlId="">
                                    <Form.Label>Año</Form.Label>
                                    <Form.Control type="text" disabled placeholder={año} defaultValue={año}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="">
                                    <Form.Label>Semestre</Form.Label>
                                    <Form.Control type="text" disabled placeholder={mes > 5 ? "2":"1"} defaultValue={mes > 5 ? "2":"1"}/>
                                </Form.Group>
                                
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Label>Seccion</Form.Label>
                                    <Form.Control type="text" placeholder={"Ingrese seccion"} onChange={(e) => setSeccion(e.target.value)} defaultValue={"A"}/>
                                </Form.Group>
                                
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Label>Asignar profesor</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e) => setProfesor(e.target.value)} value={profesor}>
                                    <option value="">Seleccionar Profesor</option>
                                    {profesores.map((profesor,index) => (
                                        <option key={index} value={profesor.usuarioRolUniversidadUniversidadPk.usuario.rut                                      }>
                                        {profesor.usuarioRolUniversidadUniversidadPk.usuario.nombres} {profesor.usuarioRolUniversidadUniversidadPk.usuario.apellidos}
                                        </option>
                                    ))}
                                    </Form.Select>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Agregar
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
                {showModal && <VentanaModal titulo={tituloModal} cuerpo={cuerpoModal} showModal={showModal} handleClose={handleClose} />}
                
            </div>
        </div>
    )
}

export default AgregarInstanciaDirector
