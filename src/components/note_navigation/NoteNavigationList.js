import React, { memo } from "react";
import { useSelector } from "react-redux";
import { childNotesSortedSelector } from "../../features/slices/selectors";
import { NoteDragWrapper } from "./drag_utils/NoteDragWrapper";

export const NoteNavigationList = memo(function (props) {
  const { parentNoteId, level } = props;
  const notes = useSelector(childNotesSortedSelector(parentNoteId));
  return (
    <>
      {notes.map((note) => (
        <div key={note.id}>
          <NoteDragWrapper noteId={note.id} level={level} />
          {note.isExpanded && (
            <NoteNavigationList parentNoteId={note.id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
});
