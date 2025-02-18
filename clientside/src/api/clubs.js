// api/clubs.js

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = true;

// Create a new club
export async function createClub(clubData) {
  return await axios.post("/create-clubs", clubData);
}

// Get all clubs
export async function getAllClubs() {
  return await axios.get("/get-clubs");
}

// Get clubs the user is a member of
export async function getMyClubs() {
  return await axios.get("/my-clubs");
}

// Join a club
export async function joinClub(clubId) {
  return await axios.post("/join-clubs", { club_id: clubId });
}

// Delete a club (Only the creator can delete)
export async function deleteClub(clubId) {
  return await axios.delete(`/clubs/${clubId}`);
}

// Leave a club
export async function leaveClub(clubId) {
  return await axios.post(`/clubs/leave/${clubId}`);
}
