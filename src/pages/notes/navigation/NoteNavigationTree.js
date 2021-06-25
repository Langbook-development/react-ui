import React from "react";
import Tree from "@atlaskit/tree";
import { NoteNavigationItem } from "./NoteNavigationItem";
import { useDispatch, useSelector } from "react-redux";
import {
  moveNote,
  noteCollapsed,
  noteExpanded,
} from "../../../state/notes/notesSlice";
import { noteTreeSelector } from "../../../state/notes/selectors";

const LEVEL_PADDING_PX = 24;

export function NoteNavigationTree() {
  const dispatch = useDispatch();
  const tree = useSelector(noteTreeSelector);

  const onExpand = (itemId) => {
    dispatch(noteExpanded(itemId));
  };

  const onCollapse = (itemId) => {
    dispatch(noteCollapsed(itemId));
  };

  const onDragEnd = (source, destination) => {
    if (!destination) {
      return;
    }
    dispatch(moveNote({ source, destination }));
  };

  let renderItem = ({ item, onExpand, onCollapse, provided, snapshot }) => {
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <NoteNavigationItem
          note={item}
          isDragging={snapshot.isDragging}
          onExpand={onExpand}
          onCollapse={onCollapse}
        />
      </div>
    );
  };

  // https://atlaskit.atlassian.com/packages/confluence/tree
  return (
    <div className="scrollbar" id="scroll-style">
      <Tree
        renderItem={renderItem}
        tree={tree}
        onExpand={onExpand}
        onCollapse={onCollapse}
        onDragEnd={onDragEnd}
        offsetPerLevel={LEVEL_PADDING_PX}
        isDragEnabled
      />
    </div>
  );
}
