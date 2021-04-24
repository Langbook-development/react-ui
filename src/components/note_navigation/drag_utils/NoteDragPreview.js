import React, { memo } from "react";
import { NoteNavigationItem } from "../NoteNavigationItem";

export const NoteDragPreview = memo(function (props) {
  const { noteId, level, width } = props;
  return (
    <div style={{ width }} className="navigation-item-preview">
      <NoteNavigationItem noteId={noteId} level={level} forceShow={true} />
    </div>
  );
});
