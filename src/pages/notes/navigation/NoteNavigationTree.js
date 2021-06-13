import React, { useState } from "react";
import Tree, { moveItemOnTree, mutateTree } from "@atlaskit/tree";
import { NoteNavigationItem } from "./NoteNavigationItem";

const TREE = {
  rootId: "root",
  items: {
    root: {
      id: "root",
      children: ["note-1", "note-2", "note-10"],
      hasChildren: true,
      isExpanded: true,
      data: {
        title: "",
        content: "",
      },
    },
    "note-1": {
      id: "note-1",
      children: ["note-3", "note-4", "note-5", "note-6"],
      hasChildren: true,
      isExpanded: true,
      data: {
        title: "Parent 1",
        content: "",
      },
    },
    "note-2": {
      id: "note-2",
      children: ["note-7", "note-8", "note-9"],
      hasChildren: false,
      isExpanded: true,
      data: {
        title: "Parent 2",
        content: "",
      },
    },
    "note-3": {
      id: "note-3",
      children: [],
      hasChildren: false,
      isExpanded: true,
      data: {
        title: "Child 1",
        content: "",
      },
    },
    "note-4": {
      id: "note-4",
      children: [],
      hasChildren: false,
      isExpanded: true,
      data: {
        title: "Child 2",
        content: "",
      },
    },
    "note-5": {
      id: "note-5",
      children: [],
      hasChildren: false,
      isExpanded: true,
      data: {
        title: "Child 3",
        content: "",
      },
    },
    "note-6": {
      id: "note-6",
      children: [],
      hasChildren: false,
      isExpanded: true,
      data: {
        title: "Child 4",
        content: "",
      },
    },
    "note-7": {
      id: "note-7",
      children: [],
      hasChildren: false,
      isExpanded: true,
      data: {
        title: "Child 5",
        content: "",
      },
    },
    "note-8": {
      id: "note-8",
      children: [],
      hasChildren: false,
      isExpanded: true,
      data: {
        title: "Child 6",
        content: "",
      },
    },
    "note-9": {
      id: "note-9",
      children: [],
      hasChildren: false,
      isExpanded: true,
      data: {
        title: "Child 7",
        content: "",
      },
    },
    "note-10": {
      id: "note-10",
      children: [
        "note-11",
        "note-12",
        "note-13",
        "note-14",
        "note-15",
        "note-16",
      ],
      hasChildren: true,
      isExpanded: false,
      data: {
        title: "Parent 3",
        content: "",
      },
    },
    "note-11": {
      id: "note-11",
      children: [],
      hasChildren: false,
      isExpanded: false,
      data: {
        title: "Child 8",
        content: "",
      },
    },
    "note-12": {
      id: "note-12",
      children: [],
      hasChildren: false,
      isExpanded: false,
      data: {
        title: "Child 9",
        content: "",
      },
    },
    "note-13": {
      id: "note-13",
      children: [],
      hasChildren: false,
      isExpanded: false,
      data: {
        title: "Child 10",
        content: "",
      },
    },
    "note-14": {
      id: "note-14",
      children: [],
      hasChildren: false,
      isExpanded: false,
      data: {
        title: "Child 11",
        content: "",
      },
    },
    "note-15": {
      id: "note-15",
      children: [],
      hasChildren: false,
      isExpanded: false,
      data: {
        title: "Child 12",
        content: "",
      },
    },
    "note-16": {
      id: "note-16",
      children: [],
      hasChildren: false,
      isExpanded: false,
      data: {
        title: "Child 13",
        content: "",
      },
    },
  },
};

const LEVEL_PADDING_PX = 24;

export function NoteNavigationTree() {
  const [tree, setTree] = useState(TREE);

  const onExpand = (itemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: true }));
  };

  const onCollapse = (itemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: false }));
  };

  const onDragEnd = (source, destination) => {
    if (!destination) {
      return;
    }
    setTree(moveItemOnTree(tree, source, destination));
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
