import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import NoteNavigationList from "./NoteNavigationList";
import { createNote } from "../../features/slices/thunks";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { Plus } from "react-bootstrap-icons";
import {
  currentCategorySelector,
  hasNotesSelector,
} from "../../features/slices/selectors";

function NoteNavigation(props) {
  const [isMouseOnItem, setIsMouseOnItem] = useState(false);
  const [isPlusVisible, setIsPlusVisible] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const currentCategory = useSelector(currentCategorySelector);
  const hasNotes = useSelector(hasNotesSelector);

  useEffect(() => {
    if (isMouseOnItem) {
      let timeoutId = setTimeout(() => {
        setIsPlusVisible(true);
      }, 200);
      return () => clearTimeout(timeoutId);
    }
  }, [isMouseOnItem]);

  function handleMouseEnter() {
    setIsMouseOnItem(true);
  }

  function handleMouseLeave() {
    setIsPlusVisible(false);
    setIsMouseOnItem(false);
  }

  function handlePlusButtonClick() {
    dispatch(createNote({ parentId: currentCategory.id }))
      .then(unwrapResult)
      .then((note) => {
        history.push("/notes/" + note.id);
      });
  }

  return (
    <aside className="note-navigation">
      <Card>
        <Card.Header
          className="header"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span>Table of contents</span>
          <button
            onClick={handlePlusButtonClick}
            className="action-button"
            style={{
              visibility: isPlusVisible || !hasNotes ? "visible" : "hidden",
            }}
          >
            <Plus className="icon" />
          </button>
        </Card.Header>
        <Card.Body>
          {!hasNotes ? (
            <div className="navigation-no-item">
              There are no pages to show. Try adding some!
            </div>
          ) : (
            <NoteNavigationList parentNoteId={currentCategory.id} level={0} />
          )}
        </Card.Body>
      </Card>
    </aside>
  );
}

export default NoteNavigation;
