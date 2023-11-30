import React,{useState} from 'react'
import { Route, Link, Outlet,useLocation} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import {useAuth} from '../../context/AuthContext'
import axios from 'axios';
import { useEffect } from 'react';


const VerPerfil = () => {
    const location = useLocation();
    const {showSidebar,setShowSidebar,authUser, updateAuth,direccionIP} = useAuth()
    const [usuario,setUsuario] = useState()
    const [rut,setRut] = useState()
    const [nombre,setNombre] = useState()
    const [apellido,setApellido] = useState()


    const getUsuario = async (e) => {
        try{
            const response = await axios.get(`http://${direccionIP}/usuario/${authUser.usuario.rut}`);
            setUsuario(response.data.usuario)
            setNombre(response.data.usuario.nombres)
            setApellido(response.data.usuario.apellidos)
            console.log(response.data.usuario)
        }
        catch(error){
            console.log(error)
        }
        
    }

    const handleSubmit = async (e) =>{
        try{
            const response = await axios.patch(`http://${direccionIP}/usuario`, {
                rut:usuario.rut,
                nombres: nombre,
                apellidos: apellido,
                contrasena: usuario.contrasena,
                email: usuario.email
            });
            console.log(response.data)
        }
        catch(error){
        }
    }
    
    useEffect( () => {
        getUsuario();
    },[])



    return (
        <div>
            <div className='pe-5 ps-5'>
                <div className=''>
                    <div className=' container-border p-3 ps-4 d-flex'>
                        <div>
                            <i className="bi bi-person-circle" style={{fontSize: "2rem"}}></i>
                        </div>
                        <div className='align-items-center d-flex ms-3'>
                            <h3 className='p-0 m-0 align-items-center'>
                                Hola {authUser.usuario.nombres}
                            </h3>
                        </div>
                        
                    </div>
                </div>
                <div className=' mt-4 container-border p-3'>
                    <Form onSubmit={handleSubmit}> 
                        <Row>
                            
                                <Form.Group className="mb-3 w-25" controlId="form-rut">
                                    <Form.Label>Rut</Form.Label>
                                    <Form.Control disabled type="text" placeholder={authUser.usuario.rut} value={authUser.usuario.rut} onChange={(e) => setRut(e.target.value)}/>
                                </Form.Group>
                            
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="form-nombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" placeholder={authUser.usuario.nombres} value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="form-apellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text" placeholder={authUser.usuario.apellidos} value={apellido} onChange={(e) => setApellido(e.target.value)}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3 pe-5 ps-5'>
                            <Button variant="outline-success" type="submit">Guardar</Button>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
  )
}

export default VerPerfil
