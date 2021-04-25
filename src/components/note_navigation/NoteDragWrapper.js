import React, { useEffect, useRef } from "react";
import { useNoteDrop } from "./drag_utils/useNoteDrop";
import { useNoteDrag } from "./drag_utils/useNoteDrag";
import { useDispatch, useSelector } from "react-redux";
import { noteSelector } from "../../state/notes/selectors";
import { noteCollapsed } from "../../state/notes/notesSlice";

export const NoteDragWrapper = (props) => {
  const { noteId, level } = props;
  const note = useSelector(noteSelector(noteId));
  const dispatch = useDispatch();

  const ref = useRef(null);
  const [drop, handlerId] = useNoteDrop(ref, note, level);
  const [drag, isNoteDragged, isDragInProgress] = useNoteDrag(ref, note, level);

  useEffect(() => {
    if (note.isExpanded && isNoteDragged) {
      dispatch(noteCollapsed(note.id));
    }
  }, [note, isNoteDragged, dispatch]);

  return (
    <div ref={drag(drop(ref))} data-handler-id={handlerId}>
      {isNoteDragged ? (
        <div className="navigation-item-placeholder" />
      ) : (
        React.cloneElement(props.children, {
          isNoteDragged,
          isDragInProgress,
        })
      )}
    </div>
  );
};
