import React, { useEffect } from "react";
import NoteNavigation from "./navigation/NoteNavigation";
import NoteSection from "./content/NoteSection";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useLocation } from "react-router-dom";
import {
  firstToShowNoteSelector,
  hasNotesSelector,
  isNotesLoadedSelector,
  noteSelector,
} from "../../state/notes/selectors";
import { noteExpanded } from "../../state/notes/notesSlice";

function NotePage() {
  const { pathname } = useLocation();
  const { selectedNoteId } = useParams();
  const isNotesLoaded = useSelector(isNotesLoadedSelector);
  const hasNotes = useSelector(hasNotesSelector);
  const note = useSelector(noteSelector(selectedNoteId));
  const firstToShowNoteId = useSelector(firstToShowNoteSelector);
  const dispatch = useDispatch();
  const hasLoadedNotes = isNotesLoaded && hasNotes;
  const noteExists = note !== undefined;

  useEffect(() => {
    if (noteExists) {
      dispatch(noteExpanded(note.parentId));
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteExists]);

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
