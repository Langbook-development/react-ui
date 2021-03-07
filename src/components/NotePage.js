import React from "react";
import NoteNavigation from "./note_navigation/NoteNavigation";
import NoteSection from "./note_content/NoteSection";
import { Route } from "react-router";

function NotePage() {
  return (
    <main className="note-page">
      <NoteNavigation />
      <Route path="/notes/:selectedNoteId">
        <NoteSection />
      </Route>
    </main>
  );
}

export default NotePage;
