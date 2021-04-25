import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { moveNote } from "../../../../state/notes/notesSlice";
import { computePosition, getMiddleY } from "./positionUtils";

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
        const middleY = getMiddleY(ref);
        const {
          isMovingUp,
          isMovingDown,
          isAboveBottomQuarter,
          isBelowBottomQuarter,
          isBelowTopQuarter,
        } = computePosition(ref, noteDragged, monitor);

        if (isMovingUp && isAboveBottomQuarter) {
          moveTo({ parentId: note.parentId, sortId: note.sortId });
          noteDragged.middleY = middleY;
        }
        if (isMovingDown) {
          if (note.isExpanded) {
            if (isBelowBottomQuarter) {
              moveTo({ parentId: note.id, sortId: 1 });
              noteDragged.middleY = middleY;
            }
          } else {
            if (isBelowTopQuarter) {
              moveTo({ parentId: note.parentId, sortId: note.sortId });
              noteDragged.middleY = middleY;
            }
          }
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
        }
      },
    }),
    [note]
  );
  return [drop, handlerId];
}
