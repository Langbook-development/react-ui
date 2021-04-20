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
      const noteMoved = notes.byId[noteId];

      function pullFromParentNotes() {
        const noteParent = notes.byId[noteMoved.parentId];
        pullFromNotes(noteParent.childPageIds);
        noteParent.childPageIds = noteParent.childPageIds.filter(
          (it) => it !== noteMoved.id
        );
      }

      function pullFromRootNotes() {
        pullFromNotes(notes.rootNoteIds);
        notes.rootNoteIds = notes.rootNoteIds.filter(
          (id) => id !== noteMoved.id
        );
      }

      function pullFromNotes(noteIds) {
        noteIds.forEach((id) => {
          let note = notes.byId[id];
          note.sortId =
            note.sortId > noteMoved.sortId ? note.sortId - 1 : note.sortId;
        });
      }

      function pushParentNotes() {
        const noteParentNew = notes.byId[destination.parentId];
        noteParentNew.childPageIds.forEach((id) => {
          let note = notes.byId[id];
          note.sortId =
            note.sortId >= destination.sortId ? note.sortId + 1 : note.sortId;
        });
        noteParentNew.childPageIds.push(noteMoved.id);
      }

      function pushRootNotes() {
        notes.rootNoteIds.forEach((id) => {
          let note = notes.byId[id];
          note.sortId =
            note.sortId >= destination.sortId ? note.sortId + 1 : note.sortId;
        });
        notes.rootNoteIds.push(noteMoved.id);
      }

      if (noteMoved.parentId) {
        pullFromParentNotes();
      } else {
        pullFromRootNotes();
      }
      if (destination.parentId) {
        pushParentNotes();
      } else {
        pushRootNotes();
      }
      notes.byId[noteMoved.id].sortId = destination.sortId;
      notes.byId[noteMoved.id].parentId = destination.parentId;
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
