import { Button, Modal } from "react-bootstrap";
import React from "react";

function NoteModal(props) {
  const { onClose, onDelete } = props;
  const { shouldShow, title } = props;

  return (
    <Modal show={shouldShow} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete his page?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NoteModal;
