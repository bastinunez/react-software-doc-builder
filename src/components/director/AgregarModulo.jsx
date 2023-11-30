import React,{useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import VentanaModal from '../general/VentanaModal';

const AgregarModulo = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion,setDescripcion] = useState("");
    const location = useLocation();
    const {showSidebar,setShowSidebar, authUser,setLastPath,lastPath,direccionIP} = useAuth()
    const navigate = useNavigate();
    
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
        
        //alert("Password: " + passwordUsuario);

        //Agregar universidad a la base de datos.
        try{
            const response = await axios.post(`http://${direccionIP}/universidad/agregar_modulo_universidad`, {
                abreviacionUniversidad:location.state.abreviacion,
                nombreModulo:nombre,
                descripcionModulo: descripcion,
            });
            setCuerpoModal(response.data.mensaje); 
            mostrarModal();
            setNombre("");
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
            <h1 className='text-center'>Agregar Modulo</h1>
        </div>
        <button className='btn btn-primary' onClick={volver}>Volver atrás</button>
        <div className='w-100 d-flex justify-content-center '>
            <div className='w-100' style={{maxWidth:"600px"}}>
                <div className='p-4'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Nombre Modulo</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese nombre modulo" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                            {/* <Form.Text className="text-muted">
                                Ingrese nombre universidad
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese descripcion" onChange={(e) => setDescripcion(e.target.value)} required />
                            {/* <Form.Text className="text-muted">
                                Ingrese nombre universidad
                            </Form.Text> */}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Agregar
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
        {showModal && <VentanaModal cuerpo={cuerpoModal} showModal={showModal} handleClose={handleClose} />}
        
    </div>
    
  )
}

export default AgregarModulo
