import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./slices/notesSlice";

const store = configureStore({
  reducer: {
    notes: notesReducer,
    // categories: categoryReducer,
  },
});

export default store;
