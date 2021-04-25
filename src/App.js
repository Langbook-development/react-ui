import React, { useEffect } from "react";
import NotePage from "./pages/notes/NotePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "./state/notes/thunks";
import { CustomDragLayer } from "./pages/notes/navigation/drag_utils/CustomDragLayer";

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
            <NotePage />
            <CustomDragLayer />
          </Route>
          <Route path="/notes/:selectedNoteId">
            <NotePage />
            <CustomDragLayer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
