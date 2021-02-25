import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "../initialState";

const initialState = INITIAL_STATE.notes;

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    noteSelected(notes, action) {
      notes.selectedNoteId = action.payload.id;
    },

    noteUpdated(notes, action) {
      const noteUpdated = action.payload;
      notes.byId[noteUpdated.id] = noteUpdated;
    },

    noteCreated(notes, action) {
      const id = Math.max(...notes.allIds) + 1;
      const newNote = {
        id: id,
        title: "Enter title here",
        content: "Enter text here",
        childPageIds: [],
        categoryId: action.payload.categoryId,
        parentId: action.payload.parentId,
        isTitleFresh: true,
        isContentFresh: true,
      };
      notes.allIds.push(id);
      notes.byId[id] = newNote;
      notes.selectedNoteId = id;
      if (newNote.parentId) {
        notes.byId[newNote.parentId].childPageIds.push(id);
      } else {
        notes.categories.byId[newNote.categoryId].childPageIds.push(id);
      }

      let noteToExpandId = newNote.parentId;
      while (noteToExpandId) {
        const noteToExpand = notes.byId[noteToExpandId];
        noteToExpand.isExpanded = true;
        noteToExpandId = noteToExpand.parentId;
      }
    },

    noteDeleted(notes, action) {
      const note = notes.byId[action.payload.id];
      if (note.parentId) {
        notes.byId[note.parentId].childPageIds = notes.byId[
          note.parentId
        ].childPageIds.filter((it) => it !== note.id);
        notes.selectedNoteId = note.parentId;
      } else {
        notes.categories.byId[
          note.categoryId
        ].childPageIds = notes.categories.byId[
          note.categoryId
        ].childPageIds.filter((it) => it !== note.id);
        notes.selectedNoteId =
          notes.categories.byId[note.categoryId].childPageIds[0];
      }
      notes.allIds = notes.allIds.filter((it) => it !== note.id);
      delete notes.byId[note.id];
    },

    noteExpanded(notes, action) {
      const noteId = action.payload;
      notes.byId[noteId].isExpanded = true;
    },

    noteCollapsed(notes, action) {
      const noteId = action.payload;
      notes.byId[noteId].isExpanded = false;
    },
  },
});

export const {
  noteSelected,
  noteUpdated,
  noteCreated,
  noteExpanded,
  noteCollapsed,
  noteDeleted,
} = notesSlice.actions;

export default notesSlice.reducer;
