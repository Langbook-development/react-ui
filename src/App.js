import React from "react";
import NotePage from "./components/NotePage";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header />
        <div className="page">
          <NotePage />
        </div>
      </div>
    </Router>
  );
}

export default App;
