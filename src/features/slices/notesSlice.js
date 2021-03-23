import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE_EMPTY } from "../initialState";
import { deleteNote, getNotes, upsertNote } from "./thunks";

const initialState = INITIAL_STATE_EMPTY.notes;

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    noteExpanded(notes, action) {
      const noteId = action.payload;
      notes.byId[noteId].isExpanded = true;
    },

    noteCollapsed(notes, action) {
      function collapseNote(id, notes) {
        notes.byId[id].isExpanded = false;
        notes.byId[id].childPageIds.forEach((it) => collapseNote(it, notes));
      }

      collapseNote(action.payload, notes);
    },
  },

  extraReducers: {
    [upsertNote.fulfilled]: (notes, action) => {
      const note = action.payload;
      if (notes.allIds.includes(note.id)) {
        const noteOld = notes.byId[note.id];
        notes.byId[note.id] = {
          ...note,
          isTitleFresh: noteOld.isTitleFresh && note.title === noteOld.title,
          isContentFresh:
            noteOld.isContentFresh && note.content === noteOld.content,
        };
      } else {
        notes.allIds.push(note.id);
        notes.byId[note.id] = {
          ...note,
          isTitleFresh: true,
          isContentFresh: true,
        };
        if (note.parentId) {
          notes.byId[note.parentId].childPageIds.push(note.id);
        }
        let noteToExpandId = note.parentId;
        while (noteToExpandId) {
          const noteToExpand = notes.byId[noteToExpandId];
          noteToExpand.isExpanded = true;
          noteToExpandId = noteToExpand.parentId;
        }
      }
    },

    [getNotes.fulfilled]: (notes, action) => {
      action.payload.forEach((note) => {
        notes.byId[note.id] = {
          ...note,
          isExpanded: false,
          isTitleFresh: false,
          isContentFresh: false,
        };
        notes.allIds.push(note.id);
      });
    },

    [deleteNote.fulfilled]: (notes, action) => {
      function deleteChildNote(note) {
        notes.allIds = notes.allIds.filter((it) => it !== note.id);
        note.childPageIds.forEach((childNoteId) =>
          deleteChildNote(notes.byId[childNoteId])
        );
        delete notes.byId[note.id];
      }

      const note = notes.byId[action.payload.id];
      if (note.parentId) {
        notes.byId[note.parentId].childPageIds = notes.byId[
          note.parentId
        ].childPageIds.filter((it) => it !== note.id);
      }
      deleteChildNote(note);
      console.log("11");
    },
  },
});

export const { noteExpanded, noteCollapsed } = notesSlice.actions;

export default notesSlice.reducer;
