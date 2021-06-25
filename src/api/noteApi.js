import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "http://localhost:8080/ui-gateway";

export const NoteAPI = {};

NoteAPI.putNote = (categoryId, note) =>
  fetch(baseUrl + "/categories/" + categoryId + "/notes/", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      id: note.id,
      ...note.data,
    }),
  })
    .then(handleResponse)
    .catch(handleError);

NoteAPI.getNotes = (categoryId) =>
  fetch(baseUrl + "/categories/" + categoryId + "/notes/")
    .then(handleResponse)
    .catch(handleError);

NoteAPI.deleteNote = (categoryId, noteId) =>
  fetch(baseUrl + "/categories/" + categoryId + "/notes/" + noteId, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);

NoteAPI.moveNote = (categoryId, source, destination) =>
  fetch(baseUrl + "/categories/" + categoryId + "/notes/move", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ source, destination }),
  })
    .then(handleResponse)
    .catch(handleError);
