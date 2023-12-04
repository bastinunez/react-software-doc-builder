import React from 'react'
import CardProyecto from '../general/CardProyecto'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


const ProyectosEstudiante = () => {
  return (
    <div className='container'>
        <div className="pt-2 pb-5">
            <h1 className="text-center">Proyectos</h1>
        </div>
        <div>
          <Row xs={1} md={1} lg={1} className='m-3 g-3'>
            <Col>
              <CardProyecto />
            </Col>
            <Col>
              <CardProyecto />
            </Col>
            <Col>
              <CardProyecto />
            </Col>
            <Col>
              <CardProyecto />
            </Col>
          </Row>
        </div>
    </div>
  )
}

export default ProyectosEstudiante
