import React, { useEffect } from "react";
import NoteNavigation from "./navigation/NoteNavigation";
import NoteSection from "./content/NoteSection";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useLocation } from "react-router-dom";
import {
  firstToShowCategorySelector,
  firstToShowNoteSelector,
  hasNotesSelector,
  isNotesLoadedSelector,
  noteSelector,
} from "../../state/selectors";
import { noteExpanded } from "../../state/notesSlice";
import { getNotes } from "../../state/thunks";

function NotePage() {
  const { pathname } = useLocation();
  const { selectedNoteId, selectedCategoryId } = useParams();
  const isNotesLoaded = useSelector(isNotesLoadedSelector);
  const hasNotes = useSelector(hasNotesSelector);
  const note = useSelector(noteSelector(selectedNoteId));
  const firstToShowCategoryId = useSelector(firstToShowCategorySelector);
  const firstToShowNoteId = useSelector(firstToShowNoteSelector);
  const dispatch = useDispatch();
  const hasLoadedNotes = isNotesLoaded && hasNotes;
  const noteExists = note !== undefined;

  useEffect(() => {
    if (isNotesLoaded && noteExists) {
      dispatch(noteExpanded(note.data.parentId));
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteExists, isNotesLoaded]);

  useEffect(() => {
    if (firstToShowCategoryId) {
      dispatch(getNotes(firstToShowCategoryId));
    }
  }, [dispatch, selectedCategoryId]);

  if (pathname === "/") {
    if (isNotesLoaded && hasNotes) {
      return (
        <Redirect
          to={
            "/categories/" +
            firstToShowCategoryId +
            "/notes/" +
            firstToShowNoteId
          }
        />
      );
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
