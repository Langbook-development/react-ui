import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Plus } from "react-bootstrap-icons";
import { hasNotesSelector } from "../../../state/notes/selectors";
import { NoteNavigationTree } from "./NoteNavigationTree";
import { createNote } from "../../../state/notes/notesSlice";

function NoteNavigation() {
  const [isMouseOnItem, setIsMouseOnItem] = useState(false);
  const [isPlusVisible, setIsPlusVisible] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
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
    dispatch(createNote({ parentId: "root" }));
    // dispatch(createNote({ parentId: "root" }))
    //   .then(unwrapResult)
    //   .then((note) => {
    //     history.push("/notes/" + note.id);
    //   });
  }

  function handlePlusButtonMouseOver() {
    if (!isPlusVisible) {
      setIsPlusVisible(true);
    }
  }

  function showIf(condition) {
    return condition ? 1 : 0;
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
            onMouseOver={handlePlusButtonMouseOver}
            className="action-button"
            style={{
              opacity: showIf(isPlusVisible || !hasNotes),
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
            <NoteNavigationTree />
          )}
        </Card.Body>
      </Card>
    </aside>
  );
}

export default NoteNavigation;
