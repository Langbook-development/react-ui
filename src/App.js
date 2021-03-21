import React from "react";
import NotePage from "./components/NotePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotePageEmpty from "./components/NotePageEmpty";

function App() {
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
