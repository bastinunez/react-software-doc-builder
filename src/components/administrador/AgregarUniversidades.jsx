import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import * as XLSX from "xlsx";
import VentanaModal from '../general/VentanaModal';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const AgregarUniversidades = () => {
  const {showSidebar, setShowSidebar, authUser, lastPath, setLastPath, direccionIP} = useAuth()
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
      const universidades = XLSX.utils.sheet_to_json(sheet);

      let cargarUniversidades = true;
      // Ahora puedes procesar los datos y realizar la llamada a la API
      for (const universidad of universidades) {
        if (!universidad.abreviacion || !universidad.nombre) {
          setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
          setCuerpoModal('Hay datos vacíos, revisa el archivo');
          mostrarModal();
          cargarUniversidades = false;
          return;
        } else {
          try {
            const response = await axios.get( `http://${direccionIP}/universidad/abreviacion/${universidad.abreviacion}` );
            console.log(response.data.filas);
            if (response.data.filas) {
              setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
              setCuerpoModal(`La universidad ${universidad.abreviacion} ya existe en la base de datos`);
              mostrarModal();
              cargarUniversidades = false;
              return;
            }
          } catch (error) {
            setTituloModal('<span class="bi bi-exclamation-triangle text-danger mx-2"></span>Error');
          }
        }
      }

      if(cargarUniversidades){
        try {
          universidades.forEach(async (universidad) => {
            const response = await axios.post( `http://${direccionIP}/universidad/guardar`, { 
              abreviacion: universidad.abreviacion,
              nombre: universidad.nombre, 
            });
            setTituloModal('<span class="bi bi-check-circle text-success mx-2"></span>Éxito');
            setCuerpoModal("Se han cargado correctamente las universidades"); 
            mostrarModal();
          });
        } catch (error) {
          console.err(error);
        }
      }
    }
  }
  
  const navigate = useNavigate();

  const volver = () => {
      navigate('/administrador/universidades');
  }

  const borrarSeleccion = () => {
    setArchivo(null);
    inputRef.current.value = null;
  }

  const getTemplate = () => {
    const path = '../../assets/plantilla-universidades.xlsx';
    const link = document.createElement('a');
    link.href = path;
    link.download = 'plantilla-universidades.xlsx';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }

  return (
    <div>
      <div>
        <h1 className="text-center">Agregar Universidades</h1>
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
                Agregar universidades
              </Button>
              <Button className="mx-1 btn btn-secondary" onClick={borrarSeleccion}>
                Borrar selección
              </Button>
              <button className="mx-1 btn btn-secondary" onClick={getTemplate} type="button">
                Descargar plantilla
              </button>
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
export default AgregarUniversidades;
