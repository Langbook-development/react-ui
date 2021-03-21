import React from "react";
import NoteNavigation from "./note_navigation/NoteNavigation";
import NoteSection from "./note_content/NoteSection";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

function NotePage() {
  const { selectedNoteId } = useParams();
  const note = useSelector((state) => state.notes.byId[selectedNoteId]);

  if (!note) {
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
