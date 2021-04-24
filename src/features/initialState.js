export const INITIAL_STATE_EMPTY = {
  notes: {
    isNoteMovementLoading: false,
    categoryIds: [],
    byId: {},
    allIds: [],
  },
};

export const INITIAL_STATE = {
  notes: {
    isNoteMovementLoading: false,
    categoryIds: [1, 5],
    allIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    byId: {
      0: {
        id: 0,
        sortId: 1,
        title: "root",
        content: "root",
        parentId: undefined,
        isCategory: true,
        childPageIds: [1, 4, 5],
        isExpanded: false,
        isTitleFresh: false,
        isContentFresh: false,
      },
      1: {
        id: 1,
        sortId: 1,
        title: "Basic grammar",
        content: "This is some placeholder content!",
        parentId: 0,
        childPageIds: [2, 3],
        isExpanded: false,
        isTitleFresh: false,
        isContentFresh: false,
      },
      2: {
        id: 2,
        sortId: 1,
        title: "Present simple",
        content: "Try to add some more text if you want to play with it",
        parentId: 1,
        childPageIds: [],
        isExpanded: false,
        isTitleFresh: false,
        isContentFresh: false,
      },
      3: {
        id: 3,
        sortId: 2,
        title: "Present continuous",
        parentId: 1,
        childPageIds: [6, 7],
        isExpanded: false,
        isTitleFresh: false,
        isContentFresh: false,
      },
      4: {
        id: 4,
        sortId: 2,
        title: "Vocabulary",
        parentId: 0,
        childPageIds: [8],
        isExpanded: false,
        isTitleFresh: false,
        isContentFresh: false,
      },
      5: {
        id: 5,
        sortId: 3,
        title: "Russian Basic grammar",
        content: "In russian there is no basic grammar!",
        parentId: 0,
        childPageIds: [],
        isExpanded: false,
        isTitleFresh: false,
        isContentFresh: false,
      },
      6: {
        id: 6,
        sortId: 1,
        title: "Examples",
        content: "Some examples",
        parentId: 3,
        childPageIds: [9],
        isExpanded: false,
        isTitleFresh: false,
        isContentFresh: false,
      },
      7: {
        id: 7,
        sortId: 2,
        title: "Exercises",
        content: "Some exercises",
        parentId: 3,
        childPageIds: [],
        isExpanded: false,
        isTitleFresh: false,
        isContentFresh: false,
      },
      8: {
        id: 8,
        sortId: 1,
        title: "Nice to know words",
        content: "Words",
        parentId: 4,
        childPageIds: [],
        isExpanded: false,
        isTitleFresh: false,
        isContentFresh: false,
      },
      9: {
        id: 9,
        sortId: 1,
        title: "Long explanatory exaple caption",
        content: "Words",
        parentId: 6,
        childPageIds: [10],
        isExpanded: false,
        isTitleFresh: false,
        isContentFresh: false,
      },
      10: {
        id: 10,
        sortId: 1,
        title: "Long explanatory exaple caption 2",
        content: "Words",
        parentId: 9,
        childPageIds: [],
        isExpanded: false,
        isTitleFresh: false,
        isContentFresh: false,
      },
    },
  },
};
