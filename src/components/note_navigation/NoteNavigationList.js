import React, { memo } from "react";
import { NoteNavigationItem } from "./NoteNavigationItem";
import { useSelector } from "react-redux";
import { childNotesSortedSelector } from "../../features/slices/selectors";

export const NoteNavigationList = memo(function (props) {
  const { parentNoteId, level } = props;
  const notes = useSelector(childNotesSortedSelector(parentNoteId));
  return (
    <>
      {notes.map((note) => (
        <NoteNavigationItem noteId={note.id} level={level} key={note.id} />
      ))}
    </>
  );
});
