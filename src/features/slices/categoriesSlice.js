import {createSlice} from '@reduxjs/toolkit'
import {INITIAL_STATE} from "../initialState";

const initialState = INITIAL_STATE.categories

const categorySlice = createSlice({
    name: 'categories',
    initialState
    // reducers: {
    //     noteSelected(notes, action) {
    //         notes.selectedNoteId = action.payload.id
    //     }
    // }
})

// export const { noteSelected } = notesSlice.actions

export default categorySlice.reducer

