import React,{useState,useEffect} from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';


const Login = ({authUser}) => {
    const {updateAuth,direccionIP} = useAuth();

    const [rutUsuario,setRutUsuario] = useState('');
    const [contrasenaUsuario,setContrasenaUsuario] = useState('');
    const [mensaje, setMensaje] = useState('');

    const from = location.state?.from?.pathname || "/";

    useEffect(() =>{
        //console.log("de login:",authUser)
    },[])
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const response = await axios.post(`http://${direccionIP}/usuario/login`,{
                    rut:rutUsuario,
                    contrasena:contrasenaUsuario
            });
            console.log(response.data)
            // Verifica si la respuesta es exito
            if (response.data.datos != "null") {

                if (response.data.datos.rol_plataforma == "Administrador"){
                    localStorage.setItem("auth", JSON.stringify(response.data.datos));
                    localStorage.setItem("logged", true);
                    updateAuth(response.data.datos);
                    navigate("/administrador",{replace:true})
                }else{
                    console.log("rut:",rutUsuario)
                    const resp_roles = await axios.get(`http://${direccionIP}/usuario_roluniversidad_universidad/findByUsuario`,{
                        params:{
                            rut:rutUsuario
                        }
                    });
                    console.log(resp_roles.data.datos)
                    // setRutUsuario('')
                    // setContrasenaUsuario('')

                    if (resp_roles.data.datos.length <= 1){
                        const credenciales_usuario = {
                            usuario: {
                                "rut":response.data.datos.rut,
                                "nombres":response.data.datos.nombres,
                                "apellidos":response.data.datos.apellidos,
                                "email":response.data.datos.email,
                                "rol_plataforma":response.data.datos.rol_plataforma
                            },
                            rol:{
                                "nombre": resp_roles.datos[0].fila.nombreRolUniversidad
                            },
                            universidad:{
                                "abreviacion": resp_roles.datos[0].fila.abreviacion
                            }
                        }
                        localStorage.setItem("auth", JSON.stringify(credenciales_usuario));
                        localStorage.setItem("logged", true);
                        updateAuth(credenciales_usuario);
                        if (credenciales_usuario.rol.nombre == 'Estudiante'){
                            navigate("/estudiante",{replace:true})
                        }
                        else if (credenciales_usuario.rol.nombre == 'Profesor'){
                            navigate("/profesor",{replace:true})
                        }
                        else if (credenciales_usuario.rol.nombre == 'Jefe de Carrera'){
                            navigate("/director",{replace:true})
                        }
                    }else{
                        const datos_pre_filtro={
                                "rut":response.data.datos.rut,
                                "nombres":response.data.datos.nombres,
                                "apellidos":response.data.datos.apellidos,
                                "email":response.data.datos.email,
                                "rol_plataforma":response.data.datos.rol_plataforma
                        }
                        navigate("/filtrador",{state:{datos_usuario:datos_pre_filtro,respuesta:resp_roles.data.datos},replace:true})
                    }   
                }
            }
            else{
                setMensaje('Credenciales incorrectas');
            }
        }
        catch(error){
            setMensaje('Error al iniciar sesión.');
            console.error('Error al iniciar sesión:', error);
        }
    }


    return (
        <>
            <div className='d-flex vh-100 vw-100 fondo'>
                <div className='vw-100 container-login justify-content-center align-items-center p-2'>
                    <div className='wrapper p-3 row'>
                        <div className='row ms-5 me-5'>
                            <div>
                                <h2>Iniciar Sesion</h2>
                            </div>
                            <div>
                                <form className='form-login' onSubmit={handleSubmit}>
                                    <div className='input-group'>
                                        <label className='label-login form-label'>Rut:</label>
                                        <input className="form-control w-100" type="text" value={rutUsuario} onChange={ (e) => setRutUsuario(e.target.value)} required />
                                    </div>
                                    <div className='input-group'>
                                        <label className='label-login form-label'>Contraseña:</label>
                                        <input className="form-control w-100" type="password" value={contrasenaUsuario} onChange={ (e) => setContrasenaUsuario(e.target.value)} required  />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Entrar</button>
                                </form>
                            </div>
                            {mensaje == 'Credenciales incorrectas' ? <div className='ps-2 pe-2'> <div className='pe-2 ps-2 bg-danger text-white'> <p>{mensaje}</p> </div> </div> :<></>}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Login
