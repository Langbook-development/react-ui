import React, { memo } from "react";
import { NoteNavigationItem } from "./NoteNavigationItem";

export const NoteDragPreview = memo(function (props) {
  const { noteId, level, width } = props;
  const propsToPass = {
    level,
    noteId,
    isDragInProgress: true,
    isNoteDragged: true,
  };
  return (
    <div style={{ width }} className="navigation-item-preview">
      <NoteNavigationItem {...propsToPass} />
    </div>
  );
});
