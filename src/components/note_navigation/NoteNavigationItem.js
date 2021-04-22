import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight, Plus } from "react-bootstrap-icons";
import {
  noteExpanded,
  noteCollapsed,
  moveNote,
} from "../../features/slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import NoteNavigationList from "./NoteNavigationList";
import { unwrapResult } from "@reduxjs/toolkit";
import { createNote } from "../../features/slices/thunks";
import { useDrag, useDrop } from "react-dnd";

const LEVEL_PADDING_PX = 24;

function NoteNavigationItem(props) {
  const { selectedNoteId } = useParams();
  const { level, noteId } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const note = useSelector((state) => state.notes.byId[noteId]);

  const [isPlusVisible, setIsPlusVisible] = useState(false);
  const [isMouseOnItem, setIsMouseOnItem] = useState(false);

  useEffect(() => {
    if (isMouseOnItem) {
      let timeoutId = setTimeout(() => {
        setIsPlusVisible(true);
      }, 280);
      return () => clearTimeout(timeoutId);
    }
  }, [isMouseOnItem]);

  const ref = useRef(null);
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
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        if (
          item.noteDragged.sortId === item.noteInitial.sortId &&
          item.noteDragged.parentId === item.noteInitial.parentId
        ) {
          return;
        }
        dispatch(
          moveNote({
            noteId: item.noteDragged.id,
            destination: {
              parentId: item.noteInitial.parentId,
              sortId: item.noteInitial.sortId,
            },
          })
        );
      }
    },
  }));
  const [{ handlerId }, drop] = useDrop(
    () => ({
      accept: "CARD",
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        if (item.noteDragged.id === note.id) {
          return;
        }
        if (!item.noteDragged.placeholderY) {
          item.noteDragged.placeholderY = monitor.getInitialClientOffset().y;
        }

        const noteHoveredOnBoundingRect = ref.current?.getBoundingClientRect();
        const noteHoveredOnMiddleY =
          (noteHoveredOnBoundingRect.bottom - noteHoveredOnBoundingRect.top) /
          2;
        const mousePositionY = monitor.getClientOffset().y;
        const noteHoveredOnMousePositionY =
          mousePositionY - noteHoveredOnBoundingRect.top;

        if (
          mousePositionY < item.noteDragged.placeholderY &&
          noteHoveredOnMousePositionY > noteHoveredOnMiddleY
        ) {
          return; // Moving up and Y below note middle Y
        }
        if (
          mousePositionY > item.noteDragged.placeholderY &&
          noteHoveredOnMousePositionY < noteHoveredOnMiddleY
        ) {
          return; // Moving down and Y above note middle Y
        }

        dispatch(
          moveNote({
            noteId: item.noteDragged.id,
            destination: {
              parentId: note.parentId,
              sortId: note.sortId,
            },
          })
        );
        item.noteDragged.parentId = note.parentId;
        item.noteDragged.sortId = note.sortId;
        item.noteDragged.placeholderY =
          noteHoveredOnBoundingRect.top + noteHoveredOnMiddleY;
      },
    }),
    [note]
  );

  if (note.isExpanded && isDragging) {
    dispatch(noteCollapsed(note.id));
  }

  const navigationItemStyle = {
    paddingLeft: LEVEL_PADDING_PX * level,
    opacity: isDragging ? 0 : 1,
  };

  function handleMouseLeave() {
    setIsPlusVisible(false);
    setIsMouseOnItem(false);
  }

  function handleMouseEnter() {
    setIsMouseOnItem(true);
  }

  function handleExpandClick() {
    dispatch(noteExpanded(note.id));
  }

  function handleCollapseClick() {
    dispatch(noteCollapsed(note.id));
  }

  function handlePlusButtonClick() {
    dispatch(createNote({ parentId: note.id }))
      .then(unwrapResult)
      .then((note) => {
        history.push("/notes/" + note.id);
      });
  }

  function hasSubNotes(note) {
    return note.childPageIds && note.childPageIds.length > 0;
  }

  function getTitleClass() {
    return "title" + (note.id.toString() === selectedNoteId ? " active" : "");
  }

  function getIcon() {
    if (hasSubNotes(note)) {
      if (note.isExpanded) {
        return (
          <button className="chevron-button" onClick={handleCollapseClick}>
            <ChevronDown className="icon" />
          </button>
        );
      } else {
        return (
          <button className="chevron-button" onClick={handleExpandClick}>
            <ChevronRight className="icon" />
          </button>
        );
      }
    } else {
      return <div className="chevron-button-placeholder" />;
    }
  }

  return (
    <>
      <div
        ref={drag(drop(ref))}
        data-handler-id={handlerId}
        className="navigation-item"
        style={navigationItemStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {getIcon()}
        <div className="title-area">
          <Link className={getTitleClass()} to={"/notes/" + note.id}>
            {note.title}
          </Link>
        </div>
        <button
          className="action-button"
          onClick={handlePlusButtonClick}
          style={{ visibility: isPlusVisible ? "visible" : "hidden" }}
        >
          <Plus className="icon" />
        </button>
      </div>
      {note.isExpanded && (
        <NoteNavigationList
          noteIds={note.childPageIds}
          level={level + 1}
          key={note.id}
        />
      )}
    </>
  );
}

export default NoteNavigationItem;
