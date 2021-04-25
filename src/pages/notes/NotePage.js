import React, { useEffect } from "react";
import NoteNavigation from "./navigation/NoteNavigation";
import NoteSection from "./content/NoteSection";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { noteExistsSelector } from "../../state/notes/selectors";
import { noteExpanded } from "../../state/notes/notesSlice";

function NotePage() {
  const { selectedNoteId } = useParams();
  const noteExists = useSelector(noteExistsSelector(selectedNoteId));
  const dispatch = useDispatch();

  useEffect(() => {
    if (noteExists) {
      dispatch(noteExpanded(selectedNoteId));
    }
  }, []);

  if (!noteExists) {
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
