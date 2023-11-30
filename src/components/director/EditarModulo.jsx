import React,{useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useLocation,useNavigate} from 'react-router-dom';
import VentanaModal from '../general/VentanaModal';
import { useAuth } from "../../context/AuthContext"

const EditarModulo = () => {
    const [nombreModulo,setNombreModulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const location = useLocation();
    const {authUser,updateAuth,lastPath,setLastPath,direccionIP} = useAuth()
    const navigate = useNavigate();
    
    // useEffect(() => {
    //     setNombreModulo(location.state.nombres);
    //     setDescripcion(location.state.apellidos);
    //     setEmailUsuario(location.state.correo);
    // }, [location]);

    const [showModal, setShowModal] = useState(false);
    const [cuerpoModal, setCuerpoModal] = useState("");
    const handleClose = () => {
        setShowModal(false)
    };
    const mostrarModal = () => {
        setShowModal(true)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        //Agregar universidad a la base de datos.
        try{
            console.log(location.state.abreviacion,nombreModulo)
            const response = await axios.patch(`http://${direccionIP}/universidad/actualizar_informacion_modulo`, {
                abreviacionUniversidad:location.state.abreviacion,
                nombreModulo: location.state.nombreModulo,
                nuevaDescripcionModulo: descripcion
            });
            setCuerpoModal(response.data.mensaje); 
            mostrarModal();
            console.log(response.data)
        }
        catch(error){
            console.log(error)
        }
    }

    const volver = () => {
        //console.log(lastPath)
        navigate(lastPath);
    }

    return (
    <div>
        <div>
            <h1 className='text-center'>Editar Modulo</h1>
        </div>
        <button className='btn btn-primary' onClick={volver}>Volver atrás</button>
        <div className='w-100 d-flex justify-content-center '>
            <div className='w-100' style={{maxWidth:"600px"}}>
                <div className='p-4'>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Nombre Módulo</Form.Label>
                            <Form.Control type="text" placeholder={location.state.nombreModulo} value={location.state.nombreModulo} disabled/>
                            {/* <Form.Text className="text-muted">
                                Ingrese nombre universidad
                            </Form.Text> */}
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
                            {/* <Form.Text className="text-muted">
                                Ingrese abreviación
                            </Form.Text> */}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Guardar cambios
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
        {showModal && <VentanaModal cuerpo={cuerpoModal} showModal={showModal} handleClose={handleClose} />}
        
    </div>
    
  )
}

export default EditarModulo
