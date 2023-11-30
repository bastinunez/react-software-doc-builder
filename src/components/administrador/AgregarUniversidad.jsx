import React,{useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import VentanaModal from '../general/VentanaModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AgregarUniversidad = () => {
    const {showSidebar,setShowSidebar, authUser,lastPath,setLastPath,direccionIP} = useAuth()
    const [nombreUniversidad,setNombreUniversidad] = useState()
    const [abreviacion,setAbreviacion] = useState()
    
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
        //Agregar universidad a la base de datos.
        try{
            const response = await axios.post(`http://${direccionIP}/universidad`, {
                nombre: nombreUniversidad,
                abreviacion
            });
            if(!response.data.exito){
                setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
                setCuerpoModal('Ya existe esa universidad'); 
                mostrarModal(); 
                return;
            }
            setTituloModal('<span class="bi bi-check-circle text-success mx-2"></span>Éxito');
            setCuerpoModal(response.data.mensaje); 
            mostrarModal();
            console.log(response.data)
        }
        catch(error){
            console.log(error)
        }
    }
    const navigate = useNavigate();
    const volver = () => {
        navigate('/administrador/universidades');
    }

    return (
    <div>
        <div>
            <h1 className='text-center'>Agregar Universidad</h1>
        </div>
        <button className='btn btn-primary' onClick={volver}>Volver atrás</button>
        <div className='w-100 d-flex justify-content-center '>
            <div className='w-100' style={{maxWidth:"600px"}}>
                <div className='p-4'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese nombre universidad" onChange={(e) => setNombreUniversidad(e.target.value)} required/>
                            {/* <Form.Text className="text-muted">
                                Ingrese nombre universidad
                            </Form.Text> */}
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Abreviación</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese abreviación"  onChange={(e) => setAbreviacion(e.target.value)} required/>
                            {/* <Form.Text className="text-muted">
                                Ingrese abreviación
                            </Form.Text> */}
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

export default AgregarUniversidad
