import React, { memo } from "react";
import { NoteNavigationItem } from "../NoteNavigationItem";
import { useSelector } from "react-redux";
import { noteSelector } from "../../../features/slices/selectors";

export const NoteDragPreview = memo(function (props) {
  const { noteId, level, width } = props;
  const note = useSelector(noteSelector(noteId));
  const propsToPass = {
    level,
    note,
    isDragInProgress: true,
    isNoteDragged: true,
  };
  return (
    <div style={{ width }} className="navigation-item-preview">
      <NoteNavigationItem {...propsToPass} />
    </div>
  );
});
