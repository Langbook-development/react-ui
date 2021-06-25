import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { Card } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useParams, useHistory } from "react-router-dom";
import { deleteNote, updateNote } from "../../../state/notesSlice";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "use-constant";
import NoteModal from "./NoteModal";
import {
  afterDeleteFallbackIdSelector,
  noteSelector,
} from "../../../state/selectors";

function NoteSection() {
  const { selectedNoteId, selectedCategoryId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const note = useSelector(noteSelector(selectedNoteId));
  const fallbackNoteId = useSelector(
    afterDeleteFallbackIdSelector(selectedNoteId)
  );
  const titleTextArea = useRef(null);
  const contentTextArea = useRef(null);
  const handleTrashButtonClick = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (note.data.isTitleFresh) {
      titleTextArea.current.select();
    } else {
      if (note.data.isContentFresh) {
        contentTextArea.current.select();
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id]);

  const triggerSynchronizeNoteDebounced = useConstant(() =>
    AwesomeDebouncePromise((noteToSync) => {
      // dispatch(synchronizeNote(noteToSync))
    }, 400)
  );

  function handleTitleClick({ target }) {
    if (note.data.isTitleFresh) {
      target.select();
    }
  }

  function handleDelete() {
    setShowModal(false);
    dispatch(deleteNote(note.id));
    if (fallbackNoteId) {
      history.push(
        "/categories/" + selectedCategoryId + "/notes/" + fallbackNoteId
      );
    } else {
      history.push("/");
    }
  }

  function handleContentClick({ target }) {
    if (note.data.isContentFresh) {
      target.select();
    }
  }

  function handleContentChange({ target }) {
    const nextNote = { ...note, data: { ...note.data, content: target.value } };
    dispatch(updateNote(nextNote));
    triggerSynchronizeNoteDebounced(nextNote);
  }

  function handleTitleChange({ target }) {
    const nextNote = { ...note, data: { ...note.data, title: target.value } };
    dispatch(updateNote(nextNote));
    triggerSynchronizeNoteDebounced(nextNote);
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
              value={note.data.title}
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
            value={note.data.content}
            onFocus={handleContentClick}
            onChange={handleContentChange}
          />
        </Card.Body>
      </Card>
      <NoteModal
        shouldShow={showModal}
        title={note.data.title}
        onClose={handleClose}
        onDelete={handleDelete}
      />
    </section>
  );
}

export default NoteSection;
