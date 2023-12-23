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
    const [nombreRol, setNombreRol] = useState();
    const [universidades, setUniversidades] = useState([]);
    
    // Ventana modal
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
            const response = await axios.get(`http://${direccionIP}/universidad/habilitadas`);
            setUniversidades(response.data.filas);
        } catch (error) {
            console.error("Hubo un problema al obtener las universidades: ", error);
        }
        };
        fetchUniversidades();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(nombreRol === ""){
            setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
            setCuerpoModal("Falta el rol"); 
            mostrarModal(); 
            return;
        }

        //alert("Password: " + passwordUsuario);

        //Agregar universidad a la base de datos.
        try{
            const response = await axios.post(`http://${direccionIP}/usuario/guardar`, {
                rut: rut,
                nombres: nombresUsuario,
                apellidos: apellidosUsuario,
                contrasena: passwordUsuario,
                email: emailUsuario,
                nombreRol: nombreRol,
                abreviacionUniversidad: authUser.universidad.abreviacion
            });

            setTituloModal('<span class="bi bi-check-circle text-success mx-2"></span>Éxito');
            setCuerpoModal('Se agregó correctamente el usuario.');
            mostrarModal();
            return;
        }
        catch(error){
            setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
            setCuerpoModal("Ocurrió un error al agregar el usuario.");
            mostrarModal();
            return;
        }
    }

    const navigate = useNavigate();

    const volver = () => {
        navigate( '/director/usuarios');
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
                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese nombres" onChange={(e) => setNombresUsuario(e.target.value)} required />
                            
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese apellidos"  onChange={(e) => setApellidosUsuario(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese correo"  onChange={(e) => setEmailUsuario(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Ingrese contraseña"  onChange={(e) => setPasswordUsuario(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Rol</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={ (e) => setNombreRol(e.target.value) } value={nombreRol}>
                                <option value="">Elegir rol</option>
                                <option key={"1"} value="Jefe de Carrera">Jefe de Carrera</option>
                                <option key={"2"} value="Profesor">Profesor</option>
                                <option key={"3"} value="Estudiante">Estudiante</option>
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
