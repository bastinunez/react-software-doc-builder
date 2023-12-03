import React from 'react'
import CardModulo from '../general/CardModulo'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const ModulosEstudiante = () => {
  return (
    <div>
        <div className='d-flex'>
            <div className='d-flex'>
              <div className='align-items-center d-flex'>
                <div className='pe-1 ps-1' style={{width:"10rem"}}>
                  <Form.Select aria-label="Default select example">
                    <option defaultValue={"2022-1"} value="2022-1">2022-1</option>
                    <option value="2022-2">2022-2</option>
                    <option value="2023-1">2023-1</option>
                  </Form.Select>
                </div>
              </div>
            </div>
        </div>
        <div>
          <Row xs={1} md={2} lg={3} className='m-3 g-3'>
            <Col>
              <CardModulo />
            </Col>
            <Col>
              <CardModulo />
            </Col>
            <Col>
              <CardModulo />
            </Col>
            <Col>
              <CardModulo />
            </Col>
          </Row>
        </div>
    </div>
  )
}

export default ModulosEstudiante
