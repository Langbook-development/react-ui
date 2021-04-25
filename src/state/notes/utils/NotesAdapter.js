export class NotesAdapter {
  constructor(notes) {
    this.notes = notes;
  }

  shiftPush(noteId, sortId, parentId) {
    // Shift notes on the level where moved note is placed
    const noteParentNew = this.notes.byId[parentId];
    noteParentNew.childPageIds.forEach((id) => {
      let noteToShift = this.notes.byId[id];
      noteToShift.sortId =
        noteToShift.sortId >= sortId
          ? noteToShift.sortId + 1
          : noteToShift.sortId;
    });
    noteParentNew.childPageIds.push(noteId);
  }

  shiftPullOut(noteId) {
    // Shift notes on the level where moved note is removed
    const noteToPull = this.notes.byId[noteId];
    const noteParentOld = this.notes.byId[noteToPull.parentId];
    noteParentOld.childPageIds.forEach((id) => {
      let noteToShift = this.notes.byId[id];
      noteToShift.sortId =
        noteToShift.sortId > noteToPull.sortId
          ? noteToShift.sortId - 1
          : noteToShift.sortId;
    });
    noteParentOld.childPageIds = noteParentOld.childPageIds.filter(
      (id) => id !== noteToPull.id
    );
  }

  changePositionOf(noteId, sortId, parentId) {
    const noteToMove = this.notes.byId[noteId];
    noteToMove.sortId = sortId;
    noteToMove.parentId = parentId;
  }

  deleteAll(noteIds) {
    noteIds.forEach((id) => delete this.notes.byId[id]);
    this.notes.allIds = this.notes.allIds.filter((id) => !noteIds.includes(id));
  }

  expand(noteId) {
    let noteToExpandId = noteId;
    while (noteToExpandId) {
      const noteToExpand = this.notes.byId[noteToExpandId];
      if (noteToExpand.childPageIds.length > 0 && !noteToExpand.isCategory) {
        noteToExpand.isExpanded = true;
      }
      noteToExpandId = noteToExpand.parentId;
    }
  }

  collapse(id) {
    const note = this.notes.byId[id];
    note.isExpanded = false;
    note.childPageIds.forEach((it) => this.collapse(it));
  }

  update(note) {
    const noteOld = this.notes.byId[note.id];
    this.notes.byId[note.id] = {
      ...note,
      isTitleFresh: noteOld.isTitleFresh && note.title === noteOld.title,
      isContentFresh:
        noteOld.isContentFresh && note.content === noteOld.content,
    };
  }

  put(note) {
    this.notes.allIds.push(note.id);
    this.notes.byId[note.id] = note;
    if (note.parentId) {
      this.notes.byId[note.parentId].childPageIds.push(note.id);
    } else {
      if (note.isCategory) {
        this.notes.categoryIds.push(note.id);
      }
    }
  }

  putAll(notesResponse) {
    notesResponse.notes.forEach((noteJson) => {
      let note = this.noteFrom(noteJson);
      this.notes.byId[note.id] = note;
      this.notes.allIds.push(note.id);
    });
    notesResponse.categories.forEach((categoryJson) => {
      let category = this.noteFrom(categoryJson);
      this.notes.byId[category.id] = { ...category, isCategory: true };
      this.notes.categoryIds.push(category.id);
    });
  }

  noteFrom(json) {
    return {
      ...json,
      isExpanded: false,
      isTitleFresh: false,
      isContentFresh: false,
    };
  }
}
