import React from "react";
import NoteNavigation from "./components/note_navigation/NoteNavigation";
import NoteSection from "./components/content/NoteSection";

function App() {
  return (
    <div className="App">
      <nav className="navbar mb-5"/>
      <main className="container">
        <div className="row">
          <div className="col-3">
            <NoteNavigation />
          </div>
          <div className="col-9">
            <NoteSection />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
