import React, { useEffect,useState} from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useAuth } from '../../context/AuthContext';

const ProyectoAcademico = () => {
    const location = useLocation();
    const {showSidebar,setShowSidebar, authUser,direccionIP} = useAuth()
    const [secciones,setSecciones] = useState([])
    const [seccionElegida,setSeccionElegida] = useState()
    const nombre_modulo = location.state.proyecto.proyectoPK.instanciaModulo.instanciaModuloPK.modulo.nombre
    const year= location.state.proyecto.proyectoPK.instanciaModulo.instanciaModuloPK.ano
    const semestre = location.state.proyecto.proyectoPK.instanciaModulo.instanciaModuloPK.semestre
    const seccion = location.state.proyecto.proyectoPK.instanciaModulo.instanciaModuloPK.seccion

    const getSecciones = async () => {
        const response = await axios.get(`http://${direccionIP}/instanciamodulo_seccion/findByInstanciaModulo?nombre_modulo=${nombre_modulo}&ano=${year}&semestre=${semestre}&seccion=${seccion}`);
        if (response.data.filas){
            setSecciones(response.data.filas)
        }
    }

    const titulo = `Titulo 1`
    const parrafo = `Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.`
    useEffect( () => {
        getSecciones()
    },[])

    const volver = () => {
        navigate('/profesor/modulos/proyectos');
    }
    
    return (
        <div className='container'>
            <div className="pt-2 pb-5">
                <h1 className="text-center">Proyecto: {location.state.proyecto.proyectoPK.nombre}</h1>
            </div>
            <button className='btn btn-primary' onClick={volver}>Volver atrás</button>
            <div className='mt-2'>
                <Form.Select aria-label="Default select example" onChange={(e) => setSeccionElegida(e.target.value)}>
                    <option>Seleccione seccion</option>
                    {
                        secciones.map( (seccion,index) => (
                            <option key={index} value={seccion.seccion.nombre}>{seccion.seccion.nombre}</option>
                        ) )
                    }
                </Form.Select>
            </div>
            <div className='mt-4 content-box-seccion'>
                <h3 className='text-center mb-3'>{titulo}</h3>
                <p>{parrafo}</p>
            </div>
            
        </div>
    )
}

export default ProyectoAcademico
