import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import VentanaModal from "../general/VentanaModal";
import Pagination from "react-bootstrap/Pagination";
import { useAuth } from "../../context/AuthContext"


const InstanciaModulo = () => {
  const location = useLocation()
  const {authUser,updateAuth,lastPath,setLastPath,direccionIP} = useAuth()
  const [nombreModulo,setNombreModulo] = useState(location.state.nombreModulo)
  const [descripcionModulo,setDescripcionModulo] = useState()
  const [instancias,setInstancias] = useState([])

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const mostrarModal = () => setShowModal(true);
  const [cuerpoModal, setCuerpoModal] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Cantidad de elementos por página
  const indexOfLastInstancia = currentPage * itemsPerPage;
  const indexOfFirstInstancia = indexOfLastInstancia - itemsPerPage;
  const currentInstancia = instancias.slice(indexOfFirstInstancia, indexOfLastInstancia);
  const navigate = useNavigate()

  useEffect(()=>{
    setNombreModulo(location.state.nombreModulo)
    getInstancias()
  },[])
  
  const getInstancias = async () => {
    //console.log(nombreModulo)
    const response = await axios.get(`http://${direccionIP}/instanciamodulo/findByModulo/${nombreModulo}`);
    setInstancias(response.data.filas); // Actualiza el estado con los datos obtenidos
    //console.log(response.data.filas)
  }
  const irAgregarInstancia = async () => {
    navigate('/director/modulos/instancia/agregar',{state:{nombreModulo:nombreModulo}})
  }
  
  const volver = () => {
    navigate( '/director/modulos');
  }

  return (
    <div>
      <div className="pt-2 pb-3">
        <h1 className="text-center">Instancias de {nombreModulo}</h1>
      </div>
      <button className='btn btn-primary' onClick={volver}>Volver atrás</button>
      <div>
        <div>
          <div className="bg-white w-100 justify-content-end d-flex p-3">
            <button
              className="btn btn-primary border-0 rounded-2 p-1 d-flex text-white"
              onClick={irAgregarInstancia}
            >
              <div className="p-1">
                <i className="bi bi-plus-circle"></i>
              </div>
              <div className="p-1">Agregar Instancia</div>
            </button>
          </div>
        </div>
        <div>
          <Table responsive>
            <thead>
              <tr>
                <th>Año</th>
                <th>Semestre</th>
                <th>Seccion</th>
                <th>Profesor</th>
              </tr>
            </thead>
            <tbody>
              {currentInstancia.map((instancia, index) => (
                  <tr key={index} className="m-1 mt-2 align-align-items-center">
                    <td>{instancia.instanciaModuloPK.ano}</td>
                    <td>{instancia.instanciaModuloPK.semestre}</td>
                    <td>{instancia.instanciaModuloPK.seccion}</td>
                    <td>{instancia.profesor == null? `No asignado` : instancia.profesor.nombres}</td>
                  </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {Array.from({
              length: Math.ceil(instancias.length / itemsPerPage),
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
  )
}

export default InstanciaModulo
