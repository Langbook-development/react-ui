import { createAsyncThunk } from "@reduxjs/toolkit";
import { NoteAPI } from "../../api/noteApi";

export const getNotes = createAsyncThunk("notes/get", async () => {
  return await NoteAPI.getNotes();
});

export const createNote = createAsyncThunk(
  "notes/upsert",
  async ({ parentId }) => {
    const note = {
      parentId: parentId,
      title: "Enter title here",
      content: "Enter text here",
    };
    return await NoteAPI.putNote(note);
  }
);

export const synchronizeNote = createAsyncThunk(
  "notes/synchronize",
  async (note, _) => {
    return await NoteAPI.putNote(note);
  }
);

export const deleteNote = createAsyncThunk("notes/delete", async (note) => {
  return await NoteAPI.deleteNote(note);
});
