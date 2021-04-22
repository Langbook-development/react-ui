import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import NoteNavigation from "./note_navigation/NoteNavigation";

function NotePageEmpty() {
  const hasNotes = useSelector((state) => state.notes.allIds.length > 0);
  const firstToShowNoteId = useSelector((state) => {
    const currentCategory = state.notes.categoryIds[0];
    if (!currentCategory) {
      return undefined;
    }
    return state.notes.byId[currentCategory].childPageIds
      .map((id) => state.notes.byId[id])
      .reduce((prev, curr) => (prev.sortId < curr.sortId ? prev : curr), {}).id;
  });

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

export default NotePageEmpty;
