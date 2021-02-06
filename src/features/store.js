import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./slices/notesSlice";
import categoryReducer from "./slices/categoriesSlice";

const store = configureStore({
  reducer: {
    notes: notesReducer,
    categories: categoryReducer,
  },
});

export default store;
