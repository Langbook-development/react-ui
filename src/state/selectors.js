export function hasNotesSelector(state) {
  return state.notes.tree.items["root"].hasChildren;
}

export function noteSelector(noteId) {
  return (state) => state.notes.tree.items[noteId];
}

export function firstToShowNoteSelector(state) {
  const hasNotes = hasNotesSelector(state);
  return hasNotes ? state.notes.tree.items["root"].children[0] : undefined;
}

export function firstToShowCategorySelector(state) {
  return Object.keys(state.notes.categories.byId)[0];
}

export function isNoteMovementLoadingSelector(state) {
  return state.notes.isNoteMovementLoading;
}

export function noteTreeSelector(state) {
  return state.notes.tree;
}

export function afterDeleteFallbackIdSelector(selectedNoteId) {
  return (state) => {
    const noteSelected = state.notes.tree.items[selectedNoteId];
    const noteParent = state.notes.tree.items[noteSelected.data.parentId];
    const noteIndex = noteParent.children
      .map((it) => it)
      .indexOf(selectedNoteId);
    const noteBelowId = noteParent.children[noteIndex + 1];
    if (noteBelowId) {
      return noteBelowId;
    }
    const noteAboveId = noteParent.children[noteIndex - 1];
    if (noteAboveId) {
      return noteAboveId;
    }
    if (noteParent.id !== "root") {
      return noteParent.id;
    }
    return undefined;
  };
}

export function isNotesLoadedSelector(state) {
  return state.notes.isNotesLoaded;
}
