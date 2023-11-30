import React,{useEffect, useState} from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../../context/AuthContext';

function Filtrador() {
    const location = useLocation();
    const {updateAuth} = useAuth();
    const [rolUniversidad,setRolUniversidad] = useState()
    const [datosRol,setDatosRol] = useState()
    const [rolPorUniversidad,setRolPorUniversidad] = useState([])
    const logo_utalca="/logo-utalca.jpg"
    const logo_uc="/logo-uc.jpg"
    const logo_uch="/logo-uch.jpg"
    const logo_usm="/logo-usm.jpg"
    const logo_ucm="/ucm-logo.png"
    const navigate = useNavigate();
  
    // Acceder a la variable datos aquí

    function handleRol(item){
        console.log(datosRol)
        const datos_usuario ={
            usuario: {
                rut:datosRol.rut,
                nombres:datosRol.nombres,
                apellidos:datosRol.apellidos,
                email:datosRol.email,
                rol_plataforma:datosRol.rol_plataforma
            },
            rol:{
                id:item.rol.id,
                nombre:item.rol.nombre,
                universidad:item.rol.usuarioUniversidadRoles
            },
            universidad:{
                abreviacion: item.universidad.abreviacion,
                nombre:item.universidad.nombre,
                estado:item.universidad.estado
            }
        }

        localStorage.setItem("auth", JSON.stringify(datos_usuario));
        //console.log(datos_usuario)
        localStorage.setItem("logged", true);
        updateAuth(datos_usuario);
        //console.log("pasa aki primero")
        if (item.rol.nombre == 'Estudiante'){
            navigate("/estudiante",{replace:true})
        }
        else if (item.rol.nombre == 'Profesor'){
            navigate("/profesor",{replace:true})
        }
        else if (item.rol.nombre == 'Jefe de Carrera'){
            navigate("/director",{replace:true})
        }
        else if (item.rol.nombre == 'Administrador'){
            navigate("/administrador",{replace:true})
        }
    }

    useEffect( () => {
        //console.log("roles:",location.state.respuesta.usuarioUniversidadRoles)
        //setDatosUsuarioRol(location.state.datos.usuarioUniversidadRoles.usuario);

        //aqui tengo los roles que tiene un usuario en cada institucion
        setRolPorUniversidad(location.state.respuesta.usuarioUniversidadRoles)
        setDatosRol(location.state.respuesta)
    },[])
  
    return (
      <div>
        <div className='mt-5'>
            <div className='pt-2 pb-5'>
                <h1 className='text-center'>¿Cómo desea iniciar sesión?</h1>
            </div>
        </div>
        <div>
            <Row xs={1} md={3} className="g-4 m-5 justify-content-center">
                {rolPorUniversidad.map( (item) => (
                    <Card style={{ width: '20rem',backgroundColor:"#0d6efd"}} className='border-0 me-5 justify-content-center align-items-center card-hover' key={item.id}>
                        <button onClick={() => handleRol(item)} className='bg-transparent border-0'>
                            <div className='p-2'>
                                <Card.Img variant="top" 
                                src={
                                    item.universidad.abreviacion == "UTALCA"?
                                        logo_utalca: item.universidad.abreviacion == "UC"?
                                            logo_uc : item.universidad.abreviacion == "UCH"?
                                                logo_uch : item.universidad.abreviacion == "USM"?
                                                    logo_usm : logo_ucm
                                } />
                            </div>
                            <div>
                                <Card.Body className='bg-transparent text-white'>
                                    <div>
                                        <h2>{item.universidad.nombre}</h2>
                                        <h5>{item.rol.nombre}</h5>
                                    </div>
                                </Card.Body>
                            </div>
                            
                        </button>
                    </Card>
                )) }
            </Row>            
        </div>
        
        
      </div>
    )
}

export default Filtrador
