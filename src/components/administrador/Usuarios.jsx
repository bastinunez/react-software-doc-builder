import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import VentanaModal from "../general/VentanaModal";
import { useAuth } from '../../context/AuthContext';

const Usuarios = () => {
  const {showSidebar,setShowSidebar, authUser,direccionIP} = useAuth()
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const mostrarModal = () => setShowModal(true);
  const [tituloModal, setTituloModal] = useState("");
  const [cuerpoModal, setCuerpoModal] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Cantidad de elementos por página

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

  const getUsuarios = async () => {
    const response = await axios.get(
      `http://${direccionIP}/usuario/filtro/todos`
    );
    setUsuarios(response.data.usuarios); // Actualiza el estado con los datos obtenidos
    console.log(response.data.usuarios);
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const habilitarUsuario = async (rut) => {
    //Agregar universidad a la base de datos.
    try {
      const response = await axios.patch(
        `http://${direccionIP}/usuario/habilitar/${rut}`
      );
      console.log(response.data);
      setTituloModal('<span class="bi bi-check-circle text-success mx-2"></span>Usuario habilitado');
      setCuerpoModal("Se ha habilitado correctamente el usuario");
      mostrarModal();
      await getUsuarios();
    } catch (error) {
      console.log(error);
    }
  };

  const deshabilitarUsuario = async (rut) => {
    //Agregar universidad a la base de datos.
    if (rut === "00.000.000-0") {
      setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
      setCuerpoModal("No se puede deshabilitar al usuario administrador");
      mostrarModal();
      return;
    }
    try {
      const response = await axios.patch(
        `http://${direccionIP}/usuario/deshabilitar/${rut}`
      );
      console.log(response.data);
      setTituloModal('<span class="bi bi-check-circle text-success mx-2"></span>Usuario deshabilitado');
      setCuerpoModal("Se ha deshabilitado correctamente el usuario");
      mostrarModal();
      await getUsuarios();
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const irAgregarUsuario = () => {
    // navigate('/administrador/universidades/agregar',{ state: { nombre, apellido } }) //este es un ejemplo si es que se quiere pasar parametros
    navigate("/administrador/usuarios/agregar");
  };

  const irAgregarUsuarios = () => {
    // navigate('/administrador/universidades/agregar',{ state: { nombre, apellido } }) //este es un ejemplo si es que se quiere pasar parametros
    navigate("/administrador/usuarios/agregarExcel");
  };

  const irEditarUsuario = (rut, nombres, apellidos, correo,contrasena,index,usuario) => {
    if (rut === "00.000.000-0") {
      setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
      setCuerpoModal("No se puede editar al usuario administrador");
      mostrarModal();
      return;
    }
    const roles = usuarios[index].usuarioUniversidadRoles
    navigate("/administrador/usuarios/editar", {
      state: { rut, nombres, apellidos, contrasena, correo,roles},
    });
  };



  //<input type='checkbox' checked={universidad.estado} />

  return (
    <div>
      <div className="pt-2 pb-5">
        <h1 className="text-center">Gestion de Usuarios</h1>
      </div>
      <div>
        <div>
          <div className="bg-white w-100 justify-content-end d-flex p-3">
            <button className="btn btn-primary border-0 rounded-2 p-1 d-flex text-white mx-2" onClick={irAgregarUsuarios} >
              <div className="p-1">
                <i className="bi bi-plus-circle"></i>
              </div>
              <div className="p-1">Agregar usuarios</div>
            </button>
            <button className="btn btn-primary border-0 rounded-2 p-1 d-flex text-white" onClick={irAgregarUsuario} >
              <div className="p-1">
                <i className="bi bi-plus-circle"></i>
              </div>
              <div className="p-1">Agregar usuario</div>
            </button>
          </div>
        </div>
        <div>
          <Table responsive>
            <thead>
              <tr>
                <th>RUT</th>
                <th>Nombre Completo</th>
                <th>Universidad</th>
                <th>Editar</th>
                <th className="d-flex justify-content-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((usuario, index) => (
                <tr key={index} className="m-1 mt-2 align-align-items-center">
                  <td>{usuario.rut}</td>
                  <td>
                    {usuario.nombres} {usuario.apellidos}
                  </td>
                  <td>{usuario.usuarioUniversidadRoles[0]?.universidad?.abreviacion ? usuario.usuarioUniversidadRoles[0]?.universidad?.abreviacion : usuario.usuarioUniversidadRoles[0]?.universidad}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        irEditarUsuario( usuario.rut, usuario.nombres, usuario.apellidos, usuario.email, usuario.contrasena, index,usuario)
                      }
                      title="Editar Usuario"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td>
                  <td className="d-flex justify-content-center">
                    {usuario.estado ? (
                      <button className="btn btn-danger" style={{width:'110px'}} onClick={() => deshabilitarUsuario(usuario.rut)} title="Deshabilitar Usuario" >
                        Deshabilitar
                      </button>
                    ) : (
                      <button className="btn btn-success" style={{width:'110px'}} onClick={() => habilitarUsuario(usuario.rut) } title="Habilitar Usuario" >
                        Habilitar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {Array.from({
              length: Math.ceil(usuarios.length / itemsPerPage),
            }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePaginationClick(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
      {showModal && (
        <VentanaModal
          titulo={tituloModal}
          cuerpo={cuerpoModal}
          showModal={showModal}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default Usuarios;
