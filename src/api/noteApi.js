import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "http://localhost:8080/ui-gateway";

export const NoteAPI = {};

NoteAPI.putNote = (note) =>
  fetch(baseUrl, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(note),
  })
    .then(handleResponse)
    .catch(handleError);

NoteAPI.getNotes = (categoryId) =>
  fetch(baseUrl + "/categories/" + categoryId + "/notes/")
    .then(handleResponse)
    .catch(handleError);

NoteAPI.deleteNote = (note) =>
  fetch(baseUrl + "/" + note.id, { method: "DELETE" })
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
