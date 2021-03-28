import React, { useEffect } from "react";
import NotePage from "./components/NotePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotePageEmpty from "./components/NotePageEmpty";
import { useDispatch } from "react-redux";
import { getNotes } from "./features/slices/thunks";

function App() {
  const dispatch = useDispatch();
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
            <NotePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
