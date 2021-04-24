import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE_EMPTY } from "../initialState";
import {
  createNote,
  deleteNote,
  getNotes,
  synchronizeNoteMovement,
} from "./thunks";
import { NotesAdapter } from "../utils/NotesAdapter";

const initialState = INITIAL_STATE_EMPTY.notes;

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    noteExpanded(notes, action) {
      const notesAdapter = new NotesAdapter(notes);
      notesAdapter.expand(action.payload);
    },

    noteCollapsed(notes, action) {
      const noteId = action.payload;
      const notesAdapter = new NotesAdapter(notes);
      notesAdapter.collapse(noteId);
    },

    updateNote(notes, action) {
      const noteAdapter = new NotesAdapter(notes);
      noteAdapter.update(action.payload);
    },

    moveNote(notes, action) {
      const { noteId, destination } = action.payload;
      const { sortId, parentId } = destination;
      const notesAdapter = new NotesAdapter(notes);
      notesAdapter.shiftPullOut(noteId);
      notesAdapter.shiftPush(noteId, sortId, parentId);
      notesAdapter.changePositionOf(noteId, sortId, parentId);
    },
  },

  extraReducers: {
    [createNote.fulfilled]: (notes, action) => {
      const note = {
        ...action.payload,
        isTitleFresh: true,
        isContentFresh: true,
      };
      const notesAdapter = new NotesAdapter(notes);
      notesAdapter.put(note);
      notesAdapter.expand(note.id);
    },

    [getNotes.fulfilled]: (notes, action) => {
      const notesAdapter = new NotesAdapter(notes);
      notesAdapter.putAll(action.payload);
    },

    [deleteNote.fulfilled]: (notes, action) => {
      const noteIdDeleted = action.payload.note.id;
      const noteIdsDeleted = action.payload.deletedIds;
      const notesAdapter = new NotesAdapter(notes);
      notesAdapter.shiftPullOut(noteIdDeleted);
      notesAdapter.deleteAll(noteIdsDeleted);
    },

    [synchronizeNoteMovement.pending]: (notes) => {
      console.log("Notes moved pending!");
      notes.isNoteMovementLoading = true;
    },

    [synchronizeNoteMovement.fulfilled]: (notes) => {
      notes.isNoteMovementLoading = false;
    },
  },
});

export const {
  noteExpanded,
  noteCollapsed,
  updateNote,
  moveNote,
} = notesSlice.actions;

export default notesSlice.reducer;
