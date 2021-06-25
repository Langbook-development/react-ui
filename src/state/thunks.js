import { createAsyncThunk } from "@reduxjs/toolkit";
import { NoteAPI } from "../api/noteApi";

export const getNotes = createAsyncThunk("notes/get", async (categoryId) => {
  return await NoteAPI.getNotes(categoryId);
});

const createNote = createAsyncThunk("notes/upsert", async ({ parentId }) => {
  const note = {
    parentId: parentId,
    title: "Enter title here",
    content: "Enter text here",
  };
  return await NoteAPI.putNote(note);
});

export const synchronizeNote = createAsyncThunk(
  "notes/synchronize",
  async ({ categoryId, note }, _) => {
    return await NoteAPI.putNote(categoryId, note);
  }
);

export const deleteNote = createAsyncThunk(
  "notes/delete",
  async ({ categoryId, noteId }) => {
    return await NoteAPI.deleteNote(categoryId, noteId);
  }
);

export const synchronizeNoteMovement = createAsyncThunk(
  "notes/synchronizeMovement",
  async ({ categoryId, source, destination }) => {
    return await NoteAPI.moveNote(categoryId, source, destination);
  }
);
