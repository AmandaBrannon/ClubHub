import React, { useEffect, useState } from "react";
import { getAllClubs, joinClub } from "../api/clubs";
import Layout from "../components/layout";

const BrowseClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const loadClubs = async () => {
    try {
      const { data } = await getAllClubs();
      if (data) {
        setClubs(data);
      } else {
        setClubs([]);
      }
      setError(null);
    } catch (error) {
      console.error("Error fetching clubs:", error.response?.data?.message || error.message);
      setError("Failed to load clubs. Please try again.");
      setClubs([]);
    }
  };

  const handleJoinClub = async (clubId) => {
    try {
      await joinClub(clubId);
      setSuccessMessage("You successfully joined the club!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Error joining club:", error.response?.data?.message || error.message);
      setError("Failed to join the club. Please try again.");
      setTimeout(() => setError(null), 3000);
    }
  };

  useEffect(() => {
    loadClubs();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#1d1f21",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <Layout>
        <div className="container py-5">
          <h1 className="text-center mb-4">Browse Clubs</h1>

          {successMessage && (
            <div className="alert alert-success text-center" role="alert">
              {successMessage}
            </div>
          )}
          {error ? (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          ) : clubs.length > 0 ? (
            <div className="row">
              {clubs.map((club) => (
                <div key={club.club_id} className="col-md-4 mb-4">
                  <div
                    className="card shadow-lg"
                    style={{
                      backgroundColor: "#2a2d2f",
                      border: "1px solid #444654",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-white">{club.name}</h5>
                      <p className="card-text text-white">{club.description}</p>
                      <button
                        onClick={() => handleJoinClub(club.club_id)}
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "#0066cc",
                          borderColor: "#0066cc",
                        }}
                      >
                        Join Club
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white">No clubs available to browse at the moment.</p>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default BrowseClubs;
