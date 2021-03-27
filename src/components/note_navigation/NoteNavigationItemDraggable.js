import NoteNavigationItem from "./NoteNavigationItem";
import React from "react";

export default function NoteNavigationItemDraggable(props) {
  const { noteId, level, width } = props;
  return (
    <div style={{ width }}>
      <NoteNavigationItem noteId={noteId} level={level} />
    </div>
  );
}
