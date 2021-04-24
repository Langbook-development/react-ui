import React from "react";
import NoteNavigation from "./note_navigation/NoteNavigation";
import NoteSection from "./note_content/NoteSection";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function NotePage() {
  const hasNotes = useSelector((state) => {
    const currentCategoryId = state.notes.categoryIds[0];
    if (currentCategoryId) {
      return state.notes.byId[currentCategoryId].childPageIds.length > 0;
    }
    return false;
  });

  if (!hasNotes) {
    return <Redirect to="/" />;
  }
  return (
    <main className="note-page">
      <NoteNavigation />
      <NoteSection />
    </main>
  );
}

export default NotePage;
