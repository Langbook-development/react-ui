import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, upsertNote } from "../../features/slices/thunks";
import TextareaAutosize from "react-textarea-autosize";
import { Button, Card, Modal } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useParams, useHistory } from "react-router-dom";

function NoteSection() {
  const { selectedNoteId } = useParams();
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const note = useSelector((state) => state.notes.byId[selectedNoteId]);
  const fallbackNoteId = useSelector((state) => {
    const sameDeepnessLestSortId = Object.values(state.notes.byId)
      .filter(
        (it) => it.deepness === note.deepness && it.parentId === note.parentId
      )
      .filter((it) => it.id !== note.id)
      .reduce((prev, curr) => (prev.sortId < curr.sortId ? prev : curr), {}).id;
    if (sameDeepnessLestSortId) {
      return sameDeepnessLestSortId;
    } else {
      if (note.parentId) {
        return note.parentId;
      } else {
        return undefined;
      }
    }
  });

  const titleTextArea = useRef(null);
  const contentTextArea = useRef(null);

  const handleTrashButtonClick = () => setShow(true);
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
    dispatch(deleteNote(note));
    if (fallbackNoteId) {
      history.push("/notes/" + fallbackNoteId);
    } else {
      history.push("/");
    }
  }

  function handleContentClick({ target }) {
    if (note.isContentFresh) {
      target.select();
    }
  }

  function handleContentChange({ target }) {
    dispatch(upsertNote({ ...note, content: target.value }));
  }

  function handleTitleChange({ target }) {
    dispatch(upsertNote({ ...note, title: target.value }));
  }

  return (
    <section className="note-content">
      <Card>
        <Card.Body>
          <div className="header">
            <TextareaAutosize
              tabIndex="1"
              ref={titleTextArea}
              className="title-area"
              value={note.title}
              onFocus={handleTitleClick}
              onChange={handleTitleChange}
            />
            <button className="action-button" onClick={handleTrashButtonClick}>
              <Trash className="icon" />
            </button>
          </div>
          <hr />
          <TextareaAutosize
            tabIndex="2"
            ref={contentTextArea}
            className="text-area"
            value={note.content}
            onFocus={handleContentClick}
            onChange={handleContentChange}
          />
        </Card.Body>
      </Card>
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

export default NoteSection;
