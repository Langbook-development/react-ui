import { moveItemOnTree } from "@atlaskit/tree";

export class NotesAdapter {
  constructor(notes) {
    this.notes = notes;
  }

  expand(noteId) {
    let noteToExpand = this.notes.tree.items[noteId];
    while (noteToExpand.id !== "root" && noteToExpand.children.length > 0) {
      noteToExpand.isExpanded = true;
      noteToExpand = this.notes.tree.items[noteToExpand.data.parentId];
    }
  }

  collapse(noteId) {
    let noteToCollapse = this.notes.tree.items[noteId];
    noteToCollapse.isExpanded = false;
    noteToCollapse.children.forEach((childNoteToCollapse) =>
      this.collapse(childNoteToCollapse)
    );
  }

  update(note) {
    const noteOld = this.notes.tree.items[note.id];
    this.notes.tree.items[note.id].data = {
      ...note.data,
      isTitleFresh:
        noteOld.data.isTitleFresh && note.data.title === noteOld.data.title,
      isContentFresh:
        noteOld.data.isContentFresh &&
        note.data.content === noteOld.data.content,
    };
  }

  put(noteDto) {
    this.notes.tree.items[noteDto.id] = {
      id: noteDto.id,
      data: {
        parentId: noteDto.parentId,
        title: noteDto.title,
        content: noteDto.content,
        isTitleFresh: false,
        isContentFresh: false,
      },
    };
  }

  setChildren(noteDto) {
    const note = this.notes.tree.items[noteDto.id];
    note.children = noteDto.childPageIds;
    note.hasChildren = noteDto.childPageIds.length > 0;
  }

  makeFresh(noteId) {
    const note = this.notes.tree.items[noteId];
    note.data.isTitleFresh = true;
    note.data.isContentFresh = true;
  }

  removeChild(noteId) {
    const note = this.notes.tree.items[noteId];
    const parentNote = this.notes.tree.items[note.data.parentId];
    parentNote.children = parentNote.children.filter((it) => it !== noteId);
    parentNote.hasChildren = parentNote.children.length > 0;
  }

  deleteAll(noteIds) {
    noteIds.forEach((id) => delete this.notes.tree.items[id]);
  }

  moveNote(source, destination) {
    this.notes.tree = moveItemOnTree(this.notes.tree, source, destination);
  }
}
