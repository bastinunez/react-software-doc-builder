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
import {getUsuario,actualizarPerfil} from '../general/Consultas'


const VerPerfil = () => {
    const location = useLocation();
    const {showSidebar,setShowSidebar,authUser, updateAuth,direccionIP} = useAuth()
    const [usuario,setUsuario] = useState()
    const [rut,setRut] = useState()
    const [nombre,setNombre] = useState()
    const [apellido,setApellido] = useState()


    const getUsuario = async () => {
        //console.log(authUser.rol_plataforma? authUser.rut:authUser.usuario.rut)
        try{
            const response = await axios.get(`http://${direccionIP}/usuario/findByRut?rut=${authUser.rol_plataforma? authUser.rut:authUser.usuario.rut}`);
            //console.log(response.data.filas)
            if (response.data.filas){
                setUsuario(response.data.filas)
                setNombre(response.data.filas.nombres)
                setApellido(response.data.filas.apellidos)
                setRut(response.data.filas.rut)
            }
        }
        catch(error){
            console.log(error)
        }
        
    }
    //console.log(authUser)
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const response = await axios.patch(`http://${direccionIP}/usuario/actualizar`, {
                rut:rut,
                nombres: nombre,
                apellidos: apellido,
                contrasena: usuario.contrasena,
                email: usuario.email
            });
            if (authUser.usuario?.rol_plataforma){
                const datos = {
                    usuario:response.data.filas,
                    rol:{
                        nombre: authUser.rol.nombre
                    },
                    universidad:{abreviacion:authUser.universidad.abreviacion}
                }
                //console.log(datos)
                updateAuth(datos)
            }else{
                updateAuth(response.data.filas)
            }
            
        }
        catch(error){
            console.log(error)
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
                                Hola {authUser.rol_plataforma? authUser.nombres:authUser.usuario.nombres}
                            </h3>
                        </div>
                        
                    </div>
                </div>
                <div className=' mt-4 container-border p-3'>
                    <Form onSubmit={handleSubmit}> 
                        <Row>
                            
                                <Form.Group className="mb-3" controlId="form-rut" style={{maxWidth:"150px"}}>
                                    <Form.Label>Rut</Form.Label>
                                    {/* <Form.Label>{authUser.usuario.rut}</Form.Label> */}
                                    <Form.Control disabled type="text" 
                                    placeholder={authUser.rol_plataforma? authUser.rut:authUser.usuario.rut} defaultValue={rut}/>
                                </Form.Group>
                            
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="form-nombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" 
                                    placeholder={authUser.rol_plataforma? authUser.nombres:authUser.usuario.nombres} defaultValue={nombre} onChange={(e) => setNombre(e.target.value)}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="form-apellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text" 
                                    placeholder={authUser.rol_plataforma? authUser.apellidos:authUser.usuario.apellidos} defaultValue={apellido} onChange={(e) => setApellido(e.target.value)}/>
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
