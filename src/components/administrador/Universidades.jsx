import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import VentanaModal from "../general/VentanaModal";
import Pagination from "react-bootstrap/Pagination";
import { useAuth } from '../../context/AuthContext';

const Universidades = () => {
  const {showSidebar,setShowSidebar, authUser,direccionIP} = useAuth()
  const [universidades, setUniversidades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const mostrarModal = () => setShowModal(true);
  const [tituloModal, setTituloModal] = useState("");
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

  const deshabilitarUniversidad = async (abreviacion) => {
    //Agregar universidad a la base de datos.
    try {
      const response = await axios.patch(
        `http://${direccionIP}/universidad/deshabilitar/${abreviacion}`
      );
      
      if (!response.data.exito) {
        setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
        setCuerpoModal('Ocurrió un error al deshabilitar la universidad'); 
        mostrarModal(); 
        return;
      }
      setTituloModal('<span class="bi bi-check-circle text-success mx-2"></span>Éxito');
      setCuerpoModal("Se ha deshabilitado correctamente la universidad");
      mostrarModal();
      await getUniversidades();
    } catch (error) {
      console.log(error);
    }
  };

  const habilitarUniversidad = async (abreviacion) => {
    //Agregar universidad a la base de datos.
    try {
      const response = await axios.patch(
        `http://${direccionIP}/universidad/habilitar/${abreviacion}`
      );
      if (!response.data.exito) {
        setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
        setCuerpoModal('Ocurrió un error al habilitar la universidad'); 
        mostrarModal(); 
        return;
      }
      setTituloModal('<span class="bi bi-check-circle text-success mx-2"></span>Éxito');
      setCuerpoModal("Se ha habilitado correctamente la universidad");
      mostrarModal();
      await getUniversidades();
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const irAgregarUniversidad = () => {
    // navigate('/administrador/universidades/agregar',{ state: { nombre, apellido } }) //este es un ejemplo si es que se quiere pasar parametros
    navigate("/administrador/universidades/agregar");
  };

  const irEditarUniversidad = (abreviacion) => {
    navigate("/administrador/universidades/editar", {
      state: { parametro: abreviacion },
    });
  };

  //<input type='checkbox' checked={universidad.estado} />

  return (
    <div>
      <div className="pt-2 pb-5">
        <h1 className="text-center">Gestion de Universidades</h1>
      </div>
      
      <div>
        <div>
          <div className="bg-white w-100 justify-content-end d-flex p-3">
            <button
              className="btn btn-primary border-0 rounded-2 p-1 d-flex text-white"
              onClick={irAgregarUniversidad}
            >
              <div className="p-1">
                <i className="bi bi-plus-circle"></i>
              </div>
              <div className="p-1">Agregar universidad</div>
            </button>
          </div>
        </div>
        <div>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Abreviación</th>
                <th>Habilitado</th>
                <th>Editar</th>
                <th className="d-flex justify-content-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {currentUniversidades.map((universidad, index) => (
                <tr key={index} className="m-1 mt-2 align-align-items-center">
                  <td>{index + 1}</td>
                  <td>{universidad.nombre}</td>
                  <td>{universidad.abreviacion}</td>
                  <td>{universidad.estado ? "Si" : "No"}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        irEditarUniversidad(universidad.abreviacion)
                      }
                      title="Editar Universidad"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td>
                  <td className="d-flex justify-content-center">
                    {universidad.estado ? (
                      <button className="btn btn-danger" style={{width:'110px'}} onClick={() => deshabilitarUniversidad(universidad.abreviacion) } title="Deshabilitar Universidad" >
                        Deshabilitar
                      </button>
                    ) : (
                      <button className="btn btn-success" style={{width:'110px'}} onClick={() => habilitarUniversidad(universidad.abreviacion) } title="Habilitar Universidad" >
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
          titulo={tituloModal}
          cuerpo={cuerpoModal}
          showModal={showModal}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default Universidades;
