import React from "react";
import NotePage from "./pages/notes/NotePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header />
        <Switch>
          <Route
            exact
            path={[
              "/",
              "/categories/:selectedCategoryId/notes/:selectedNoteId",
            ]}
          >
            <NotePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
