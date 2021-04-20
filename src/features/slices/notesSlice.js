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

      const withoutMovedId = (id) => id !== noteMoved.id;

      function shiftPulledNotes(noteIds) {
        noteIds.forEach((id) => {
          let noteToShift = notes.byId[id];
          noteToShift.sortId =
            noteToShift.sortId > noteMoved.sortId
              ? noteToShift.sortId - 1
              : noteToShift.sortId;
        });
      }

      function shiftPushedNotes(noteIds) {
        noteIds.forEach((id) => {
          let noteToShift = notes.byId[id];
          noteToShift.sortId =
            noteToShift.sortId >= destination.sortId
              ? noteToShift.sortId + 1
              : noteToShift.sortId;
        });
      }

      // Shift same deepness notes where note was removed
      if (noteMoved.parentId) {
        // Taken from parent note
        const noteParentOld = notes.byId[noteMoved.parentId];
        shiftPulledNotes(noteParentOld.childPageIds);
        noteParentOld.childPageIds = noteParentOld.childPageIds.filter(
          withoutMovedId
        );
      } else {
        // Taken from root
        shiftPulledNotes(notes.rootNoteIds);
        notes.rootNoteIds = notes.rootNoteIds.filter(withoutMovedId);
      }
      // Shift same deepness notes where note will be placed
      if (destination.parentId) {
        // Placed to parent note
        const noteParentNew = notes.byId[destination.parentId];
        shiftPushedNotes(noteParentNew.childPageIds);
        noteParentNew.childPageIds.push(noteMoved.id);
      } else {
        // Placed to root
        shiftPushedNotes(notes.rootNoteIds);
        notes.rootNoteIds.push(noteMoved.id);
      }
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
        notes.rootNoteIds = action.payload.rootNoteIds;
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

      const parentId = note.parentId;
      if (parentId) {
        let noteParent = notes.byId[parentId];
        pullFromNotes(noteParent.childPageIds);
        noteParent.childPageIds = noteParent.childPageIds.filter(
          (it) => it !== note.id
        );
      } else {
        pullFromNotes(notes.rootNoteIds);
        notes.rootNoteIds = notes.rootNoteIds.filter((it) => it !== note.id);
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
