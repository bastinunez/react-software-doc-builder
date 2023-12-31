import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext'
import axios from 'axios';

export const NavBarExport = () => {
	const {filtrador,setFiltrador,setShowSidebar,authUser, updateAuth,direccionIP} = useAuth()
	const [show, setShow] = useState(false);

	const handleClose = () => setShowSidebar(false);
	const handleShow = () => setShowSidebar(true);
	
	const navigate = useNavigate();

	var pathRol="/"
	const onLogout = () => {
		updateAuth('')
		setFiltrador(null)
		localStorage.setItem("auth", null);
		localStorage.setItem("logged", false);
		localStorage.setItem("filtrador",null)
		navigate('/login', {
		});
	};
	const backFiltrador = async (e) => {
		try {
			//console.log("rut:",authUser.usuario.rut)
			const resp_roles = await axios.get(`http://${direccionIP}/usuario_roluniversidad_universidad/findByUsuario?rut=${authUser.usuario.rut}`);
			const datos_pre_filtro={
				"rut":authUser.usuario.rut,
				"nombres":authUser.usuario.nombres,
				"apellidos":authUser.usuario.apellidos,
				"email":authUser.usuario.email,
				"rol_plataforma":authUser.usuario.rol_plataforma
			}
			//console.log(resp_roles.data)
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
		//console.log("filtrador:",filtrador)
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
				<Navbar className='colorPrimario p-0'>
					<Container className='w-100 mt-1 mb-1 ps-lg-4 pe-lg-4' style={{maxWidth:"none"}}>
						{
							authUser ? 
							<Button  variant="primary" className="me-lg-3 me-1" onClick={handleShow}>
								<i className="bi bi-list" ></i>
								Menu
							</Button>
							:
							<></>
						}
						
						<Navbar.Brand href={pathRol} className="ms-lg-2 ms-1 p-0">
							<Image src="/logo.png" className='imagen-logo' />
						</Navbar.Brand>
						<Navbar.Toggle></Navbar.Toggle>
						<Navbar.Collapse className="justify-content-end">
							<div>
								{authUser ? (
									<div className='container d-flex w-100'>
										{
											filtrador!==null? 
												<div className='align-items-center d-flex me-lg-2 me-1'>
													<Button className='boton-navbar d-flex align-items-center' onClick={backFiltrador}>
														<i className="bi bi-arrow-left-circle-fill me-lg-1"></i>
														<p className='texto-volver-filtrador align-items-center p-0 m-0'>Volver a Filtrador</p>
													</Button>{' '}
												</div>
												:
												<></>
										}
										<div className='ms-lg-3 me-lg-3 me-1 align-items-center d-flex'>
											<Navbar.Text>
												<span className='username me-lg-4 me-1'>
													<i className="bi bi-person-square  me-2"></i>
													{ authUser?.rol_plataforma == 'Administrador'  ? `${authUser.nombres} `
													: `${authUser.usuario.nombres}`}
												</span>
											</Navbar.Text>
											{
												authUser?.rol_plataforma != 'Administrador'?
													<Navbar.Text className=''>
														<span className='username'><i className="bi bi-mortarboard-fill  me-2 me-xs-1"></i> {authUser.universidad.abreviacion} </span>
													</Navbar.Text>
												:
												<></>
											}
										</div>
										<div className='ms-lg-3 me-lg-3 justify-content-end d-flex'>
											<Button className='boton-navbar d-flex align-items-center' onClick={onLogout}>
												<i className="bi bi-box-arrow-left me-lg-1"></i>
												<p className='texto-volver-filtrador  align-items-center p-0 m-0'>
													Cerrar sesión
												</p>
												
											</Button>
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