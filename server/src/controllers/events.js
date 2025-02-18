const db = require("../db");

// Create an event
exports.createEvent = async (req, res) => {
  const { event_name, event_date, location, club_id } = req.body;

  try {
    const { rows } = await db.query(
      "INSERT INTO events (event_name, event_date, location, club_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [event_name, event_date, location, club_id]
    );
    res.status(201).json({ event: rows[0] });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ message: "Error creating event" });
  }
};

// Fetch all events
exports.getAllEvents = async (req, res) => {
    try {
        const { rows } = await db.query(
        `
            SELECT * FROM events ORDER BY event_date DESC
        `
        );
        res.status(200).json({ events: rows });
    } catch (error) {
        console.error("Error fetching events:", error.message);
        res.status(500).json({ message: "Error fetching events" });
    }
};