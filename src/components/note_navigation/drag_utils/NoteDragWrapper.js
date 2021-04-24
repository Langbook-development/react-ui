import React, { useEffect, useRef } from "react";
import { useNoteDrop } from "./useNoteDrop";
import { useNoteDrag } from "./useNoteDrag";
import { useDispatch, useSelector } from "react-redux";
import { noteSelector } from "../../../features/slices/selectors";
import { noteCollapsed } from "../../../features/slices/notesSlice";

export const NoteDragWrapper = (props) => {
  const { noteId, level } = props;
  const note = useSelector(noteSelector(noteId));
  const dispatch = useDispatch();

  const ref = useRef(null);
  const [handlerId, drop] = useNoteDrop(ref, note, level);
  const [isNoteDragged, isDragInProgress, drag] = useNoteDrag(ref, note, level);

  useEffect(() => {
    if (note.isExpanded && isNoteDragged) {
      dispatch(noteCollapsed(note.id));
    }
  }, [note, isNoteDragged, dispatch]);

  return (
    <div ref={drag(drop(ref))} data-handler-id={handlerId}>
      {isNoteDragged && <div className="navigation-item-placeholder" />}
      {!isNoteDragged &&
        React.cloneElement(props.children, {
          isNoteDragged,
          isDragInProgress,
        })}
    </div>
  );
};
