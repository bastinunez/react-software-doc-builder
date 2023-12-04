import {useAuth} from '../../context/AuthContext'

export const getUsuario = async (e) => {
    const {authUser, direccionIP} = useAuth();
    try{
        const response = await axios.get(`http://${direccionIP}/usuario/rut/${authUser.usuario.rut}`);
        // setUsuario(response.data.usuario)
        // setNombre(response.data.usuario.nombres)
        // setApellido(response.data.usuario.apellidos)
        // console.log(response.data.usuario)
        return response.data.usuario
    }
    catch(error){
        console.log(error)
        return "error"
    }
    
}

export const actualizarPerfil = async (e) =>{
    e.preventDefault()
    const {authUser, direccionIP} = useAuth();
    try{
        const response = await axios.patch(`http://${direccionIP}/usuario/actualizar`, {
            rut:usuario.rut,
            nombres: nombre,
            apellidos: apellido,
            contrasena: usuario.contrasena,
            email: usuario.email
        });
        console.log(response.data)
    }
    catch(error){
        console.log(error)
    }
}