import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "../initialState";

const initialState = INITIAL_STATE.notes;

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
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
        parentId: action.payload.parentId,
        isTitleFresh: true,
        isContentFresh: true,
      };
      notes.allIds.push(id);
      notes.byId[id] = newNote;
      if (newNote.parentId) {
        notes.byId[newNote.parentId].childPageIds.push(id);
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
      notes.allIds = notes.allIds.filter((it) => it !== note.id);
      if (note.parentId) {
        notes.byId[note.parentId].childPageIds = notes.byId[
          note.parentId
        ].childPageIds.filter((it) => it !== note.id);
      }
      delete notes.byId[note.id];
    },

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
});

export const {
  noteUpdated,
  noteCreated,
  noteExpanded,
  noteCollapsed,
  noteDeleted,
} = notesSlice.actions;

export default notesSlice.reducer;
