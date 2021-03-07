import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import NoteNavigationList from "./NoteNavigationList";
import { noteCreated } from "../../features/slices/notesSlice";

function NoteNavigation(props) {
  const [isMouseOnItem, setIsMouseOnItem] = useState(false);
  const [isPlusVisible, setIsPlusVisible] = useState(false);
  const dispatch = useDispatch();
  const noteIds = useSelector((state) =>
    Object.values(state.notes.byId)
      .filter((it) => !it.parentId)
      .map((it) => it.id)
  );

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
    dispatch(noteCreated({}));
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
            style={{ visibility: isPlusVisible ? "visible" : "hidden" }}
          >
            <span className="fa fa-plus" aria-hidden="true" />
          </button>
        </Card.Header>
        <Card.Body>
          <NoteNavigationList noteIds={noteIds} level={0} />
        </Card.Body>
      </Card>
    </aside>
  );
}

export default NoteNavigation;
