import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE_TREE } from "../initialState";

import { moveItemOnTree, mutateTree } from "@atlaskit/tree";

const initialState = INITIAL_STATE_TREE.notes;

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    noteExpanded(notes, action) {
      const itemId = action.payload.itemId;
      let noteNoExpand = notes.tree.items[itemId];
      while (noteNoExpand && noteNoExpand.id !== "root") {
        noteNoExpand.isExpanded = true;
        noteNoExpand = notes.tree.items[noteNoExpand.data.parentId];
      }
    },

    noteCollapsed(notes, action) {
      const itemId = action.payload.itemId;
      notes.tree = mutateTree(notes.tree, itemId, { isExpanded: false });
    },

    moveNote(notes, action) {
      const { source, destination } = action.payload;
      notes.tree = moveItemOnTree(notes.tree, source, destination);
    },

    createNote(notes, action) {
      const parentId = action.payload.parentId;
      const parentNote = notes.tree.items[parentId];
      const newId = "note-" + Math.floor(Math.random() * 10000);
      parentNote.children.push(newId);
      parentNote.isExpanded = true;
      notes.tree.items[newId] = {
        id: newId,
        children: [],
        hasChildren: false,
        isExpanded: true,
        data: {
          parentId: parentId,
          title: "Enter title",
          content: "Enter content",
          isTitleFresh: true,
          isContentFresh: true,
        },
      };
    },

    deleteNote(notes, action) {
      function deleteChildNotes(note, tree) {
        const childIds = note.children;
        const childNotes = childIds.map((it) => tree.items[it]);
        childNotes.forEach((childNote) => deleteChildNotes(childNote, tree));
        childNotes.forEach((childNote) => delete tree.items[childNote.id]);
      }

      const noteId = action.payload;
      const note = notes.tree.items[noteId];
      const parentNote = notes.tree.items[note.data.parentId];

      parentNote.children = parentNote.children.filter((it) => it !== noteId);
      parentNote.hasChildren = parentNote.children.length > 0;
      deleteChildNotes(note, notes.tree);
      delete notes.tree.items[noteId];
    },

    updateNote(notes, action) {
      const note = action.payload;
      const noteOld = notes.tree.items[note.id];
      notes.tree.items[note.id].data = {
        ...note.data,
        isTitleFresh:
          noteOld.data.isTitleFresh && note.data.title === noteOld.data.title,
        isContentFresh:
          noteOld.data.isContentFresh &&
          note.data.content === noteOld.data.content,
      };
    },
  },

  // extraReducers: {
  //   [createNote.fulfilled]: (notes, action) => {
  //     const note = {
  //       ...action.payload,
  //       isTitleFresh: true,
  //       isContentFresh: true,
  //     };
  //     const notesAdapter = new NotesAdapter(notes);
  //     notesAdapter.put(note);
  //     notesAdapter.expand(note.id);
  //   },
  //
  //   [getNotes.pending]: (notes) => {
  //     notes.isNotesLoaded = false;
  //   },
  //
  //   [getNotes.fulfilled]: (notes, action) => {
  //     const notesAdapter = new NotesAdapter(notes);
  //     notesAdapter.putAll(action.payload);
  //     notes.isNotesLoaded = true;
  //   },
  //
  //   [deleteNote.fulfilled]: (notes, action) => {
  //     const noteIdDeleted = action.payload.note.id;
  //     const noteIdsDeleted = action.payload.deletedIds;
  //     const notesAdapter = new NotesAdapter(notes);
  //     notesAdapter.shiftPullOut(noteIdDeleted);
  //     notesAdapter.deleteAll(noteIdsDeleted);
  //   },
  //
  //   [synchronizeNoteMovement.pending]: (notes) => {
  //     notes.isNoteMovementLoading = true;
  //   },
  //
  //   [synchronizeNoteMovement.fulfilled]: (notes) => {
  //     notes.isNoteMovementLoading = false;
  //   },
  // },
});

export const {
  noteExpanded,
  noteCollapsed,
  updateNote,
  moveNote,
  createNote,
  deleteNote,
} = notesSlice.actions;

export default notesSlice.reducer;
