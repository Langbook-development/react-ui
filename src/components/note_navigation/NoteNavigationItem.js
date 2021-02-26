import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CircleFill,
  Plus,
} from "react-bootstrap-icons";
import {
  noteSelected,
  noteCreated,
  noteExpanded,
  noteCollapsed,
} from "../../features/slices/notesSlice";
import { connect } from "react-redux";
import NoteNavigationList from "./NoteNavigationList";

const LEVEL_PADDING_PX = 24;

function NoteNavigationItem(props) {
  const { level, note, selectedNoteId } = props;
  const { noteSelected, noteCreated, noteExpanded, noteCollapsed } = props;

  const [isPlusVisible, setIsPlusVisible] = useState(false);
  const [isMouseOnItem, setIsMouseOnItem] = useState(false);

  useEffect(() => {
    if (isMouseOnItem) {
      let timeoutId = setTimeout(() => {
        setIsPlusVisible(true);
      }, 200);
      return () => clearTimeout(timeoutId);
    }
  }, [isMouseOnItem]);

  const navigationItemStyle = { paddingLeft: 20 + LEVEL_PADDING_PX * level };

  function handleMouseLeave() {
    setIsPlusVisible(false);
    setIsMouseOnItem(false);
  }

  function handleMouseEnter() {
    setIsMouseOnItem(true);
  }

  function handleExpandClick() {
    noteExpanded(note.id);
  }

  function handleCollapseClick() {
    noteCollapsed(note.id);
  }

  function handlePlusButtonClick() {
    noteCreated({ categoryId: note.categoryId, parentId: note.id });
  }

  function handleSelectNote() {
    noteSelected(note);
  }

  function hasSubNotes(note) {
    return note.childPageIds && note.childPageIds.length > 0;
  }

  function getTitleClass() {
    return "title" + (note.id === selectedNoteId ? " active" : "");
  }

  function getIcon() {
    if (hasSubNotes(note)) {
      if (note.isExpanded) {
        return (
          <ChevronDown className="list-icon" onClick={handleCollapseClick} />
        );
      } else {
        return (
          <ChevronRight className="list-icon" onClick={handleExpandClick} />
        );
      }
    } else {
      return <CircleFill className="hidden-icon" />;
    }
  }

  return (
    <>
      <div
        className="navigation-item"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={navigationItemStyle}
      >
        <div className="icon-container">{getIcon()}</div>
        <div className="title-container">
          <span className={getTitleClass()} onClick={handleSelectNote}>
            {note.title}
          </span>
        </div>
        <div
          onClick={handlePlusButtonClick}
          className="plus-container"
          style={{ visibility: isPlusVisible ? "visible" : "hidden" }}
        >
          <div className="plus-button">
            <Plus className="plus" />
          </div>
        </div>
      </div>
      {note.isExpanded && (
        <NoteNavigationList
          noteIds={note.childPageIds}
          level={level + 1}
          key={note.id}
        />
      )}
    </>
  );
}

const mapDispatchToProps = {
  noteSelected,
  noteCreated,
  noteExpanded,
  noteCollapsed,
};
const mapStateToProps = (state, ownProps) => {
  return {
    selectedNoteId: state.notes.selectedNoteId,
    note: state.notes.byId[ownProps.noteId],
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NoteNavigationItem);
