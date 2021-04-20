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

export const moveNoteUp = createAsyncThunk(
  "notes/moveUp",
  async (payload, thunkAPI) => {
    const { noteDragged, noteHoveredOn } = payload;
    console.log(
      "Note dragged. id:[" +
        noteDragged.id +
        "], sortId:[" +
        noteDragged.sortId +
        "], parentId:[" +
        noteDragged.payload +
        "]"
    );
    console.log(
      "Note hovered. id:[" +
        noteHoveredOn.id +
        "], sortId:[" +
        noteHoveredOn.sortId +
        "], parentId:[" +
        noteHoveredOn.payload +
        "]"
    );

    // const notes = thunkAPI.getState();
  }
);
