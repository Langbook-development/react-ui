import { Plus } from "react-bootstrap-icons";
import React, { useEffect, useState } from "react";
import { noteCreated } from "../../features/slices/notesSlice";
import { connect } from "react-redux";

function NoteNavigationCategory(props) {
  const { category } = props;
  const { noteCreated } = props;
  const [isMouseOnItem, setIsMouseOnItem] = useState(false);
  const [isPlusVisible, setIsPlusVisible] = useState(false);

  useEffect(() => {
    if (isMouseOnItem) {
      let timeoutId = setTimeout(() => {
        setIsPlusVisible(true);
      }, 280);
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
    noteCreated({ categoryId: category.id });
  }

  return (
    <div
      className="category"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="title-container">
        <span className="title">{category.name}</span>
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
  );
}

const mapDispatchToProps = {
  noteCreated,
};
const mapStateToProps = (state, ownProps) => {
  return {
    category: state.notes.categories.byId[ownProps.categoryId],
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteNavigationCategory);
