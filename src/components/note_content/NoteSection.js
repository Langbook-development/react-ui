import React from "react";
import { connect } from "react-redux";
import { noteSelected } from "../../features/slices/notesSlice";

function NoteSection(props) {
  const { note, category } = props;
  return (
    <section>
      <div className="card">
        <div className="card-header">{category.name}</div>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.content}</p>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  const note = state.notes.byId[state.notes.selectedNoteId];
  const category = state.categories.byId[note.categoryId];
  return { note, category };
};

const mapDispatchToProps = { noteSelected };

export default connect(mapStateToProps, mapDispatchToProps)(NoteSection);
