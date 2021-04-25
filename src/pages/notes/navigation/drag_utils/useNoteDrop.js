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
        const {
          isMovingUp,
          isMovingDown,
          isAboveBottomQuarter,
          isBelowBottomQuarter,
          isBelowTopQuarter,
          middleY,
        } = computePosition(ref, noteDragged, monitor);

        if (isMovingUp) {
          console.log("isMovingUp");
        }
        if (isMovingDown) {
          console.log("isMovingDown");
        }

        if (isMovingUp && isAboveBottomQuarter) {
          moveTo(
            { parentId: note.parentId, sortId: note.sortId, movingUp: 0 },
            middleY
          );
        }
        if (isMovingDown) {
          if (note.isExpanded) {
            if (isBelowBottomQuarter) {
              moveTo({ parentId: note.id, sortId: 1, movingDown: 1 }, middleY);
            }
          } else {
            if (isBelowTopQuarter) {
              moveTo(
                {
                  parentId: note.parentId,
                  sortId: note.sortId,
                  movingDown: 2,
                },
                middleY
              );
            }
          }
        }

        function moveTo(destination, middleY) {
          dispatch(
            moveNote({
              noteId: noteDragged.id,
              destination: destination,
            })
          );
          noteDragged.parentId = note.parentId;
          noteDragged.sortId = note.sortId;
          noteDragged.middleY = middleY;
          console.log(noteDragged.middleY);
        }
      },
    }),
    [note]
  );
  return [drop, handlerId];
}
