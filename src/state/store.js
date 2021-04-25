import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./notes/notesSlice";

const store = configureStore({
  reducer: {
    notes: notesReducer,
    devTools: process.env.NODE_ENV !== "production",
    // categories: categoryReducer,
  },
});

export default store;
