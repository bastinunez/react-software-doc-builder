import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext'
import axios from 'axios';

export const NavBarExport = () => {
	const {filtrador,setShowSidebar,authUser, updateAuth,direccionIP} = useAuth()
	const [show, setShow] = useState(false);

	const handleClose = () => setShowSidebar(false);
	const handleShow = () => setShowSidebar(true);
	
	const navigate = useNavigate();

	var pathRol="/"
	const onLogout = () => {
		updateAuth('')
		localStorage.setItem("auth", null);
		localStorage.setItem("logged", false);
		navigate('/login', {
		});
	};
	const backFiltrador = async (e) => {
		try {
			const resp_roles = await axios.get(`http://${direccionIP}/usuario_roluniversidad_universidad/findByUsuario`,{
                        params:{
                            rut:authUser.rut
                        }
                    });
			const datos_pre_filtro={
				"rut":authUser.rut,
				"nombres":authUser.nombres,
				"apellidos":authUser.apellidos,
				"email":authUser.email,
				"rol_plataforma":authUser.rol_plataforma
			}
			navigate("/filtrador",{state:{datos_usuario:datos_pre_filtro,respuesta:resp_roles.data.filas},replace:true})
		} catch (error) {
			console.log(error)
		}
		
	}
	
	if (authUser){
		//console.log(authUser)
		let pathRol="/"
		if (authUser?.rol_plataforma === 'Administrador') {
			pathRol+="administrador";
		}
		else{
			if (authUser.rol.nombre == 'Estudiante'){
				pathRol+="estudiante"
			}
			else if (authUser.rol.nombre == 'Profesor'){
				pathRol+="profesor"
			}
			else if (authUser.rol.nombre == 'Jefe de Carrera'){
				pathRol+="director"
			}
			else if (authUser.rol.nombre == 'Administrador'){
				pathRol+="administrador"
			}
		}
		
	}
	useEffect(()=>{
		if (authUser?.rol_plataforma === 'Administrador') {
			pathRol+="administrador";
		}
		else{
			if (authUser.rol.nombre == 'Estudiante'){
				pathRol+="estudiante"
			}
			else if (authUser.rol.nombre == 'Profesor'){
				pathRol+="profesor"
			}
			else if (authUser.rol.nombre == 'Jefe de Carrera'){
				pathRol+="director"
			}
			else if (authUser.rol.nombre == 'Administrador'){
				pathRol+="administrador"
			}
		}
	},[])
	
	
	return (
		<>
			<header className='w-100'>
				<Navbar className='colorPrimario'>
					<Container className='w-100 p-0 ps-lg-4 pe-lg-4' style={{maxWidth:"none"}}>
						{
							authUser ? 
							<Button  variant="primary" className="me-lg-3 me-1" onClick={handleShow}>
								<i className="bi bi-list" ></i>
								Menu
							</Button>
							:
							<></>
						}
						
						<Navbar.Brand href={pathRol} className="ms-lg-2 ms-1">LOGO</Navbar.Brand>
						<Navbar.Toggle></Navbar.Toggle>
						<Navbar.Collapse className="justify-content-end">
							<div>
								{authUser ? (
									<div className='container d-flex w-100'>
										{
											filtrador? 
												<div className='ms-lg-3 me-lg-3 justify-content-end d-flex'>
													<Button className='boton-logout' onClick={backFiltrador}>Volver a Filtrador</Button>{' '}
												</div>
												:
												<></>
										}
										<div className='ms-lg-3 me-lg-3 me-2 align-items-center d-flex'>
											<Navbar.Text>
												<span className='username'>
													<i className="bi bi-person-square me-2 me-xs-1"></i>
													{ authUser?.rol_plataforma == 'Administrador'  ? `${authUser.nombres}`
													: `${authUser.usuario.nombres}`}
													</span>
											</Navbar.Text>
											{
												authUser?.rol_plataforma != 'Administrador'?
												<Navbar.Text className='ms-2 ms-lg-5'>
													<span className='username'><i className="bi bi-mortarboard-fill  me-2 me-xs-1"></i> {authUser.universidad.abreviacion} </span>
												</Navbar.Text>
												:
												<></>
											}
											
										</div>
										<div className='ms-lg-3 me-lg-3 justify-content-end d-flex'>
											<Button className='boton-logout' onClick={onLogout}>Cerrar sesión</Button>{' '}
										</div>
									</div>
								) : (
									<></>
								)}
							</div>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
		</>
	);
};