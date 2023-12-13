import React,{useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import VentanaModal from '../general/VentanaModal';
import { useAuth } from '../../context/AuthContext';

const EditarUsuario = () => {
    const {showSidebar,setShowSidebar, authUser,direccionIP} = useAuth()
    const [nombresUsuario,setNombresUsuario] = useState("");
    const [apellidosUsuario, setApellidosUsuario] = useState("");
    const [passwordUsuario, setPasswordUsuario] = useState("");
    const [emailUsuario,setEmailUsuario] = useState("");
    const [roles, setRolesByUser] = useState([]);
    const [checkAgregarRol,setCheckAgregarRol] = useState(false);
    const location = useLocation();
    const rut = location.state.rut;

    const [rolId, setRolId] = useState();
    const [uniAbreviacion, setUniAbreviacion] = useState("");
    const [universidades, setUniversidades] = useState([]);
    
    useEffect(() => {
        const fetchUniversidades = async () => {
        try {
            const response = await axios.get(`http://${direccionIP}/universidad/habilitadas`);
            setUniversidades(response.data.filas);
        } catch (error) {
            console.error("Hubo un problema al obtener las universidades: ", error);
        }
        };
        fetchUniversidades();
    }, []);

    useEffect(() => {
        setCheckAgregarRol(checkAgregarRol)
    }, [checkAgregarRol])

    useEffect(() => {
        setNombresUsuario(location.state.nombres);
        setApellidosUsuario(location.state.apellidos);
        setEmailUsuario(location.state.correo);
        setPasswordUsuario(location.state.contrasena);
        setRolesByUser(location.state.roles);
    }, [location]);

    const [showModal, setShowModal] = useState(false);
    const [tituloModal, setTituloModal] = useState("");
    const [cuerpoModal, setCuerpoModal] = useState("");
    const handleClose = () => {
        setShowModal(false)
    };
    const mostrarModal = () => {
        setShowModal(true)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (checkAgregarRol){
            try {
                const response = await axios.patch(`http://${direccionIP}/usuario_roluniversidad_universidad/anadir_rol_usuario_existente`, {
                    rut: rut,
                    abreviacionUniversidad: uniAbreviacion,
                    nombreRol: rolId
                });
                setTituloModal('<span class="bi bi-check-circle text-success mx-2"></span>Éxito');
                setCuerpoModal('Se añadió correctamente el rol al usuario'); 
                mostrarModal();
            } catch (error) {
                setTituloModal('<span className="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
                setCuerpoModal('Ocurrió un error al agregar el rol al usuario'); 
                mostrarModal();
            }
        }else{
            try{
                const response = await axios.patch(`http://${direccionIP}/usuario/actualizar`, {
                    rut: rut,
                    nombres: nombresUsuario,
                    apellidos: apellidosUsuario,
                    contrasena: passwordUsuario,
                    email: emailUsuario,
    
                });
                setTituloModal('<span class="bi bi-check-circle text-success mx-2"></span>Éxito');
                setCuerpoModal('Usuario actualizado con éxito'); 
                mostrarModal();
                //console.log(response.data)
            }
            catch(error){
                setTituloModal('<span className="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
                setCuerpoModal('Ocurrió un error al editar el usuario'); 
                mostrarModal();
                console.log(error)
            }
        }
        
    }

    const navigate = useNavigate();
    const volver = () => {
        navigate( '/administrador/usuarios');
    }
    return (
    <div>
        <div>
            <h1 className='text-center'>Editar Usuario</h1>
        </div>
        <button className='btn btn-primary' onClick={volver}>Volver atrás</button>
        <div className='w-100 d-flex justify-content-center '>
            <div className='w-100' style={{maxWidth:"600px"}}>
                <div className='p-4'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>RUT</Form.Label>
                            <Form.Control type="text" aria-label="Disabled input example" readOnly value={rut} onChange={(e) => setRut(e.target.value)} required/>
                            {/* <Form.Text className="text-muted">
                                Ingrese nombre universidad
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese nombres" value={nombresUsuario} onChange={(e) => setNombresUsuario(e.target.value)} required/>
                            {/* <Form.Text className="text-muted">
                                Ingrese nombre universidad
                            </Form.Text> */}
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese apellidos" value={apellidosUsuario} onChange={(e) => setApellidosUsuario(e.target.value)} required/>
                            {/* <Form.Text className="text-muted">
                                Ingrese abreviación
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese correo" value={emailUsuario} onChange={(e) => setEmailUsuario(e.target.value)} required/>
                            {/* <Form.Text className="text-muted">
                                Ingrese abreviación
                            </Form.Text> */}
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Ingrese contraseña" value={passwordUsuario} onChange={(e) => setPasswordUsuario(e.target.value)} required/>
                            
                        </Form.Group> */}

                        <div className="mb-3">
                            <div>
                                Roles del usuario:
                            </div>
                            <div>
                                <ListGroup className="w-100">
                                    {roles.map( (rol,index) => (
                                        <ListGroup horizontal key={index} className="w-100">
                                            <ListGroup.Item className="w-50">{rol.fila.nombreRolUniversidad}</ListGroup.Item>
                                            <ListGroup.Item className="w-50">{rol.fila.nombre}</ListGroup.Item>
                                        </ListGroup>
                                        )
                                    )}
                                </ListGroup>
                            </div>
                        </div>
                        

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Agregar Rol a Usuario</Form.Label>
                            <Form.Check type="checkbox" label="¿Desea agregar un rol?" onChange={(e) => setCheckAgregarRol(e.target.checked)} checked={checkAgregarRol}/>
                        </Form.Group>
                        {
                            checkAgregarRol?
                            <>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Label>Rol</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={ (e) => setRolId(e.target.value) } value={rolId} required>
                                        <option value="">Elegir rol</option>
                                        <option key={"1"} value="Jefe de Carrera">Jefe de Carrera</option>
                                        <option key={"2"} value="Profesor">Profesor</option>
                                        <option key={"3"} value="Estudiante">Estudiante</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="">
                            <Form.Label>Universidad asociada</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => setUniAbreviacion(e.target.value)} value={uniAbreviacion} required>
                                <option value="">Seleccionar universidad</option>
                                {universidades.map((universidad) => (
                                    <option key={universidad.abreviacion} value={universidad.abreviacion}>
                                    {universidad.nombre}
                                    </option>
                                ))}
                                </Form.Select>
                            </Form.Group>
                            </>
                            :
                            <></>
                        }

                        <Button variant="primary" type="submit">
                            Guardar cambios
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
        {showModal && <VentanaModal titulo={tituloModal} cuerpo={cuerpoModal} showModal={showModal} handleClose={handleClose} />}
        
    </div>
    
  )
}

export default EditarUsuario
