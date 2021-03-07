import React from "react";
import NoteNavigationItem from "./NoteNavigationItem";

function NoteNavigationList(props) {
  const { noteIds, level } = props;
  return (
    <>
      {[...noteIds]
        .sort((a, b) => a.sortId - b.sortId)
        .map((noteId) => (
          <NoteNavigationItem noteId={noteId} level={level} key={noteId} />
        ))}
    </>
  );
}

export default NoteNavigationList;
