import React from "react";
import NoteNavigationItem from "./NoteNavigationItem";

function NoteNavigationList(props) {
  const { noteIds, level } = props;
  return (
    <div className="list">
      {noteIds.map((noteId) => (
        <NoteNavigationItem noteId={noteId} level={level} key={noteId} />
      ))}
    </div>
  );
}

export default NoteNavigationList;
