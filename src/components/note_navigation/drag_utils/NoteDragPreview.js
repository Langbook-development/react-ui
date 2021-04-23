import React from "react";
import NoteNavigationItem from "../NoteNavigationItem";

export default function NoteDragPreview(props) {
  const { noteId, level, width } = props;

  return (
    <div style={{ width }} className="navigation-item-draggable">
      <NoteNavigationItem noteId={noteId} level={level} forceShow={true} />
    </div>
  );
}
