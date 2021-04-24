import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "http://localhost:8080/ui-gateway/notes/";

export const NoteAPI = {};

NoteAPI.putNote = (note) =>
  fetch(baseUrl, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(note),
  })
    .then(handleResponse)
    .catch(handleError);

NoteAPI.getNotes = () => fetch(baseUrl).then(handleResponse).catch(handleError);

NoteAPI.deleteNote = (note) =>
  fetch(baseUrl + "/" + note.id, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);

NoteAPI.moveNote = (moveRequest) =>
  fetch(baseUrl + "/move", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(moveRequest),
  })
    .then(handleResponse)
    .catch(handleError);
