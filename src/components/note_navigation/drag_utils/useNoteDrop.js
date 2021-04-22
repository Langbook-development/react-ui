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
        if (!ref.current) {
          return;
        }
        if (noteDragged.id === note.id) {
          return;
        }
        if (!noteDragged.placeholderY) {
          noteDragged.placeholderY = monitor.getInitialClientOffset().y;
        }

        const noteHoveredOnBoundingRect = ref.current?.getBoundingClientRect();
        const noteHoveredOnMiddleY =
          (noteHoveredOnBoundingRect.bottom - noteHoveredOnBoundingRect.top) /
          2;
        const mousePositionY = monitor.getClientOffset().y;
        const noteHoveredOnMousePositionY =
          mousePositionY - noteHoveredOnBoundingRect.top;

        if (
          mousePositionY < noteDragged.placeholderY &&
          noteHoveredOnMousePositionY > noteHoveredOnMiddleY
        ) {
          return; // Moving up and Y below hovered note middle Y
        }
        if (
          mousePositionY > noteDragged.placeholderY &&
          noteHoveredOnMousePositionY < noteHoveredOnMiddleY
        ) {
          return; // Moving down and Y above hovered note middle Y
        }
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
        noteDragged.placeholderY =
          noteHoveredOnBoundingRect.top + noteHoveredOnMiddleY;
      },
    }),
    [note]
  );
  return [handlerId, drop];
}
