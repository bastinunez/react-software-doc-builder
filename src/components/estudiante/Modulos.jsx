import React, { useEffect, useState } from 'react';
import CardModulo from '../general/CardModulo';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const ModulosEstudiante = () => {
	const { authUser, updateAuth, lastPath, setLastPath, direccionIP } = useAuth();
	const [modulos, setModulos] = useState([]);
	const [modulosFiltrador, setModulosFiltrado] = useState([]);
	const [year, setYear] = useState(null);
	const [yearList, setYearList] = useState([]);
	const [semestre, setSemestre] = useState(null);
	const [semestreList, setSemestreList] = useState([]);

	const getInstanciasModulos = async () => {
		const response = await axios.get(
			`http://${direccionIP}/usuarioestudiante_instanciamodulo/findByUsuario?rut=${authUser.usuario.rut}`,
		);

		if (response.data.filas) {
      
      setModulos(response.data.filas);
      const uniqueYears = [...new Set(response.data.filas.map((item) => item.instanciaModulo.instanciaModuloPK.ano))];
      const uniqueSemesters = [...new Set(response.data.filas.map((item) => item.instanciaModulo.instanciaModuloPK.semestre))];
      
      setYearList(uniqueYears);
      setSemestreList(uniqueSemesters);

		} else {
			setModulos([]);
			setYearList([]);
			setSemestreList([]);
		}
	};

	const filtrarInstancias = (ano, semestre) => {
		if (ano == null && semestre == null) {
			ano = yearList[0];
      setYear(ano);

			semestre = semestreList[0];
			setSemestre(semestre);
		}
		//console.log("filtrador:",modulos.filter(instancia => instancia.instanciaModuloPK.ano === ano && instancia.instanciaModuloPK.semestre === semestre))
    console.log('ano:' + ano + ',semestre:' + semestre);
    
    const modulosFiltrados = modulos.filter( (instancia) =>
      instancia.instanciaModulo.instanciaModuloPK.ano === ano && 
      instancia.instanciaModulo.instanciaModuloPK.semestre === semestre
    );
    console.log(modulosFiltrados);
		return modulosFiltrados; 
	};

	useEffect(() => {
		getInstanciasModulos();
	}, []);

	useEffect(() => {
		setModulosFiltrado(filtrarInstancias(year, semestre));
	}, [year, yearList, semestre, semestreList]);

	return (
		<div>
			<div className='d-flex'>
				<div className='d-flex'>
					<div className='align-items-center d-flex'>
						<div className='pe-1 ps-1' style={{ width: '10rem' }}>
							<Form.Select
								aria-label='Default select example'
								onChange={(e) => setYear(parseInt(e.target.value))}>
								{yearList.map((year, index) => (
									<option key={index} value={year}>
										{year}
									</option>
								))}
							</Form.Select>
						</div>
						<div
							className='pe-1 ps-1' style={{ width: '10rem' }}>
							<Form.Select
								aria-label='Default select example'
								onChange={(e) => setSemestre(parseInt(e.target.value))}>
								{semestreList.map((semestre, index) => (
									<option key={index} value={semestre}>
										{semestre}
									</option>
								))}
							</Form.Select>
						</div>
					</div>
				</div>
			</div>
			<div>
				<Row xs={1} md={2} lg={3} className='m-3 g-3'>
					{ modulos.length === 0 ? (
						<>
							<h2>No tienes modulos asociados</h2>
						</>
					) : (
						<>
							{ modulosFiltrador.map((modulo, index) => (
								<Col key={index}>
									<CardModulo modulo={modulo} nombre={modulo.instanciaModulo.instanciaModuloPK.modulo.nombre}
										seccion={modulo.instanciaModulo.instanciaModuloPK.seccion}
									/>
								</Col>
							))}
						</>
					)}
				</Row>
			</div>
		</div>
	);
};

export default ModulosEstudiante;
