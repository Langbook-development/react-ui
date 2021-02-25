import React, { useState } from "react";
import { connect } from "react-redux";
import { Gear, Trash } from "react-bootstrap-icons";
import { noteDeleted } from "../../features/slices/notesSlice";
import { Modal, Button } from "react-bootstrap";

function NoteHeader(props) {
  const { category, note } = props;
  const { noteDeleted } = props;

  const [show, setShow] = useState(false);

  function handleDeleteButtonClick() {
    setShow(false);
    noteDeleted(note);
  }

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="card-header category-header">
      <div className="category-container">{category.name}</div>
      <div className="button-container">
        <div className="button">
          <Gear />
        </div>
        <div className="button" onClick={handleShow}>
          <Trash />
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{note.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete his page?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteButtonClick}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const mapDispatchToProps = {
  noteDeleted,
};
const mapStateToProps = (state) => {
  const note = state.notes.byId[state.notes.selectedNoteId];
  const category = state.notes.categories.byId[note.categoryId];
  return { category, note };
};
export default connect(mapStateToProps, mapDispatchToProps)(NoteHeader);
