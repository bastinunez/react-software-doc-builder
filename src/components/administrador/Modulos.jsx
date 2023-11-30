import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import VentanaModal from "../general/VentanaModal";
import Pagination from "react-bootstrap/Pagination";
import { useAuth } from '../../context/AuthContext';

const Modulos = () => {
  const {showSidebar,setShowSidebar, authUser,direccionIP} = useAuth()
  const [universidades, setUniversidades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const mostrarModal = () => setShowModal(true);
  const [cuerpoModal, setCuerpoModal] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Cantidad de elementos por página
  const indexOfLastUniversidad = currentPage * itemsPerPage;
  const indexOfFirstUniversidad = indexOfLastUniversidad - itemsPerPage;
  const currentUniversidades = universidades.slice(indexOfFirstUniversidad, indexOfLastUniversidad);

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

  const getUniversidades = async () => {
    const response = await axios.get(
      `http://${direccionIP}/universidad/filtro/todas`
    );
    setUniversidades(response.data.universidades); // Actualiza el estado con los datos obtenidos
  };

  useEffect(() => {
    getUniversidades();
  }, []);

  const deshabilitarMódulo = async (abreviacion) => {
    //Deshabilitar Módulo a la base de datos.
    try {
      const response = await axios.patch(
        `http://${direccionIP}/Módulo/deshabilitar/${abreviacion}`
      );
      //console.log(response.data);
      setCuerpoModal("Se ha deshabilitado correctamente la Módulo");
      mostrarModal();
      await getMóduloes();
    } catch (error) {
      //console.log(error);
    }
  };

  const habilitarMódulo = async (abreviacion) => {
    //Habilitar Módulo a la base de datos.
    try {
      const response = await axios.patch(
        `http://${direccionIP}/universidad/habilitar/${abreviacion}`
      );
      //console.log(response.data);
      setCuerpoModal("Se ha habilitado correctamente la universidad");
      mostrarModal();
      await getUniversidades();
    } catch (error) {
      //console.log(error);
    }
  };

  const navigate = useNavigate();


  return (
    <div>
      <div className="pt-2 pb-5">
        <h1 className="text-center">Gestion de Módulos</h1>
      </div>
      <div>
        {/* <div>
          <div className="bg-white w-100 justify-content-end d-flex p-3">
            <button
              className="btn btn-primary border-0 rounded-2 p-1 d-flex text-white"
              onClick={irAgregarUniversidad}
            >
              <div className="p-1">
                <i className="bi bi-plus-circle"></i>
              </div>
              <div className="p-1">Agregar Módulo</div>
            </button>
          </div>
        </div> */}
        <div>
          <Table responsive>
            <thead>
              <tr>
                {/* <th>#</th> */}
                <th>Universidad</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Habilitado</th>
                <th className="d-flex justify-content-center">Habilitar/deshabilitar</th>
              </tr>
            </thead>
            <tbody>
              {currentUniversidades.map((universidad, index1) => (
                universidad.modulos.map((modulo,index) => (
                  <tr key={index} className="m-1 mt-2 align-align-items-center">
                    {/* <td>{index}</td> */}
                    <td>{universidad.nombre}</td>
                    <td>{modulo.nombre}</td>
                    <td>{modulo.descripcion}</td>
                    <td>{modulo.estado ? "Si" : "No"}</td>
                
                    <td className="d-flex justify-content-center">
                      {modulo.estado ? (
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            deshabilitarMódulo(universidad.nombre)
                          }
                          title="Deshabilitar Módulo"
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                      ) : (
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            habilitarMódulo(universidad.nombre)
                          }
                          title="Habilitar Módulo"
                        >
                          <i className="bi bi-check"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                )) 
              ))}
            </tbody>
          </Table>
          <Pagination>
            {Array.from({
              length: Math.ceil(universidades.length / itemsPerPage),
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

export default Modulos
