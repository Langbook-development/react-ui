import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import NoteNavigationList from "./NoteNavigationList";
import { noteCreated } from "../../features/slices/notesSlice";
import { Plus } from "react-bootstrap-icons";

function NoteNavigation(props) {
  const { noteIds } = props;
  const { noteCreated } = props;
  const [isMouseOnItem, setIsMouseOnItem] = useState(false);
  const [isPlusVisible, setIsPlusVisible] = useState(false);

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
    noteCreated({});
  }

  return (
    <aside className="note-navigation">
      <Card>
        <Card.Header>
          <div
            className="category"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="title-container">
              <span className="title">Table of contents</span>
            </div>
            <div
              className="plus-container"
              style={{ visibility: isPlusVisible ? "visible" : "hidden" }}
            >
              <div className="plus-button" onClick={handlePlusButtonClick}>
                <Plus className="plus" />
              </div>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <NoteNavigationList noteIds={noteIds} level={0} />
        </Card.Body>
      </Card>
    </aside>
  );
}

const mapDispatchToProps = {
  noteCreated,
};
const mapStateToProps = (state) => {
  return {
    noteIds: Object.values(state.notes.byId)
      .filter((it) => !it.parentId)
      .map((it) => it.id),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NoteNavigation);
