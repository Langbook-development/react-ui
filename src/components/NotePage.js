import React from "react";
import NoteNavigation from "./note_navigation/NoteNavigation";
import NoteSection from "./note_content/NoteSection";
import { Route } from "react-router";
import { useSelector } from "react-redux";
import Switch from "react-bootstrap/Switch";
import { Redirect } from "react-router-dom";

function NotePage() {
  const firstNoteId = useSelector((state) => Math.min(...state.notes.allIds));

  return (
    <Switch>
      <main className="note-page">
        <Route path="/notes/:selectedNoteId">
          <NoteNavigation />
          <NoteSection />
        </Route>
        <Redirect to={"/notes/" + firstNoteId} />
      </main>
    </Switch>
  );
}

export default NotePage;
