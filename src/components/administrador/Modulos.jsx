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
      `http://${direccionIP}/modulo/`
    );
    console.log(response.data)
    setUniversidades(response.data.filas); // Actualiza el estado con los datos obtenidos
  };

  useEffect(() => {
    getUniversidades();
    //console.log(currentUniversidades)
  }, []);


  const navigate = useNavigate();


  return (
    <div>
      <div className="pt-2 pb-5">
        <h1 className="text-center">Gestion de Módulos</h1>
      </div>
      <div>
        <div>
          <Table responsive>
            <thead>
              <tr>
                {/* <th>#</th> */}
                <th>Universidad</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Habilitado</th>
              </tr>
            </thead>
            <tbody>
              {currentUniversidades.map((modulo,index) => (
                  <tr key={index} className="m-1 mt-2 align-align-items-center">
                    {/* <td>{index}</td> */}
                    <td>{modulo.universidad.nombre}</td>
                    <td>{modulo.nombre}</td>
                    <td>{modulo.descripcion}</td>
                    <td>{modulo.estado ? "Si" : "No"}</td>
                  </tr>
                )) 
              }
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
