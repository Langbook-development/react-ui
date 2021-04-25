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
  return (state) => {
    let note = state.notes.byId[noteId];
    if (!note?.isCategory) {
      return note;
    }
  };
}

export function childNotesSortedSelector(parentId) {
  return (state) => {
    return state.notes.byId[parentId].childPageIds
      .map((id) => state.notes.byId[id])
      .sort((a, b) => a.sortId - b.sortId);
  };
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
  const sortAsc = (a, b) => a.sortId - b.sortId;
  const sortDesc = (a, b) => b.sortId - a.sortId;
  return (state) => {
    const noteSelected = state.notes.byId[selectedNoteId];
    const noteParent = state.notes.byId[noteSelected.parentId];
    const notesSameParent = noteParent.childPageIds.map(
      (id) => state.notes.byId[id]
    );
    const noteBelow = notesSameParent
      .filter((it) => it.sortId > noteSelected.sortId)
      .sort(sortAsc)[0];
    if (noteBelow) {
      return noteBelow.id;
    }
    const noteAbove = notesSameParent
      .filter((it) => it.sortId < noteSelected.sortId)
      .sort(sortDesc)[0];
    if (noteAbove) {
      return noteAbove.id;
    }
    if (!noteParent.isCategory) {
      return noteParent.id;
    }
    return undefined;
  };
}

export function isNotesLoadedSelector(state) {
  return state.notes.isNotesLoaded;
}

function getLestSortId(ids, state) {
  return ids
    .map((id) => state.notes.byId[id])
    .reduce((prev, curr) => (prev.sortId < curr.sortId ? prev : curr), {}).id;
}
