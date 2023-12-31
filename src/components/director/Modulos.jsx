import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import VentanaModal from "../general/VentanaModal";
import Pagination from "react-bootstrap/Pagination";
import { useAuth } from "../../context/AuthContext"

export const Modulos = () => {
  const [modulos, setModulos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const mostrarModal = () => setShowModal(true);
  const [cuerpoModal, setCuerpoModal] = useState("");
  const {authUser,updateAuth,lastPath,setLastPath,direccionIP} = useAuth()
  const location = useLocation()

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Cantidad de elementos por página
  const indexOfLastModulo = currentPage * itemsPerPage;
  const indexOfFirstModulo = indexOfLastModulo - itemsPerPage;
  const currentModulos = modulos.slice(indexOfFirstModulo, indexOfLastModulo);

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };
  
  const getModulosUniversidad = async () => {
    const response = await axios.get(`http://${direccionIP}/modulo/busqueda_por_universidad?abreviacion=${authUser.universidad.abreviacion}`);
    setModulos(response.data.filas); // Actualiza el estado con los datos obtenidos
  };

  useEffect(() => {
    getModulosUniversidad();
  }, []);

  const deshabilitarMódulo = async (abreviacion,modulo,estado) => {
    //Deshabilitar Módulo a la base de datos.
    try {
      const datos = {
        nombre:modulo,
        estado:"false"
      }
      const response = await axios.patch(
        `http://${direccionIP}/modulo/cambiar_estado`,
        datos
      );
      //console.log(response.data);
      setCuerpoModal("Se ha deshabilitado correctamente el Módulo");
      mostrarModal();
      await getModulosUniversidad();
    } catch (error) {
      console.log(error);
    }
  };

  const habilitarMódulo = async (abreviacion,modulo,estado) => {
    //Habilitar Módulo a la base de datos.
    try {
      const datos = {
        nombre:modulo,
        estado:"true"
      }
      const response = await axios.patch(
        `http://${direccionIP}/modulo/cambiar_estado`,
        datos
      );
      //console.log(response.data);
      setCuerpoModal("Se ha habilitado correctamente el modulo");
      mostrarModal();
      await getModulosUniversidad();
    } catch (error) {
      console.log(error);
    }
  };

  
  const navigate = useNavigate();

  const irAgregarModulo = () => {
    // navigate('/administrador/universidades/agregar',{ state: { nombre, apellido } }) //este es un ejemplo si es que se quiere pasar parametros
    setLastPath(location.pathname)
    navigate("/director/modulos/agregar",{state:{abreviacion:authUser.universidad.abreviacion}});
  };

  const verInstancias = (abreviacion,modulo) => {
    //console.log("Aqui hay que enviar los datos para obtener las instancias")
    navigate("/director/modulos/instancia",{state:{abreviacion:abreviacion,nombreModulo:modulo}})
  }

  const irEditarModulo = (abreviacion,modulo) => {
    setLastPath(location.pathname)
    navigate("/director/modulos/editar", {
      state: { abreviacion: abreviacion, nombreModulo:modulo},
    });
  };


  return (
    <div>
      <div className="pt-2 pb-3">
        <h1 className="text-center">Gestion de Módulos</h1>
      </div>
      <div>
        <div>
          <div className="bg-white w-100 justify-content-end d-flex p-3">
            <button
              className="btn btn-primary border-0 rounded-2 p-1 d-flex text-white"
              onClick={irAgregarModulo}
            >
              <div className="p-1">
                <i className="bi bi-plus-circle"></i>
              </div>
              <div className="p-1">Agregar Módulo</div>
            </button>
          </div>
        </div>
        <div>
          <Table responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Habilitado</th>
                <th>Editar</th>
                <th>Habilitar/deshabilitar</th>
                <th>Ver Instancias</th>
              </tr>
            </thead>
            <tbody>
              {currentModulos.map((modulo, index) => (
                  <tr key={index} className="m-1 mt-2 align-align-items-center">
                    <td>{modulo.nombre}</td>
                    <td>{modulo.descripcion}</td>
                    <td>{modulo.estado ? "Si" : "No"}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          irEditarModulo(authUser.universidad.abreviacion,modulo.nombre)
                        }
                        title="Editar Universidad"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    </td>
                
                    <td className="justify-content-center">
                      <div className="d-flex justify-content-center">
                        {modulo.estado ? (
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              deshabilitarMódulo(authUser.universidad.abreviacion,modulo.nombre,modulo.estado)
                            }
                            title="Deshabilitar Módulo"
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              habilitarMódulo(authUser.universidad.abreviacion,modulo.nombre,modulo.estado)
                            }
                            title="Habilitar Módulo"
                          >
                            <i className="bi bi-check"></i>
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="justify-content-center">
                      <button className="btn btn-success" onClick={() => verInstancias(authUser.universidad.abreviacion,modulo.nombre)}>
                        <i className="bi bi-box-arrow-in-right"></i>
                      </button>
                    </td>
                  </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {Array.from({
              length: Math.ceil(modulos.length / itemsPerPage),
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
          cuerpo={cuerpoModal}
          showModal={showModal}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}
