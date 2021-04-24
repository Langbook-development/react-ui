import { useDragLayer } from "react-dnd";
import { NoteDragPreview } from "../NoteDragPreview";
import React from "react";

const layerStyles = {
  position: "absolute",
  cursor: "grabbing",
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

export const CustomDragLayer = () => {
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

  function renderItem() {
    switch (itemType) {
      case "NOTE":
        return (
          <NoteDragPreview
            noteId={item.noteDragged.id}
            width={item.noteWidth}
            level={item.noteDragged.level}
          />
        );
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }
  return (
    <div className="custom-drag-layer" style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
};
