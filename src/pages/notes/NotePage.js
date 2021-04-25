import React, { useEffect } from "react";
import NoteNavigation from "./navigation/NoteNavigation";
import NoteSection from "./content/NoteSection";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useLocation } from "react-router-dom";
import {
  firstToShowNoteSelector,
  hasNotesSelector,
  isNotesLoadedSelector,
  noteExistsSelector,
} from "../../state/notes/selectors";
import { noteExpanded } from "../../state/notes/notesSlice";

function NotePage() {
  const { pathname } = useLocation();
  const { selectedNoteId } = useParams();
  const isNotesLoaded = useSelector(isNotesLoadedSelector);
  const hasNotes = useSelector(hasNotesSelector);
  const noteExists = useSelector(noteExistsSelector(selectedNoteId));
  const firstToShowNoteId = useSelector(firstToShowNoteSelector);
  const dispatch = useDispatch();
  const hasLoadedNotes = isNotesLoaded && hasNotes;

  useEffect(() => {
    if (noteExists) {
      dispatch(noteExpanded(selectedNoteId));
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pathname === "/") {
    if (isNotesLoaded && hasNotes) {
      return <Redirect to={"/notes/" + firstToShowNoteId} />;
    }
  } else {
    if (isNotesLoaded && (!noteExists || !hasNotes)) {
      return <Redirect to="/" />;
    }
  }
  return (
    <main className="note-page">
      <NoteNavigation />
      {hasLoadedNotes ? <NoteSection /> : <div />}
    </main>
  );
}

export default NotePage;
