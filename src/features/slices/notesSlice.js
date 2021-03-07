import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "../initialState";

const initialState = INITIAL_STATE.notes;

export const upsertNote = createAsyncThunk(
  "notes/upsert",
  async (note, thunkAPI) => {
    if (note.id) {
      return note;
    } else {
      const state = thunkAPI.getState();
      return {
        id: Math.max(...state.notes.allIds) + 1,
        title: "Enter title here",
        content: "Enter text here",
        childPageIds: [],
        parentId: note.parentId,
        isTitleFresh: true,
        isContentFresh: true,
      };
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (note, thunkAPI) => {
    return note;
  }
);

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
        notes.byId[note.id] = note;
      } else {
        notes.allIds.push(note.id);
        notes.byId[note.id] = note;
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

    [deleteNote.fulfilled]: (notes, action) => {
      const note = notes.byId[action.payload.id];
      notes.allIds = notes.allIds.filter((it) => it !== note.id);
      if (note.parentId) {
        notes.byId[note.parentId].childPageIds = notes.byId[
          note.parentId
        ].childPageIds.filter((it) => it !== note.id);
      }
      delete notes.byId[note.id];
    },
  },
});

export const { noteExpanded, noteCollapsed } = notesSlice.actions;

export default notesSlice.reducer;
