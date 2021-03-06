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

  const navigationItemStyle = { paddingLeft: LEVEL_PADDING_PX * level };

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
          <button className="chevron-button" onClick={handleCollapseClick}>
            <ChevronDown className="icon" />
          </button>
        );
      } else {
        return (
          <button className="chevron-button" onClick={handleExpandClick}>
            <ChevronRight className="icon" />
          </button>
        );
      }
    } else {
      return <div className="chevron-button-placeholder" />;
    }
  }

  return (
    <>
      <div
        className="navigation-item"
        style={navigationItemStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {getIcon()}
        <span className={getTitleClass()} onClick={handleSelectNote}>
          {note.title}
        </span>
        <button
          className="action-button"
          onClick={handlePlusButtonClick}
          style={{ visibility: isPlusVisible ? "visible" : "hidden" }}
        >
          <Plus className="icon" />
        </button>
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
