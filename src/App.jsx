import React, { useState,useEffect} from 'react';
import { BrowserRouter as Router,useNavigate,Navigate, Route, Routes, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css'
import './Sidebar.css'
// GENERAL
import Layout from './components/general/Layout';
import VerPerfil from './components/general/VerPerfil';

//LOGIN
import Login from './components/login/Login';
import Filtrador from './components/login/Filtrador';


import PrivateRoute from './routes/PrivateRoute';
import { ProtectRoles } from './routes/PrivateRoute';

// ADMINISTRADOR
import AdministradorDashboard from './components/administrador/AdministradorDashboard'
import BienvenidaAdministrador from './components/administrador/BienvenidaAdministrador';
import Universidades from './components/administrador/Universidades';
import Usuarios from './components/administrador/Usuarios';
import Modulos from './components/administrador/Modulos';
import AgregarUniversidad from './components/administrador/AgregarUniversidad';
import EditarUniversidad from './components/administrador/EditarUniversidad';
import AgregarUsuario from './components/administrador/AgregarUsuario';
import AgregarUsuarios from './components/administrador/AgregarUsuarios';
import EditarUsuario from './components/administrador/EditarUsuario';

// Jefe de Carrera
import JefeCarreraDashboard from './components/director/JefeCarreraDashboard';
import BienvenidaDirector from './components/director/BienvenidaDirector';
import {Modulos as ModulosDirector} from './components/director/Modulos';
import EditarModulo from './components/director/EditarModulo';
import InstanciaModulo from './components/director/InstanciaModulo';
import AgregarModulo from './components/director/AgregarModulo';

// Academico
import AcademicoDashboard from './components/academico/AcademicoDashboard'
import BienvenidoAcademico from './components/academico/BienvenidaAcademico'
// Estudiante
import EstudianteDashboard from './components/estudiante/EstudianteDashboard';
import BienvenidaEstudiante from './components/estudiante/BienvenidaEstudiante';


function App() {
  const {authUser,updateAuth} = useAuth()

  let pathRol="";
  if(authUser){
    if (authUser?.rol_plataforma === 'Administrador') {
      pathRol+="administrador/bienvenida";
    }
    else{
      if (authUser.rol.nombre == 'Estudiante'){
        pathRol+="estudiante/bienvenida"
      }
      else if (authUser.rol.nombre == 'Profesor'){
        pathRol+="profesor/bienvenida"
      }
      else if (authUser.rol.nombre == 'Jefe de Carrera'){
        pathRol+="director/bienvenida"
      }
    }
  }
  

  useEffect(()=>{
		if(authUser){
      if (authUser?.rol_plataforma === 'Administrador') {
        pathRol+="administrador/bienvenida";
      }
      else{
        if (authUser.rol.nombre == 'Estudiante'){
          pathRol+="estudiante/bienvenida"
        }
        else if (authUser.rol.nombre == 'Profesor'){
          pathRol+="profesor/bienvenida"
        }
        else if (authUser.rol.nombre == 'Jefe de Carrera'){
          pathRol+="director/bienvenida"
        }
      }
    }
	},[])

  //console.log("app auth:",authUser)
  return (
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/filtrador' element={<Filtrador />} /> 
        <Route path='' element={<PrivateRoute />}>
          <Route element={<Layout/>}>
            <Route index element={<Navigate to={pathRol} />} />
            <Route element={<ProtectRoles roles="Estudiante" />}>
              <Route path='/estudiante' element = {<EstudianteDashboard />}>
                <Route index element={<Navigate to="bienvenida" />} />
                <Route path='bienvenida' element= {<BienvenidaEstudiante />}/>

                <Route path='perfil' element = {<VerPerfil />} />
              </Route>
            </Route>

            <Route element={<ProtectRoles roles="Profesor" />}>
              <Route path='/profesor' element = {<AcademicoDashboard />}>
                <Route index element={<Navigate to="bienvenida" />} />
                <Route path='bienvenida' element= {<BienvenidoAcademico />}/>

                <Route path='perfil' element = {<VerPerfil />} />
              </Route> 
            </Route>

            <Route element={<ProtectRoles roles="Jefe de Carrera" />}>
              <Route path='/director' element = {<JefeCarreraDashboard />}>
                <Route index element={<Navigate to="bienvenida" />} />
                <Route path='bienvenida' element= {<BienvenidaDirector />}/>
                <Route path='modulos' element = {<ModulosDirector />} />
                <Route path='modulos/editar' element = {<EditarModulo />} />
                <Route path='modulos/agregar' element = {<AgregarModulo />} />
                <Route path='instancias' element = {<InstanciaModulo />} />
                <Route path='perfil' element = {<VerPerfil />} />
              </Route> 
            </Route>

            <Route path='/administrador' element={<ProtectRoles roles="Administrador" />}> 
              <Route path='/administrador' element = {<AdministradorDashboard />}>
                <Route index element={<Navigate to="bienvenida" />} />
                <Route path='bienvenida' element= {<BienvenidaAdministrador />}/>
                
                <Route path='universidades' element= {<Universidades />} />
                <Route path='universidades/agregar' element={<AgregarUniversidad />} />
                <Route path='universidades/editar' element={<EditarUniversidad />} />

                <Route path='modulos' element= {<Modulos />}/>
                
                <Route path='usuarios' element= {<Usuarios />}/>
                <Route path='usuarios/agregar' element= {<AgregarUsuario />}/>
                <Route path='usuarios/agregar-excel' element={<AgregarUsuarios />} />
                <Route path='usuarios/editar' element= {<EditarUsuario />}/>

                <Route path='perfil' element = {<VerPerfil />} />
              </Route>
            </Route>

          </Route>
        </Route>
      </Routes>
  )
}

export default App

{/* <Route element={<PrivateRoute />}>
             <Route path='/estudiante' element = {<EstudianteDashboard />} /> 
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/profesor' element = {<ProfesorDashboard />} /> 
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/administrador' element = {<AdministradorDashboard />}>
              
              <Route index element={<Navigate to="bienvenida" />} />
              <Route path='bienvenida' element= {<BienvenidaDashboard />}/>
             
              <Route path='universidades' element= {<Universidades />} />
              <Route path='universidades/agregar' element={<AgregarUniversidad />} />

              <Route path='modulos' element= {<Modulos />}/>
              <Route path='usuarios' element= {<Usuarios />}/>
              <Route path='usuarios/agregar' element= {<AgregarUsuario />}/>

            </Route>
          </Route> */}
