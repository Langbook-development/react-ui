import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { moveNote } from "../../../features/slices/notesSlice";
import { DragPositionAdapter } from "./DragPositionAdapter";

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

        const adapter = new DragPositionAdapter(ref, noteDragged, monitor);
        const isMovingDown = adapter.isMovingDown();
        const isMovingUp = adapter.isMovingUp();
        const isAboveBottomQuarter = adapter.aboveBottomQuarter();
        const isBelowBottomQuarter = adapter.belowBottomQuarter();
        const isBelowTopQuarter = adapter.belowTopQuarter();
        const absoluteHoveredMiddleY = adapter.absoluteMiddleY;

        if (isMovingUp && isAboveBottomQuarter) {
          moveTo({ parentId: note.parentId, sortId: note.sortId });
        }
        if (isMovingDown) {
          if (note.isExpanded && isBelowBottomQuarter) {
            moveTo({ parentId: note.id, sortId: 1 });
          } else {
            if (isBelowTopQuarter) {
              moveTo({ parentId: note.parentId, sortId: note.sortId });
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
          noteDragged.middleY = absoluteHoveredMiddleY;
        }
      },
    }),
    [note]
  );
  return [handlerId, drop];
}
