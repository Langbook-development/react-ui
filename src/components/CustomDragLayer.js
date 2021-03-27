import { useDragLayer } from "react-dnd";
import NoteNavigationItem from "./note_navigation/NoteNavigationItem";
import React from "react";
import NoteNavigationItemDraggable from "./note_navigation/NoteNavigationItemDraggable";

const layerStyles = {
  position: "absolute",
  cursor: "move",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};
function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return {};
  }
  let x = currentOffset.x;
  let y = currentOffset.y;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
    display: "inline-block",
  };
}

export const CustomDragLayer = (props) => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  function getNavigationItemWidthPx() {
    return document.getElementsByClassName("navigation-item")[0].clientWidth;
  }

  function renderItem() {
    switch (itemType) {
      case "NOTE":
        return (
          <NoteNavigationItemDraggable
            noteId={item.note.id}
            level={item.level}
            width={getNavigationItemWidthPx()}
          />
        );
      default:
        return null;
    }
  }

  // if (!isDragging) {
  //   return null;
  // }
  return (
    <div className="custom-drag-layer" style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
};
