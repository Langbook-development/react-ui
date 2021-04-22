import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { moveNote } from "../../../features/slices/notesSlice";

export function useNoteDrop(ref, note) {
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop(
    () => ({
      accept: "CARD",
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover({ noteDragged }, monitor) {
        if (!ref.current || noteDragged.id === note.id) {
          return;
        }
        if (!noteDragged.placeholderY) {
          noteDragged.placeholderY = monitor.getInitialClientOffset().y;
        }

        const hoveredRect = ref.current?.getBoundingClientRect();
        const hoveredMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
        const mouseY = monitor.getClientOffset().y;
        const mouseHoveredY = mouseY - hoveredRect.top;

        const isMovingUp = mouseY < noteDragged.placeholderY;
        const isMovingDown = !isMovingUp;
        const aboveMiddle = mouseHoveredY < hoveredMiddleY;
        const belowMiddle = !aboveMiddle;
        const absoluteHoveredMiddleY = hoveredRect.top + hoveredMiddleY;

        if ((isMovingUp && aboveMiddle) || (isMovingDown && belowMiddle)) {
          dispatch(
            moveNote({
              noteId: noteDragged.id,
              destination: {
                parentId: note.parentId,
                sortId: note.sortId,
              },
            })
          );
          noteDragged.parentId = note.parentId;
          noteDragged.sortId = note.sortId;
          noteDragged.placeholderY = absoluteHoveredMiddleY;
        }
      },
    }),
    [note]
  );
  return [handlerId, drop];
}
