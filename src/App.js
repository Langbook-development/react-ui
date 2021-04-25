import React, { useEffect } from "react";
import NotePage from "./pages/notes/NotePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteEmptyPage from "./pages/notes/NoteEmptyPage";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "./state/notes/thunks";
import { CustomDragLayer } from "./pages/notes/navigation/drag_utils/CustomDragLayer";
import { isNotesLoadedSelector } from "./state/notes/selectors";

function App() {
  const dispatch = useDispatch();
  const isNotesLoaded = useSelector(isNotesLoadedSelector);
  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <header />
        <Switch>
          <Route exact path="/">
            <NoteEmptyPage />
          </Route>
          <Route path="/notes/:selectedNoteId">
            {isNotesLoaded ? <NotePage /> : <NoteEmptyPage />}
            <CustomDragLayer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
