import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext'


export const NavBarExport = () => {
	const {showSidebar,setShowSidebar,authUser, updateAuth} = useAuth()
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
					<Container className='w-100' style={{maxWidth:"none"}}>
						{
							authUser ? 
							<Button variant="primary me-5" className="" onClick={handleShow}>
								<i className="bi bi-list" ></i>
								Menu
							</Button>
							:
							<></>
						}
						
						<Navbar.Brand href={pathRol}>LOGO</Navbar.Brand>
						<Navbar.Toggle></Navbar.Toggle>
						<Navbar.Collapse className="justify-content-end">
							<div>
								{authUser ? (
									<div className='user d-flex'>
										<div className='ms-3 me-3 align-items-center d-flex'>
											<Navbar.Text>
												<span className='username'>Usuario: { authUser?.rol_plataforma == 'Administrador'  ? 
												`${authUser.nombres} ${authUser.apellidos}` : `${authUser.usuario.nombres} ${authUser.usuario.apellidos}`}</span>
											</Navbar.Text>
											{
												authUser?.rol_plataforma != 'Administrador'?
												<Navbar.Text className='ms-5'>
													<span className='username'>Universidad: {authUser.universidad.abreviacion} </span>
												</Navbar.Text>
												:
												<></>
											}
											
										</div>
										<div className='ms-3 me-3'>
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