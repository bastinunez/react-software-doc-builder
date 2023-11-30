import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import * as XLSX from "xlsx";
import VentanaModal from '../general/VentanaModal';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const AgregarUsuarios = () => {
  const {showSidebar,setShowSidebar, authUser,lastPath,setLastPath,direccionIP} = useAuth()
  const inputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [tituloModal, setTituloModal] = useState("");
  const [cuerpoModal, setCuerpoModal] = useState("");
  const handleClose = () => {
    setShowModal(false);
  };
  const mostrarModal = () => {
    setShowModal(true);
  };

  const [archivo, setArchivo] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsArrayBuffer(archivo);
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      // Suponiendo que el primer sheet (hoja) contiene los datos
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const datos = XLSX.utils.sheet_to_json(sheet);

      let cargarUsuarios = true;
      // Ahora puedes procesar los datos y realizar la llamada a la API
      for (const usuario of datos) {
        if (!usuario.apellidos || !usuario.nombres || !usuario.rut || !usuario.contrasena || !usuario.email || !usuario.rolId || !usuario.universidadId) {
          setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
          setCuerpoModal('Hay datos vacíos para un usuario, revisa el archivo');
          mostrarModal();
          cargarUsuarios = false;
          return;
        } else {
          try {
            const response = await axios.get(`http://${direccionIP}/usuario/${usuario.rut}`);
            if (response.data.usuario) {
              setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
              setCuerpoModal(`El usuario ${usuario.rut} ya existe en la base de datos`);
              mostrarModal();
              cargarUsuarios = false;
              return;
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
      console.log('cargarUsuarios', cargarUsuarios);
      if(cargarUsuarios){
        datos.forEach(async (usuario) => {
          const response = await axios.post(
            "http://localhost:8080/usuario/guardar_con_rol_en_universidad", {
              rut: usuario.rut,
              nombres: usuario.nombres,
              apellidos: usuario.apellidos,
              contrasena: usuario.contrasena,
              email: usuario.email,
              rolId: usuario.rolId,
              universidadId: usuario.universidadId,
            }
          );
          setTituloModal('<span class="bi bi-check-circle text-success mx-2"></span>Éxito');
          setCuerpoModal("Se han cargado correctamente los usuarios"); 
          mostrarModal();
          console.log(response.data); 
        });
      }
    }
  }
  
  const navigate = useNavigate();

  const volver = () => {
      navigate('/administrador/usuarios');
  }

  const borrarSeleccion = () => {
    setArchivo(null);
    inputRef.current.value = null;
  }

  return (
    <div>
      <div>
        <h1 className="text-center">Agregar Usuarios</h1>
      </div>
      <button className='btn btn-primary' onClick={volver}>Volver atrás</button>
      <div className="w-100 d-flex justify-content-center ">
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <div className="p-4">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Seleccionar Archivo Excel</Form.Label>
                <Form.Control
                  type="file"
                  accept=".xls, .xlsx"
                  ref={inputRef}
                  onChange={(e) => setArchivo(e.target.files[0])}
                />
                
              </Form.Group>

              <Button className="mx-1 btn btn-primary" type="submit" disabled={!archivo}>
                Agregar usuarios
              </Button>
              <Button className="mx-1 btn btn-secondary" onClick={borrarSeleccion}>
                    Borrar selección
              </Button>

            </Form>
          </div>
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
export default AgregarUsuarios;
