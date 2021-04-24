import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import NoteNavigation from "./note_navigation/NoteNavigation";

function NotePageEmpty() {
  const hasCategories = useSelector(
    (state) => state.notes.categoryIds.length > 0
  );
  const hasNotes = useSelector((state) => {
    if (hasCategories) {
      const currentCategoryId = state.notes.categoryIds[0];
      return state.notes.byId[currentCategoryId].childPageIds.length > 0;
    }
  });
  const firstToShowNoteId = useSelector((state) => {
    if (hasCategories && hasNotes) {
      const currentCategoryId = state.notes.categoryIds[0];
      return state.notes.byId[currentCategoryId].childPageIds
        .map((id) => state.notes.byId[id])
        .reduce((prev, curr) => (prev.sortId < curr.sortId ? prev : curr), {})
        .id;
    }
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
