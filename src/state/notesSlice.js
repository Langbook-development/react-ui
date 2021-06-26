import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE_EMPTY } from "./initialState";

import { moveItemOnTree, mutateTree } from "@atlaskit/tree";
import {
  getNotes,
  synchronizeNoteMovement,
  deleteNote,
  createNote,
} from "./thunks";

const initialState = INITIAL_STATE_EMPTY.notes;

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    noteExpanded(notes, action) {
      const itemId = action.payload;
      let noteNoExpand = notes.tree.items[itemId];
      while (noteNoExpand && noteNoExpand.id !== "root") {
        noteNoExpand.isExpanded = true;
        noteNoExpand = notes.tree.items[noteNoExpand.data.parentId];
      }
    },

    noteCollapsed(notes, action) {
      const itemId = action.payload;
      notes.tree = mutateTree(notes.tree, itemId, { isExpanded: false });
    },

    // createNote(notes, action) {
    //   const parentId = action.payload.parentId;
    //   const parentNote = notes.tree.items[parentId];
    //   const newId = "note-" + Math.floor(Math.random() * 10000);
    //   parentNote.children.push(newId);
    //   parentNote.isExpanded = true;
    //   notes.tree.items[newId] = {
    //     id: newId,
    //     children: [],
    //     hasChildren: false,
    //     isExpanded: true,
    //     data: {
    //       parentId: parentId,
    //       title: "Enter title",
    //       content: "Enter content",
    //       isTitleFresh: true,
    //       isContentFresh: true,
    //     },
    //   };
    // },

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

  extraReducers: {
    [createNote.fulfilled]: (notes, action) => {
      const noteId = action.payload.note.id;
      const parentNoteId = action.payload.parentNote.id;
      const note = {
        id: noteId,
        children: action.payload.note.childPageIds,
        hasChildren: action.payload.note.childPageIds.length > 0,
        isExpanded: true,
        data: {
          parentId: parentNoteId,
          title: action.payload.note.title,
          content: action.payload.note.content,
          isTitleFresh: true,
          isContentFresh: true,
        },
      };
      notes.tree.items[noteId] = note;
      notes.tree.items[parentNoteId].children =
        action.payload.parentNote.childPageIds;
      notes.tree.items[parentNoteId].hasChildren =
        action.payload.parentNote.childPageIds.length > 0;
      let noteNoExpand = notes.tree.items[note.id];
      while (noteNoExpand && noteNoExpand.id !== "root") {
        noteNoExpand.isExpanded = true;
        noteNoExpand = notes.tree.items[noteNoExpand.data.parentId];
      }
    },

    [getNotes.pending]: (notes) => {
      notes.isNotesLoaded = false;
    },

    [getNotes.fulfilled]: (notes, action) => {
      notes.isNotesLoaded = true;

      action.payload.notes.forEach((it) => {
        notes.tree.items[it.id] = {
          id: it.id,
          children: it.childPageIds,
          hasChildren: it.childPageIds.length > 0,
          isExpanded: false,
          data: {
            parentId: it.parentId,
            title: it.title,
            content: it.content,
            isTitleFresh: false,
            isContentFresh: false,
          },
        };
      });
    },

    [deleteNote.fulfilled]: (notes, action) => {
      const noteId = action.payload.note.id;
      const note = notes.tree.items[noteId];
      const parentNote = notes.tree.items[note.data.parentId];
      const noteIdsDeleted = action.payload.deletedIds;
      parentNote.children = parentNote.children.filter(
        (it) => it.toString() !== noteId
      );
      parentNote.hasChildren = parentNote.children.length > 0;
      noteIdsDeleted.forEach((id) => {
        delete notes.tree.items[id.toString()];
      });
    },

    [synchronizeNoteMovement.pending]: (notes, action) => {
      const { source, destination } = action.meta.arg;
      notes.tree = moveItemOnTree(notes.tree, source, destination);
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
