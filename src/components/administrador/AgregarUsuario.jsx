import React,{useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import VentanaModal from '../general/VentanaModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AgregarUsuario = () => {
    const {showSidebar,setShowSidebar, authUser,lastPath,setLastPath,direccionIP} = useAuth()
    const [rut, setRut] = useState("");
    const [nombresUsuario,setNombresUsuario] = useState("");
    const [apellidosUsuario, setApellidosUsuario] = useState("");
    const [passwordUsuario, setPasswordUsuario] = useState("");
    const [emailUsuario,setEmailUsuario] = useState("");
    const [rolId, setRolId] = useState();
    const [universidadId, setUniversidadId] = useState("");
    const [universidades, setUniversidades] = useState([]);
    
    const [showModal, setShowModal] = useState(false);
    const [tituloModal, setTituloModal] = useState("");
    const [cuerpoModal, setCuerpoModal] = useState("");
    const handleClose = () => {
        setShowModal(false)
    };
    const mostrarModal = () => {
        setShowModal(true)
    };

    useEffect(() => {
        const fetchUniversidades = async () => {
        try {
            const response = await axios.get(`http://${direccionIP}/universidad/filtro/habilitadas`);
            setUniversidades(response.data.universidades);
        } catch (error) {
            console.error("Hubo un problema al obtener las universidades: ", error);
        }
        };
        fetchUniversidades();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(universidadId === "" | rolId === ""){
            setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
            setCuerpoModal("Falta la universidad y/o rol"); 
            mostrarModal(); 
            return;
        }

        //alert("Password: " + passwordUsuario);

        //Agregar universidad a la base de datos.
        try{
            const response = await axios.post('http://localhost:8080/usuario/guardar_con_rol_en_universidad', {
                rut,
                nombres: nombresUsuario,
                apellidos: apellidosUsuario,
                contrasena: passwordUsuario,
                email: emailUsuario,
                rolId,
                universidadId

            });
            if (!response.data.exito) {
                setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
                setCuerpoModal(response.data.mensaje); 
                mostrarModal(); 
                return;   
            }
            setTituloModal('<span class="bi bi-check-circle text-success mx-2"></span>Éxito');
            setCuerpoModal(response.data.mensaje); 
            mostrarModal();
            setRut("");
            console.log(response.data)


        }
        catch(error){
            setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>No se pudo agregar el usuario');
            setCuerpoModal(error); 
            mostrarModal();
            console.log(error)
        }
    }

    const navigate = useNavigate();

    const volver = () => {
        navigate(last);
    }

    return (
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
                            <Form.Label>RUT</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese rut" value={rut} onChange={(e) => setRut(e.target.value)} required />
                            {/* <Form.Text className="text-muted">
                                Ingrese nombre universidad
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese nombres" onChange={(e) => setNombresUsuario(e.target.value)} required />
                            {/* <Form.Text className="text-muted">
                                Ingrese nombre universidad
                            </Form.Text> */}
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese apellidos"  onChange={(e) => setApellidosUsuario(e.target.value)} required />
                            {/* <Form.Text className="text-muted">
                                Ingrese abreviación
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese correo"  onChange={(e) => setEmailUsuario(e.target.value)} required />
                            {/* <Form.Text className="text-muted">
                                Ingrese abreviación
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Ingrese contraseña"  onChange={(e) => setPasswordUsuario(e.target.value)} required />
                            {/* <Form.Text className="text-muted">
                                Ingrese abreviación
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Rol</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={ (e) => setRolId(e.target.value) } value={rolId}>
                                <option value="">Elegir rol</option>
                                <option key={"1"} value="1">Jefe de Carrera</option>
                                <option key={"2"} value="2">Profesor</option>
                                <option key={"3"} value="3">Estudiante</option>
                            </Form.Select>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Universidad asociada</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setUniversidadId(e.target.value)} value={universidadId}>
                            <option value="">Seleccionar universidad</option>
                            {universidades.map((universidad) => (
                                <option key={universidad.abreviacion} value={universidad.abreviacion}>
                                {universidad.nombre}
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
    
  )
}

export default AgregarUsuario
