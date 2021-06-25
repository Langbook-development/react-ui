export const INITIAL_STATE_EMPTY = {
  notes: {
    isNoteMovementLoading: false,
    isNotesLoaded: false,
    isCategoriesLoaded: true,
    categories: {
      byId: {
        1000: {
          id: 1000,
          caption: "Languages",
        },
      },
    },
    tree: {
      rootId: "root",
      items: {
        root: {
          id: "root",
          children: [],
          hasChildren: false,
          isExpanded: false,
          data: {},
        },
      },
    },
  },
};

export const INITIAL_STATE_TREE = {
  notes: {
    isNoteMovementLoading: false,
    isNotesLoaded: false,
    isCategoriesLoaded: true,
    categories: {
      byId: {
        1000: {
          id: 1000,
          caption: "Languages",
        },
      },
    },
    tree: {
      rootId: "root",
      items: {
        root: {
          id: "root",
          children: ["note-1", "note-2", "note-10"],
          hasChildren: true,
          isExpanded: false,
        },
        "note-1": {
          id: "note-1",
          children: ["note-3", "note-4", "note-5", "note-6"],
          hasChildren: true,
          isExpanded: false,
          data: {
            categoryId: "category-1",
            parentId: "root",
            title: "Parent 1",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
          },
        },
        "note-2": {
          id: "note-2",
          children: ["note-7", "note-8", "note-9"],
          hasChildren: false,
          isExpanded: false,
          data: {
            categoryId: "category-1",
            parentId: "root",
            title: "Parent 2",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
          },
        },
        "note-3": {
          id: "note-3",
          children: [],
          hasChildren: false,
          isExpanded: false,
          data: {
            categoryId: "category-1",
            parentId: "note-1",
            title: "Child 1",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
          },
        },
        "note-4": {
          id: "note-4",
          children: [],
          hasChildren: false,
          isExpanded: false,
          data: {
            categoryId: "category-1",
            parentId: "note-1",
            title: "Child 2",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
          },
        },
        "note-5": {
          id: "note-5",
          children: [],
          hasChildren: false,
          isExpanded: false,
          data: {
            categoryId: "category-1",
            parentId: "note-1",
            title: "Child 3",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
          },
        },
        "note-6": {
          id: "note-6",
          children: [],
          hasChildren: false,
          isExpanded: false,
          data: {
            categoryId: "category-1",
            parentId: "note-1",
            title: "Child 4",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
          },
        },
        "note-7": {
          id: "note-7",
          children: [],
          hasChildren: false,
          isExpanded: false,
          data: {
            categoryId: "category-1",
            parentId: "note-2",
            title: "Child 5",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
          },
        },
        "note-8": {
          id: "note-8",
          children: [],
          hasChildren: false,
          isExpanded: false,
          data: {
            categoryId: "category-1",
            parentId: "note-2",
            title: "Child 6",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
          },
        },
        "note-9": {
          id: "note-9",
          children: [],
          hasChildren: false,
          isExpanded: false,
          data: {
            categoryId: "category-1",
            parentId: "note-2",
            title: "Child 7",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
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
            categoryId: "category-1",
            parentId: "root",
            title: "Parent 3",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
          },
        },
        "note-11": {
          id: "note-11",
          children: [],
          hasChildren: false,
          isExpanded: false,
          data: {
            categoryId: "category-1",
            parentId: "note-10",
            title: "Child 8",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
          },
        },
        "note-12": {
          id: "note-12",
          children: [],
          hasChildren: false,
          isExpanded: false,
          data: {
            categoryId: "category-1",
            parentId: "note-10",
            title: "Child 9",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
          },
        },
        "note-13": {
          id: "note-13",
          children: [],
          hasChildren: false,
          isExpanded: false,
          data: {
            categoryId: "category-1",
            parentId: "note-10",
            title: "Child 10",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
          },
        },
        "note-14": {
          id: "note-14",
          children: [],
          hasChildren: false,
          isExpanded: false,
          data: {
            categoryId: "category-1",
            parentId: "note-10",
            title: "Child 11",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
          },
        },
        "note-15": {
          id: "note-15",
          children: [],
          hasChildren: false,
          isExpanded: false,
          data: {
            categoryId: "category-1",
            parentId: "note-10",
            title: "Child 12",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
          },
        },
        "note-16": {
          id: "note-16",
          children: [],
          hasChildren: false,
          isExpanded: false,
          data: {
            categoryId: "category-1",
            parentId: "note-10",
            title: "Child 13",
            content: "",
            isTitleFresh: false,
            isContentFresh: false,
          },
        },
      },
    },
  },
};
