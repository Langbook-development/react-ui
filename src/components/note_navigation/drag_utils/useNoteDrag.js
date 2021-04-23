import { useDrag } from "react-dnd";
import { moveNote } from "../../../features/slices/notesSlice";
import { useDispatch } from "react-redux";

export function useNoteDrag(note) {
  const dispatch = useDispatch();
  const [{ isItemDragged, isDragInProgress }, drag] = useDrag(() => ({
    type: "CARD",
    item: {
      noteDragged: { ...note },
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
  }));
  return [isItemDragged, isDragInProgress, drag];
}
