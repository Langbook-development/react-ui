import { useDrag } from "react-dnd";
import { moveNote } from "../../../features/slices/notesSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";

export function useNoteDrag(ref, note, level) {
  const dispatch = useDispatch();
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
      end: ({ noteDragged, noteInitial }, monitor) => {
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          if (
            noteDragged.sortId === noteInitial.sortId &&
            noteDragged.parentId === noteInitial.parentId
          ) {
            return;
          }
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
      },
    }),
    [note, ref.current]
  );
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  function getMiddleY(ref) {
    if (ref.current) {
      const rect = ref.current?.getBoundingClientRect();
      const middleY = (rect.bottom - rect.top) / 2;
      return rect.top + middleY;
    }
  }

  return [isItemDragged, isDragInProgress, drag];
}
