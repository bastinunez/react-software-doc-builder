import React,{useState,useEffect} from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const Prueba = () => {
    const {updateAuth,direccionIP} = useAuth();

    const prueba = async (e) =>{
        const resp_roles = await axios.get(`http://${direccionIP}/usuario_roluniversidad_universidad/findByUsuario/`,{
            rut:"00.000.000-0"
        });
        console.log(resp_roles.data)
    }
    const otra = async (e) =>{
        const resp_roles = await axios.get(`http://${direccionIP}/instanciamodulo/find`,{
            nombre: "Requisitos de Software",
            ano: 2023,
            semestre: 2,
            seccion: "a"
         });
        console.log(resp_roles.data)
    }

    useEffect(() => {
        //prueba()
        otra()
    },[])

    return (
        <div>
            hola
        </div>
    )
}

export default Prueba
