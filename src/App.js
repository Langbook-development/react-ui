import React, { useEffect } from "react";
import NotePage from "./components/NotePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotePageEmpty from "./components/NotePageEmpty";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "./state/notes/thunks";
import { CustomDragLayer } from "./components/note_navigation/drag_utils/CustomDragLayer";
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
            <NotePageEmpty />
          </Route>
          <Route path="/notes/:selectedNoteId">
            {isNotesLoaded ? <NotePage /> : <NotePageEmpty />}
            <CustomDragLayer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
