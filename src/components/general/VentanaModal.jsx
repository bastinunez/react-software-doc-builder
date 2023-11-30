import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const VentanaModal = ({ titulo, cuerpo, showModal, handleClose }) => {
  
    return (
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title> 
                
                <div dangerouslySetInnerHTML={{ __html: titulo }} /> 
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>{cuerpo}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                Cerrar
            </Button>
        </Modal.Footer>
        </Modal>
    );
};

export default VentanaModal;
