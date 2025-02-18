// routes/clubs.js

const { Router } = require("express");
const {
  createClub,
  getAllClubs,
  getUserClubs,
  joinClub,
  deleteClub,
  leaveClub,
} = require("../controllers/clubs");
const { userAuth } = require("../middlewares/auth-middleware");

const router = Router();

// Route to create a new club
router.post("/create-clubs", userAuth, createClub);

// Route to get all clubs
router.get("/get-clubs", userAuth, getAllClubs);

// Route to get clubs the user is a member of
router.get("/my-clubs", userAuth, getUserClubs);

// Route to join a club
router.post("/join-clubs", userAuth, joinClub);

// Route to delete a club (Only the creator can delete)
router.delete("/clubs/:clubId", userAuth, deleteClub);

// Route to leave a club
router.post("/clubs/leave/:clubId", userAuth, leaveClub);

module.exports = router;
