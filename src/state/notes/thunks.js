import { createAsyncThunk } from "@reduxjs/toolkit";
import { NoteAPI } from "../../api/noteApi";

const getNotes = createAsyncThunk("notes/get", async () => {
  return await NoteAPI.getNotes();
});

const createNote = createAsyncThunk("notes/upsert", async ({ parentId }) => {
  const note = {
    parentId: parentId,
    title: "Enter title here",
    content: "Enter text here",
  };
  return await NoteAPI.putNote(note);
});

const synchronizeNote = createAsyncThunk(
  "notes/synchronize",
  async (note, _) => {
    return await NoteAPI.putNote(note);
  }
);

const deleteNote = createAsyncThunk("notes/delete", async (note) => {
  return await NoteAPI.deleteNote(note);
});

const synchronizeNoteMovement = createAsyncThunk(
  "notes/synchronizeMovement",
  async (request) => {
    return await NoteAPI.moveNote(request);
  }
);
