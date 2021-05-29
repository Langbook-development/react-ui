import React, { memo } from "react";
import { useSelector } from "react-redux";
import { childNotesSortedSelector } from "../../../state/notes/selectors";
import { NoteNavigationItem } from "./NoteNavigationItem";
import { Draggable, Droppable } from "react-beautiful-dnd";

export const NoteNavigationList = memo(function (props) {
  const { parentNoteId, level } = props;
  const notes = useSelector(childNotesSortedSelector(parentNoteId));
  return (
    <>
      {notes.map((note) => (
        <div key={note.id}>
          <NoteNavigationItem noteId={note.id} level={level} />
          {note.isExpanded && (
            <NoteNavigationList parentNoteId={note.id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
});
