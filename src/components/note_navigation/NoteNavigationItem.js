import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CircleFill,
  Plus,
} from "react-bootstrap-icons";
import { noteSelected } from "../../features/slices/notesSlice";
import { connect } from "react-redux";
import NoteNavigationList from "./NoteNavigationList";

const LEVEL_PADDING_PX = 24;

function NoteNavigationItem(props) {
  const { level, note, selectedNoteId, noteSelected } = props;

  const [isPlusVisible, setIsPlusVisible] = useState(false);
  const [isMouseOnItem, setIsMouseOnItem] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isMouseOnItem) {
      let timeoutId = setTimeout(() => {
        setIsPlusVisible(true);
      }, 240);
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
    setIsExpanded(true);
  }

  function handleCollapseClick() {
    setIsExpanded(false);
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
      return isExpanded ? (
        <ChevronDown className="list-icon" onClick={handleCollapseClick} />
      ) : (
        <ChevronRight className="list-icon" onClick={handleExpandClick} />
      );
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
          className="plus-container"
          style={{ visibility: isPlusVisible ? "visible" : "hidden" }}
        >
          <div className="plus-button">
            <Plus className="plus" />
          </div>
        </div>
      </div>
      {isExpanded && (
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
};
const mapStateToProps = (state) => {
  return {
    selectedNoteId: state.notes.selectedNoteId,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NoteNavigationItem);
