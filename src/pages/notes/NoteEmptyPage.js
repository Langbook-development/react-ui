import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import NoteNavigation from "./navigation/NoteNavigation";
import {
  firstToShowNoteSelector,
  hasNotesSelector,
} from "../../state/notes/selectors";

function NoteEmptyPage() {
  const hasNotes = useSelector(hasNotesSelector);
  const firstToShowNoteId = useSelector(firstToShowNoteSelector);

  if (hasNotes) {
    return <Redirect to={"/notes/" + firstToShowNoteId} />;
  }
  return (
    <main className="note-page">
      <NoteNavigation />
      <div />
    </main>
  );
}

export default NoteEmptyPage;
