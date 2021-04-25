import React, { memo, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight, Plus } from "react-bootstrap-icons";
import { noteExpanded, noteCollapsed } from "../../state/notes/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { createNote } from "../../state/notes/thunks";
import { noteSelector } from "../../state/notes/selectors";

const LEVEL_PADDING_PX = 24;

export const NoteNavigationItem = memo(function NoteNavigationItem(props) {
  const { selectedNoteId } = useParams();
  const { level, noteId } = props;
  const { isNoteDragged, isDragInProgress } = props;
  const note = useSelector(noteSelector(noteId));
  const history = useHistory();
  const dispatch = useDispatch();

  const [isPlusVisible, setIsPlusVisible] = useState(false);
  const [isMouseOnItem, setIsMouseOnItem] = useState(false);

  useEffect(() => {
    if (isMouseOnItem && !isNoteDragged) {
      let timeoutId = setTimeout(() => {
        setIsPlusVisible(true);
      }, 280);
      return () => clearTimeout(timeoutId);
    }
  }, [isMouseOnItem, isNoteDragged]);

  function handleMouseLeave() {
    setIsPlusVisible(false);
    setIsMouseOnItem(false);
  }

  function handleMouseEnter() {
    if (!isDragInProgress) {
      setIsMouseOnItem(true);
    }
  }

  function handleExpandClick() {
    dispatch(noteExpanded(note.id));
  }

  function handleCollapseClick() {
    dispatch(noteCollapsed(note.id));
  }

  function handlePlusButtonClick() {
    dispatch(createNote({ parentId: note.id }))
      .then(unwrapResult)
      .then((note) => {
        history.push("/notes/" + note.id);
      });
  }

  function hasSubNotes(note) {
    return note.childPageIds?.length > 0;
  }

  function getTitleClass() {
    return "title" + (note.id.toString() === selectedNoteId ? " active" : "");
  }

  function showIf(condition) {
    return condition ? "visible" : "hidden";
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
    <div
      className="navigation-item"
      style={{
        paddingLeft: LEVEL_PADDING_PX * level,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {getIcon()}

      <div className="title-area">
        <Link className={getTitleClass()} to={"/notes/" + note.id}>
          {note.title}
        </Link>
      </div>

      <button
        className="action-button"
        onClick={handlePlusButtonClick}
        style={{
          visibility: showIf(isPlusVisible && !isDragInProgress),
        }}
      >
        <Plus className="icon" />
      </button>
    </div>
  );
});
