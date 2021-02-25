import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { noteUpdated } from "../../features/slices/notesSlice";
import TextareaAutosize from "react-textarea-autosize";
import NoteHeader from "./NoteHeader";

function NoteSection(props) {
  const { note, category } = props;
  const { noteUpdated } = props;
  const titleTextArea = useRef(null);
  const contentTextArea = useRef(null);

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
        <NoteHeader />

        <div className="card-body">
          <div className="content">
            <TextareaAutosize
              ref={titleTextArea}
              className="title-area"
              value={note.title}
              onFocus={handleTitleClick}
              onChange={handleTitleChange}
            />

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
    </section>
  );
}

const mapDispatchToProps = {
  noteUpdated,
};
const mapStateToProps = (state) => {
  const note = state.notes.byId[state.notes.selectedNoteId];
  const category = state.notes.categories.byId[note.categoryId];
  return { note, category };
};
export default connect(mapStateToProps, mapDispatchToProps)(NoteSection);
