import React from "react";
import NoteNavigationItem from "./NoteNavigationItem";
import { useSelector } from "react-redux";

function NoteNavigationList(props) {
  const { noteIds, level } = props;
  const notes = useSelector((state) =>
    noteIds.map((id) => state.notes.byId[id])
  );

  return (
    <>
      {[...notes]
        .sort((a, b) => a.sortId - b.sortId)
        .map((note) => (
          <NoteNavigationItem noteId={note.id} level={level} key={note.id} />
        ))}
    </>
  );
}

export default NoteNavigationList;
