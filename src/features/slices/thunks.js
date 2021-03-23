import { createAsyncThunk } from "@reduxjs/toolkit";
import { NoteAPI } from "../../api/noteApi";

export const getNotes = createAsyncThunk("notes/get", async () => {
  return await NoteAPI.getNotes();
});

export const upsertNote = createAsyncThunk("notes/upsert", async (note, _) => {
  return await NoteAPI.putNote(note);
});

export const deleteNote = createAsyncThunk("notes/delete", async (note) => {
  return await NoteAPI.deleteNote(note);
});
