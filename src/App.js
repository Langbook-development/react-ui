import React, { useEffect } from "react";
import NotePage from "./pages/notes/NotePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getNotes } from "./state/notes/thunks";

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
          <Route exact path={["/", "/notes/:selectedNoteId"]}>
            <NotePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
