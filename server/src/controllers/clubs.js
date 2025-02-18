// controllers/clubs.js

const db = require("../db");

// Create a new club
exports.createClub = async (req, res) => {
  const { name, description } = req.body;
  const creatorId = req.user.id;

  if (!name || !description) {
    return res.status(400).json({ message: "Name and description are required." });
  }

  try {
    const query = `
      INSERT INTO clubs (name, description, creator_id)
      VALUES ($1, $2, $3) RETURNING club_id, name, description
    `;
    const { rows } = await db.query(query, [name, description, creatorId]);

    // Automatically add the creator as a member of the club
    const clubId = rows[0].club_id;
    await db.query(
      `INSERT INTO club_members (user_id, club_id) VALUES ($1, $2)`,
      [creatorId, clubId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error creating club:", error.message);
    res.status(500).json({ message: "Error creating club" });
  }
};

// Fetch all clubs for browsing
exports.getAllClubs = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM clubs ORDER BY created_at DESC");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching all clubs:", error.message);
    res.status(500).json({ message: "Error fetching clubs" });
  }
};

// Fetch clubs the user is a member of
exports.getUserClubs = async (req, res) => {
  const userId = req.user.id;

  try {
    const { rows } = await db.query(
      `SELECT c.club_id, c.name, c.description, c.creator_id
       FROM clubs c
       JOIN club_members cm ON c.club_id = cm.club_id
       WHERE cm.user_id = $1`,
      [userId]
    );
    res.status(200).json({ userId, clubs: rows });
  } catch (error) {
    console.error("Error fetching user's clubs:", error.message);
    res.status(500).json({ message: "Error fetching user's clubs" });
  }
};

// Join a club
exports.joinClub = async (req, res) => {
  const { club_id } = req.body;
  const userId = req.user.id;

  try {
    await db.query(
      `INSERT INTO club_members (user_id, club_id) VALUES ($1, $2)`,
      [userId, club_id]
    );
    res.status(200).json({ message: "Successfully joined the club" });
  } catch (error) {
    console.error("Error joining club:", error.message);
    res.status(500).json({ message: "Error joining club" });
  }
};

// Delete a club (Only the creator can delete)
exports.deleteClub = async (req, res) => {
  const clubId = req.params.clubId;
  const userId = req.user.id;

  try {
    // Check if the user is the creator of the club
    const { rows } = await db.query(
      `SELECT * FROM clubs WHERE club_id = $1 AND creator_id = $2`,
      [clubId, userId]
    );

    if (rows.length === 0) {
      return res.status(403).json({ message: "You are not authorized to delete this club." });
    }

    // Delete the club
    await db.query(`DELETE FROM clubs WHERE club_id = $1`, [clubId]);

    res.status(200).json({ message: "Club deleted successfully." });
  } catch (error) {
    console.error("Error deleting club:", error.message);
    res.status(500).json({ message: "Error deleting club" });
  }
};

// Leave a club
exports.leaveClub = async (req, res) => {
  const clubId = req.params.clubId;
  const userId = req.user.id;

  try {
    // Check if the user is a member of the club
    const { rows } = await db.query(
      `SELECT * FROM club_members WHERE user_id = $1 AND club_id = $2`,
      [userId, clubId]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "You are not a member of this club." });
    }

    // Delete the membership record
    await db.query(
      `DELETE FROM club_members WHERE user_id = $1 AND club_id = $2`,
      [userId, clubId]
    );

    res.status(200).json({ message: "You have left the club." });
  } catch (error) {
    console.error("Error leaving club:", error.message);
    res.status(500).json({ message: "Error leaving club" });
  }
};
