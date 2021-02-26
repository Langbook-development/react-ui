import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { noteUpdated, noteDeleted } from "../../features/slices/notesSlice";
import TextareaAutosize from "react-textarea-autosize";
import { Gear, Trash } from "react-bootstrap-icons";
import { Button, Modal } from "react-bootstrap";

function NoteSection(props) {
  const { note } = props;
  const { noteUpdated, noteDeleted } = props;
  const titleTextArea = useRef(null);
  const contentTextArea = useRef(null);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (note.isTitleFresh) {
      titleTextArea.current.select();
    } else {
      if (note.isContentFresh) {
        contentTextArea.current.select();
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id]);

  function handleTitleClick({ target }) {
    if (note.isTitleFresh) {
      target.select();
    }
  }

  function handleDeleteButtonClick() {
    setShow(false);
    noteDeleted(note);
  }

  function handleContentClick({ target }) {
    if (note.isContentFresh) {
      target.select();
    }
  }

  function handleContentChange({ target }) {
    noteUpdated({ ...note, content: target.value, isContentFresh: false });
  }

  function handleTitleChange({ target }) {
    noteUpdated({ ...note, title: target.value, isTitleFresh: false });
  }

  return (
    <section className="note-section">
      <div className="card">
        <div className="card-body">
          <div className="content">
            <div className="title-container">
              <div className="title-area-container">
                <TextareaAutosize
                  ref={titleTextArea}
                  className="title-area"
                  value={note.title}
                  onFocus={handleTitleClick}
                  onChange={handleTitleChange}
                />
              </div>

              <div className="button-container">
                <div className="button">
                  <Gear />
                </div>
                <div className="button">
                  <Trash onClick={handleShow} />
                </div>
              </div>
            </div>

            <hr />
            <TextareaAutosize
              ref={contentTextArea}
              className="text-area"
              value={note.content}
              onFocus={handleContentClick}
              onChange={handleContentChange}
            />
          </div>
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
    </section>
  );
}

const mapDispatchToProps = {
  noteUpdated,
  noteDeleted,
};
const mapStateToProps = (state) => {
  const note = state.notes.byId[state.notes.selectedNoteId];
  return { note };
};
export default connect(mapStateToProps, mapDispatchToProps)(NoteSection);
