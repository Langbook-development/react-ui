import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight, Plus } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { createNote } from "../../../state/thunks";

export const NoteNavigationItem = (props) => {
  const { selectedCategoryId, selectedNoteId } = useParams();
  const { note, isDragging } = props;
  const { onExpand, onCollapse } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const [isPlusVisible, setIsPlusVisible] = useState(false);
  const [isMouseOnItem, setIsMouseOnItem] = useState(false);

  useEffect(() => {
    if (isMouseOnItem && !isDragging) {
      let timeoutId = setTimeout(() => {
        setIsPlusVisible(true);
      }, 280);
      return () => clearTimeout(timeoutId);
    }
  }, [isMouseOnItem, isDragging]);

  function handleMouseLeave() {
    setIsPlusVisible(false);
    setIsMouseOnItem(false);
  }

  function handleMouseEnter() {
    if (!isDragging) {
      setIsMouseOnItem(true);
    }
  }

  function handlePlusButtonClick() {
    dispatch(createNote({ categoryId: selectedCategoryId, parentId: note.id }))
      .then(unwrapResult)
      .then(({ note }) => {
        history.push("/categories/" + selectedCategoryId + "/notes/" + note.id);
      });
  }

  function hasSubNotes(note) {
    return note.children?.length > 0;
  }

  function getTitleClass() {
    return "title" + (note.id === selectedNoteId ? " active" : "");
  }

  function showIf(condition) {
    return condition ? "visible" : "hidden";
  }

  function getIcon() {
    if (hasSubNotes(note)) {
      if (note.isExpanded) {
        return (
          <button
            className="chevron-button"
            onClick={() => onCollapse(note.id)}
          >
            <ChevronDown className="icon" />
          </button>
        );
      } else {
        return (
          <button className="chevron-button" onClick={() => onExpand(note.id)}>
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {getIcon()}

      <div className="title-area">
        <Link
          className={getTitleClass()}
          to={"/categories/" + selectedCategoryId + "/notes/" + note.id}
        >
          {note.data.title}
        </Link>
      </div>

      <button
        className="action-button"
        onClick={handlePlusButtonClick}
        style={{
          visibility: showIf(isPlusVisible && !isDragging),
        }}
      >
        <Plus className="icon" />
      </button>
    </div>
  );
};
