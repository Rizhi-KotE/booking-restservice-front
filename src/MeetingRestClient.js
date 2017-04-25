import RestClient from "another-rest-client";

let api = new RestClient('http://localhost:8080');
api.res('meeting');

api.res('user');

api.res('room');

export default api;

