import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { moveNote } from "../../../features/slices/notesSlice";

export function useNoteDrop(ref, note, level) {
  const dispatch = useDispatch();
  const [{ handlerId }, drop] = useDrop(
    () => ({
      accept: "NOTE",
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover({ noteDragged }, monitor) {
        if (!ref.current || noteDragged.id === note.id) {
          return;
        }
        const hoveredRect = ref.current?.getBoundingClientRect();
        const hoveredMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
        const mouseY = monitor.getClientOffset().y;
        const mouseHoveredY = mouseY - hoveredRect.top;
        const absoluteHoveredMiddleY = hoveredRect.top + hoveredMiddleY;
        const quarter = (hoveredRect.bottom - hoveredRect.top) / 4;
        const isMovingUp = mouseY < noteDragged.middleY;
        const isMovingDown = !isMovingUp;
        const belowTopQuarter = mouseHoveredY > quarter;
        const belowBottomQuarter = mouseHoveredY > quarter * 3;
        const aboveBottomQuarter = mouseHoveredY < quarter * 3;

        if (isMovingUp && aboveBottomQuarter) {
          moveTo({ parentId: note.parentId, sortId: note.sortId });
        }
        if (isMovingDown) {
          let destination;
          if (note.isExpanded) {
            if (belowBottomQuarter) {
              destination = { parentId: note.id, sortId: 1 };
            } else {
              return;
            }
          } else {
            if (belowTopQuarter) {
              destination = { parentId: note.parentId, sortId: note.sortId };
            } else {
              return;
            }
          }
          moveTo(destination);
        }

        function moveTo(destination) {
          dispatch(
            moveNote({
              noteId: noteDragged.id,
              destination: destination,
            })
          );
          noteDragged.parentId = note.parentId;
          noteDragged.sortId = note.sortId;
          noteDragged.middleY = absoluteHoveredMiddleY;
        }
      },
    }),
    [note]
  );
  return [handlerId, drop];
}
