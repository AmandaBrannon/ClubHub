import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [clubName, setClubName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/create-events", {
        event_name: eventName,
        event_date: eventDate,
        location: location,
        club_name: clubName, // Send club name to the backend
      });

      setSuccess("Event created successfully!");
      setError(null);
      setEventName("");
      setEventDate("");
      setLocation("");
      setClubName("");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Failed to create the event. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1d1f21",
        minHeight: "100vh",
        width: "100vw",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Layout>
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div
              className="card shadow-lg"
              style={{
                backgroundColor: "#2a2d2f",
                border: "1px solid #444654",
              }}
            >
              <div className="card-body p-5">
                <h1 className="text-center mb-4 text-white">Create a New Event</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="eventName"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      required
                      placeholder="Event Name"
                      style={{
                        backgroundColor: "#444654",
                        color: "white",
                        border: "1px solid #555",
                      }}
                    />
                    <label htmlFor="eventName" style={{ color: "#bbb" }}>
                      Event Name
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="date"
                      className="form-control"
                      id="eventDate"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                      style={{
                        backgroundColor: "#444654",
                        color: "white",
                        border: "1px solid #555",
                      }}
                    />
                    <label htmlFor="eventDate" style={{ color: "#bbb" }}>
                      Event Date
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      placeholder="Location"
                      style={{
                        backgroundColor: "#444654",
                        color: "white",
                        border: "1px solid #555",
                      }}
                    />
                    <label htmlFor="location" style={{ color: "#bbb" }}>
                      Location
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="clubName"
                      value={clubName}
                      onChange={(e) => setClubName(e.target.value)}
                      required
                      placeholder="Club Name"
                      style={{
                        backgroundColor: "#444654",
                        color: "white",
                        border: "1px solid #555",
                      }}
                    />
                    <label htmlFor="clubName" style={{ color: "#bbb" }}>
                      Club Name
                    </label>
                  </div>
                  {error && (
                    <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
                  )}
                  {success && (
                    <div style={{ color: "green", marginBottom: "10px" }}>{success}</div>
                  )}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{
                        backgroundColor: "#0066cc",
                        borderColor: "#0066cc",
                      }}
                    >
                      Create Event
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Layout>
    </div>
  );
};

export default CreateEvent;
