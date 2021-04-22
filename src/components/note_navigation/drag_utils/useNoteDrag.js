import { useDrag } from "react-dnd";
import { moveNote } from "../../../features/slices/notesSlice";
import { useDispatch } from "react-redux";

export function useNoteDrag(note) {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: {
      noteDragged: { ...note },
      noteInitial: { ...note },
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
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
        console.log("Before dispatch! useItemDrag");
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
  return [isDragging, drag];
}
