export const INITIAL_STATE = {
  categories: {
    byId: {
      1: {
        id: 1,
        name: "English",
        childPageIds: [1, 4],
      },
      2: {
        id: 2,
        name: "Russian",
        childPageIds: [5],
      },
    },
    allIds: [1, 2],
  },
  notes: {
    selectedNoteId: 1,
    byId: {
      1: {
        id: 1,
        title: "Basic grammar",
        content: "This is some placeholder content!",
        categoryId: 1,
        childPageIds: [2, 3],
      },
      2: {
        id: 2,
        title: "Present simple",
        content: "Try to add some more text if you want to play with it",
        parentId: 1,
        categoryId: 1,
      },
      3: {
        id: 3,
        title: "Present continuous",
        parentId: 1,
        categoryId: 1,
        childPageIds: [6, 7],
      },
      4: {
        id: 4,
        title: "Vocabulary",
        categoryId: 1,
        childPageIds: [8],
      },
      5: {
        id: 5,
        title: "Basic grammar",
        content:
          "In russian there is no basic grammar. All grammar is complicated!",
        categoryId: 2,
      },
      6: {
        id: 6,
        title: "Examples",
        content: "Some examples",
        parentId: 3,
        categoryId: 1,
        childPageIds: [9],
      },
      7: {
        id: 7,
        title: "Exercises",
        content: "Some exercises",
        parentId: 3,
        categoryId: 1,
      },
      8: {
        id: 8,
        title: "Nice to know words",
        content: "Words",
        parentId: 4,
        categoryId: 2,
      },
      9: {
        id: 9,
        title: "Long explanatory exaple caption",
        content: "Words",
        parentId: 6,
        categoryId: 1,
        childPageIds: [10],
      },
      10: {
        id: 10,
        title: "Long explanatory exaple caption 2",
        content: "Words",
        parentId: 9,
        categoryId: 1,
      },
    },
    allIds: [1, 2, 3, 4, 5],
  },
};
