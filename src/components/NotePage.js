import React from "react";
import NoteNavigation from "./note_navigation/NoteNavigation";
import NoteSection from "./note_content/NoteSection";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { hasNotesSelector } from "../features/slices/selectors";

function NotePage() {
  const hasNotes = useSelector(hasNotesSelector);

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
