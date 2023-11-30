import React,{useState,useEffect} from 'react'
import { Navigate, useLocation, Outlet,Route } from 'react-router-dom';
import {useAuth} from '../context/AuthContext'
import Layout from '../components/general/Layout';
import { NavBarExport } from '../components/general/Navbar';

export const PrivateRoute = () => {
	const {authUser, updateAuth,setLastPath,lastPath} = useAuth()
	//console.log("Pasa por private")
	//console.log(lastPath)
	return (
		authUser?
			<>
				<NavBarExport/>
				<Layout />
			</>
			:
			<Navigate to='/login' />);
};
export default PrivateRoute


export const ProtectRoles = ({roles}) => {
	const { authUser, updateAuth } = useAuth();
	const [isAdmin, setNotAdmin] = useState(true);
	let pathRol = "/";

	useEffect(() => {
		if (authUser?.rol_plataforma === 'Administrador') {
		  pathRol += "administrador";
		  //console.log("Entro a administrador");
		} else {
			// Comprueba el valor de 'rol.nombre' si 'rol_plataforma' no es 'Administrador'
			if (authUser?.rol?.nombre === 'Estudiante') {
				pathRol += "estudiante";
				} else if (authUser?.rol?.nombre === 'Profesor') {
				pathRol += "profesor";
				} else if (authUser?.rol?.nombre === 'Jefe de Carrera') {
				pathRol += "director";
			}
		}
	}, []); // Se ejecutará despues de renderizar

	return (
		authUser?.rol_plataforma === 'Administrador' ?
			<Outlet />
			:
			authUser?.rol?.nombre === roles? 
				<Outlet />
				: <Navigate to={pathRol} />
	);
}

