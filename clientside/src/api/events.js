import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = true; // Enables cross-site Access-Control requests

export async function createEvent(eventData) {
    return await axios.post("http://localhost:8000/api/create-events", eventData);
}

export async function getAllEvents() {
    return await axios.get("http://localhost:8000/api/get-events", {
      withCredentials: true,
    });
}