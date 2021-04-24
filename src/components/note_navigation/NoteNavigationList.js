import React from "react";
import { NoteNavigationItem } from "./NoteNavigationItem";
import { useSelector } from "react-redux";
import { childNotesSelector } from "../../features/slices/selectors";

function NoteNavigationList(props) {
  const { parentNoteId, level } = props;
  const notes = useSelector(childNotesSelector(parentNoteId));
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
