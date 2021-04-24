export function hasNotesSelector(state) {
  const currentCategoryId = state.notes.categoryIds[0];
  if (currentCategoryId) {
    return state.notes.byId[currentCategoryId].childPageIds.length > 0;
  }
  return false;
}

export function currentCategorySelector(state) {
  const currentCategoryId = state.notes.categoryIds[0];
  return state.notes.byId[currentCategoryId];
}

export function noteSelector(noteId) {
  return (state) => state.notes.byId[noteId];
}

export function childNotesSelector(parentId) {
  return (state) =>
    state.notes.byId[parentId].childPageIds.map((id) => state.notes.byId[id]);
}

export function firstToShowNoteSelector(state) {
  const hasNotes = hasNotesSelector(state);
  if (hasNotes) {
    const currentCategoryId = state.notes.categoryIds[0];
    const currentCategory = state.notes.byId[currentCategoryId];
    return getLestSortId(currentCategory.childPageIds, state);
  } else {
    return undefined;
  }
}

export function isNoteMovementLoadingSelector(state) {
  return state.notes.isNoteMovementLoading;
}

export function afterDeleteFallbackIdSelector(selectedNoteId) {
  return (state) => {
    const noteSelected = state.notes.byId[selectedNoteId];
    const noteParent = state.notes.byId[noteSelected.parentId];
    const sameParentLestSortId = getLestSortId(noteParent.childPageIds, state);
    if (sameParentLestSortId !== noteSelected.id) {
      return sameParentLestSortId;
    } else {
      if (!noteParent.isCategory) {
        return noteParent.id;
      }
      return undefined;
    }
  };
}

function getLestSortId(ids, state) {
  return ids
    .map((id) => state.notes.byId[id])
    .reduce((prev, curr) => (prev.sortId < curr.sortId ? prev : curr), {}).id;
}
