import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight, Plus } from "react-bootstrap-icons";
import {
  noteExpanded,
  noteCollapsed,
  upsertNote,
} from "../../features/slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import NoteNavigationList from "./NoteNavigationList";
import { unwrapResult } from "@reduxjs/toolkit";

const LEVEL_PADDING_PX = 24;

function NoteNavigationItem(props) {
  const { selectedNoteId } = useParams();
  const { level, noteId } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const note = useSelector((state) => state.notes.byId[noteId]);

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
    dispatch(noteExpanded(note.id));
  }

  function handleCollapseClick() {
    dispatch(noteCollapsed(note.id));
  }

  function handlePlusButtonClick() {
    dispatch(upsertNote({ parentId: note.id }))
      .then(unwrapResult)
      .then((note) => {
        history.push("/notes/" + note.id);
      });
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
        <Link className={getTitleClass()} to={"/notes/" + note.id}>
          {note.title}
        </Link>
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

export default NoteNavigationItem;
