import React from "react";
import NoteNavigation from "./note_navigation/NoteNavigation";
import NoteSection from "./note_content/NoteSection";

function NotePage() {
  return (
    <>
      <div className="row">
        <div className="col-4">
          <NoteNavigation />
        </div>
        <div className="col-8">
          <NoteSection />
        </div>
      </div>
    </>
  );
}

export default NotePage;
