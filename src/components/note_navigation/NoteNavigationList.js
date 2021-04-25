import React, { memo } from "react";
import { useSelector } from "react-redux";
import { childNotesSortedSelector } from "../../state/notes/selectors";
import { NoteDragWrapper } from "./NoteDragWrapper";
import { NoteNavigationItem } from "./NoteNavigationItem";

export const NoteNavigationList = memo(function (props) {
  const { parentNoteId, level } = props;
  const notes = useSelector(childNotesSortedSelector(parentNoteId));
  return (
    <>
      {notes.map((note) => (
        <div key={note.id}>
          <NoteDragWrapper noteId={note.id} level={level}>
            <NoteNavigationItem noteId={note.id} level={level} />
          </NoteDragWrapper>
          {note.isExpanded && (
            <NoteNavigationList parentNoteId={note.id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
});
