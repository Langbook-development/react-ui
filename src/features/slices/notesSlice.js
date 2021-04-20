import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE_EMPTY } from "../initialState";
import { createNote, deleteNote, getNotes } from "./thunks";

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

    updateNote(notes, action) {
      const note = action.payload;
      const noteOld = notes.byId[note.id];
      notes.byId[note.id] = {
        ...note,
        isTitleFresh: noteOld.isTitleFresh && note.title === noteOld.title,
        isContentFresh:
          noteOld.isContentFresh && note.content === noteOld.content,
      };
    },

    moveNote(notes, action) {
      const { noteId, destination } = action.payload;
      const { destinationParentId, destinationSortId } = destination;

      const note = notes.byId[noteId];

      // Remove note from it's parent
      if (note.parentId) {
        notes.byId[note.parentId].childPageIds.forEach((noteIdSameParent) => {
          if (notes.byId[noteIdSameParent].sortId > note.sortId) {
            notes.byId[noteIdSameParent].sortId =
              notes.byId[noteIdSameParent].sortId - 1;
          }
        });
        notes.byId[note.parentId].childPageIds = notes.byId[
          note.parentId
        ].childPageIds.filter((it) => it !== noteId);
      } else {
        notes.rootNoteIds.forEach((noteIdSameParent) => {
          if (notes.byId[noteIdSameParent].sortId > note.sortId) {
            notes.byId[noteIdSameParent].sortId =
              notes.byId[noteIdSameParent].sortId - 1;
          }
        });
        notes.rootNoteIds = notes.rootNoteIds.filter((id) => id !== noteId);
      }
      // Add note to new parent
      if (destinationParentId) {
        notes.byId[destinationParentId].childPageIds.forEach(
          (noteIdSameParent) => {
            if (notes.byId[noteIdSameParent].sortId >= destinationSortId) {
              notes.byId[noteIdSameParent].sortId =
                notes.byId[noteIdSameParent].sortId + 1;
            }
          }
        );
        notes.byId[destinationParentId].childPageIds.push(note.id);
      } else {
        notes.rootNoteIds.forEach((noteIdSameParent) => {
          if (notes.byId[noteIdSameParent].sortId >= destinationSortId) {
            notes.byId[noteIdSameParent].sortId =
              notes.byId[noteIdSameParent].sortId + 1;
          }
        });
        notes.rootNoteIds.push(noteId);
      }
      notes.byId[note.id].sortId = destinationSortId;
      notes.byId[note.id].parentId = destinationParentId;
    },
  },

  extraReducers: {
    [createNote.fulfilled]: (notes, action) => {
      const note = action.payload;
      notes.allIds.push(note.id);
      notes.byId[note.id] = {
        ...note,
        isTitleFresh: true,
        isContentFresh: true,
      };
      if (note.parentId) {
        notes.byId[note.parentId].childPageIds.push(note.id);
      } else {
        notes.rootNoteIds.push(note.id);
      }
      let noteToExpandId = note.parentId;
      while (noteToExpandId) {
        const noteToExpand = notes.byId[noteToExpandId];
        noteToExpand.isExpanded = true;
        noteToExpandId = noteToExpand.parentId;
      }
    },

    [getNotes.fulfilled]: (notes, action) => {
      action.payload.notes.forEach((note) => {
        notes.byId[note.id] = {
          ...note,
          isExpanded: false,
          isTitleFresh: false,
          isContentFresh: false,
        };
        notes.allIds.push(note.id);
        notes.rootNoteIds = action.payload.rootNoteIds;
      });
    },

    [deleteNote.fulfilled]: (notes, action) => {
      const note = notes.byId[action.payload.note.id];
      const deletedIds = action.payload.deletedIds;

      notes.allIds = notes.allIds.filter((id) => !deletedIds.includes(id));
      deletedIds.forEach((id) => delete notes.byId[id]);

      const parentId = note.parentId;
      if (parentId) {
        notes.byId[parentId].childPageIds = notes.byId[
          parentId
        ].childPageIds.filter((it) => it !== note.id);
        notes.byId[parentId].childPageIds.forEach((id) => {
          if (notes.byId[id].sortId > note.sortId) {
            notes.byId[id].sortId = notes.byId[id].sortId - 1;
          }
        });
      } else {
        notes.rootNoteIds = notes.rootNoteIds.filter((it) => it !== note.id);
        notes.rootNoteIds.forEach((id) => {
          if (notes.byId[id].sortId > note.sortId) {
            notes.byId[id].sortId = notes.byId[id].sortId - 1;
          }
        });
      }
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
