import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE_EMPTY } from "./initialState";

import {
  getNotes,
  synchronizeNoteMovement,
  deleteNote,
  createNote,
} from "./thunks";
import { NotesAdapter } from "./utils/NotesAdapter";

const initialState = INITIAL_STATE_EMPTY.notes;

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    noteExpanded(notes, action) {
      const noteId = action.payload;
      const adapter = new NotesAdapter(notes);
      adapter.expand(noteId);
    },

    noteCollapsed(notes, action) {
      const noteId = action.payload;
      const adapter = new NotesAdapter(notes);
      adapter.collapse(noteId);
    },

    updateNote(notes, action) {
      const note = action.payload;
      const adapter = new NotesAdapter(notes);
      adapter.update(note);
    },
  },

  extraReducers: {
    [createNote.fulfilled]: (notes, action) => {
      const noteDto = action.payload.note;
      const parentNoteDto = action.payload.parentNote;
      const adapter = new NotesAdapter(notes);
      adapter.put(noteDto);
      adapter.setChildren(noteDto);
      adapter.setChildren(parentNoteDto);
      adapter.makeFresh(noteDto.id);
      adapter.expand(noteDto.id);
    },

    [getNotes.pending]: (notes) => {
      notes.isNotesLoaded = false;
    },

    [getNotes.fulfilled]: (notes, action) => {
      notes.isNotesLoaded = true;
      const noteDtos = action.payload.notes;
      const adapter = new NotesAdapter(notes);
      noteDtos.forEach((noteDto) => {
        adapter.put(noteDto);
        adapter.setChildren(noteDto);
      });
    },

    [deleteNote.fulfilled]: (notes, action) => {
      const noteId = action.payload.note.id;
      const noteIdsDeleted = action.payload.deletedIds;
      const adapter = new NotesAdapter(notes);
      adapter.removeChild(noteId);
      adapter.deleteAll(noteIdsDeleted);
    },

    [synchronizeNoteMovement.pending]: (notes, action) => {
      const { source, destination } = action.meta.arg;
      const adapter = new NotesAdapter(notes);
      adapter.moveNote(source, destination);
      notes.isNoteMovementLoading = true;
    },

    [synchronizeNoteMovement.fulfilled]: (notes, action) => {
      notes.isNoteMovementLoading = false;
    },
  },
});

export const { noteExpanded, noteCollapsed, updateNote, moveNote } =
  notesSlice.actions;

export default notesSlice.reducer;
