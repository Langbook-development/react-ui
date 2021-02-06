import {createSlice} from '@reduxjs/toolkit'
import {INITIAL_STATE} from "../initialState";

const initialState = INITIAL_STATE.notes

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        noteSelected(notes, action) {
            notes.selectedNoteId = action.payload.id
        }
    }
})

export const { noteSelected } = notesSlice.actions

export default notesSlice.reducer

