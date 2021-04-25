import { useDrag } from "react-dnd";
import { moveNote } from "../../../features/slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { synchronizeNoteMovement } from "../../../features/slices/thunks";
import { isNoteMovementLoadingSelector } from "../../../features/slices/selectors";
import { getMiddleY } from "./positionUtils";

export function useNoteDrag(ref, note, level) {
  const dispatch = useDispatch();
  const isNoteMovementLoading = useSelector(isNoteMovementLoadingSelector);

  const [{ isItemDragged, isDragInProgress }, drag, preview] = useDrag(
    () => ({
      type: "NOTE",
      item: {
        level,
        noteWidth: ref.current?.clientWidth,
        noteDragged: { ...note, level, middleY: getMiddleY(ref) },
        noteInitial: { ...note },
      },
      collect: (monitor) => ({
        isDragInProgress: monitor.getItem() !== null,
        isItemDragged: monitor.getItem()?.noteDragged?.id === note.id,
        handlerId: monitor.getHandlerId(),
      }),
      canDrag: () => !isNoteMovementLoading,
      end: ({ noteDragged, noteInitial }, monitor) => {
        if (isPositionChanged(noteDragged, noteInitial)) {
          if (monitor.didDrop()) {
            dispatch(
              synchronizeNoteMovement({
                noteId: noteDragged.id,
                destinationParentId: noteDragged.parentId,
                destinationSortId: noteDragged.sortId,
              })
            );
          } else {
            dispatch(
              moveNote({
                noteId: noteDragged.id,
                destination: {
                  parentId: noteInitial.parentId,
                  sortId: noteInitial.sortId,
                },
              })
            );
          }
        }
      },
    }),
    [note, ref.current, isNoteMovementLoading]
  );
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  function isPositionChanged(noteDragged, noteInitial) {
    return (
      noteDragged.sortId !== noteInitial.sortId ||
      noteDragged.parentId !== noteInitial.parentId
    );
  }

  return [drag, isItemDragged, isDragInProgress];
}
