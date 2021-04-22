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
        const note = notes.byId[id];
        note.isExpanded = false;
        note.childPageIds.forEach((it) => collapseNote(it, notes));
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
      const withoutMovedId = (id) => id !== noteMoved.id;
      const { noteId, destination } = action.payload;
      const noteMoved = notes.byId[noteId];

      // Shift same deepness notes where note was removed
      const noteParentOld = notes.byId[noteMoved.parentId];
      noteParentOld.childPageIds.forEach((id) => {
        let noteToShift = notes.byId[id];
        noteToShift.sortId =
          noteToShift.sortId > noteMoved.sortId
            ? noteToShift.sortId - 1
            : noteToShift.sortId;
      });
      noteParentOld.childPageIds = noteParentOld.childPageIds.filter(
        withoutMovedId
      );

      // Shift same deepness notes where note will be placed
      const noteParentNew = notes.byId[destination.parentId];
      noteParentNew.childPageIds.forEach((id) => {
        let noteToShift = notes.byId[id];
        noteToShift.sortId =
          noteToShift.sortId >= destination.sortId
            ? noteToShift.sortId + 1
            : noteToShift.sortId;
      });
      noteParentNew.childPageIds.push(noteMoved.id);

      // Assign new coordinates no moved note
      noteMoved.sortId = destination.sortId;
      noteMoved.parentId = destination.parentId;
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
        notes.categoryIds = action.payload.categoryIds;
      });
    },

    [deleteNote.fulfilled]: (notes, action) => {
      const note = notes.byId[action.payload.note.id];
      const deletedIds = action.payload.deletedIds;

      function pullFromNotes(noteIds) {
        noteIds.forEach((id) => {
          let noteToShift = notes.byId[id];
          noteToShift.sortId =
            noteToShift.sortId > note.sortId
              ? noteToShift.sortId - 1
              : noteToShift.sortId;
        });
      }

      notes.allIds = notes.allIds.filter((id) => !deletedIds.includes(id));
      deletedIds.forEach((id) => delete notes.byId[id]);

      const withoutMovedId = (id) => id !== note.id;
      const parentId = note.parentId;
      if (parentId) {
        let noteParent = notes.byId[parentId];
        pullFromNotes(noteParent.childPageIds);
        noteParent.childPageIds = noteParent.childPageIds.filter(
          withoutMovedId
        );
      } else {
        pullFromNotes(notes.rootNoteIds);
        notes.rootNoteIds = notes.rootNoteIds.filter(withoutMovedId);
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
