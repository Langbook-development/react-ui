import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, synchronizeNote } from "../../features/slices/thunks";
import TextareaAutosize from "react-textarea-autosize";
import { Card } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useParams, useHistory } from "react-router-dom";
import { updateNote } from "../../features/slices/notesSlice";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "use-constant";
import NoteModal from "./NoteModal";

function NoteSection() {
  const { selectedNoteId } = useParams();
  const [showModal, setShowModal] = useState(false);
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

  const handleTrashButtonClick = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (note.isTitleFresh) {
      titleTextArea.current.select();
    } else {
      if (note.isContentFresh) {
        contentTextArea.current.select();
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id]);

  const triggerSynchronizeNoteDebounced = useConstant(() =>
    AwesomeDebouncePromise(
      (noteToSync) => dispatch(synchronizeNote(noteToSync)),
      1000
    )
  );

  function handleTitleClick({ target }) {
    if (note.isTitleFresh) {
      target.select();
    }
  }

  function handleDelete() {
    setShowModal(false);
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
    const nextNote = { ...note, content: target.value };
    dispatch(updateNote(nextNote));
    triggerSynchronizeNoteDebounced(nextNote);
  }

  function handleTitleChange({ target }) {
    const nextNote = { ...note, title: target.value };
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
      <NoteModal
        shouldShow={showModal}
        title={note.title}
        onClose={handleClose}
        onDelete={handleDelete}
      />
    </section>
  );
}

export default NoteSection;
