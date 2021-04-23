import React from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight, Plus } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

export default function NoteDragPreview(props) {
  const { selectedNoteId } = useParams();
  const { noteId, level, width } = props;
  const note = useSelector((state) => state.notes.byId[noteId]);

  function getIcon() {
    if (hasSubNotes(note)) {
      if (note.isExpanded) {
        return (
          <button className="chevron-button">
            <ChevronDown className="icon" />
          </button>
        );
      } else {
        return (
          <button className="chevron-button">
            <ChevronRight className="icon" />
          </button>
        );
      }
    } else {
      return <div className="chevron-button-placeholder" />;
    }
  }

  function hasSubNotes(note) {
    return note.childPageIds && note.childPageIds.length > 0;
  }

  function getTitleClass() {
    return "title" + (note.id.toString() === selectedNoteId ? " active" : "");
  }

  return (
    <div style={{ width }} className="navigation-item-draggable">
      <div className="navigation-item" style={{ paddingLeft: 24 * level }}>
        {getIcon()}
        <div className="title-area">
          <Link className={getTitleClass()} to={"/notes/" + note.id}>
            {note.title}
          </Link>
        </div>
        <button className="action-button" style={{ visibility: "hidden" }}>
          <Plus className="icon" />
        </button>
      </div>
    </div>
  );
}
