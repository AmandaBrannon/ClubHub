// pages/MyClubs.js

import React, { useEffect, useState } from "react";
import { getMyClubs, deleteClub, leaveClub } from "../api/clubs";
import Layout from "../components/layout";

const MyClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const loadMyClubs = async () => {
    try {
      const { data } = await getMyClubs();
      if (data.clubs) {
        setClubs(data.clubs);
        setUserId(data.userId);
      } else {
        setClubs([]);
      }
      setError(null);
    } catch (error) {
      console.error(
        "Error fetching clubs:",
        error.response?.data?.message || error.message
      );
      setError("Failed to load your clubs. Please try again.");
      setClubs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyClubs();
  }, []);

  const handleDeleteClub = async (clubId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this club? This action cannot be undone."
      )
    ) {
      try {
        await deleteClub(clubId);
        setClubs(clubs.filter((club) => club.club_id !== clubId));
        alert("Club deleted successfully.");
      } catch (error) {
        console.error(
          "Error deleting club:",
          error.response?.data?.message || error.message
        );
        if (error.response && error.response.status === 403) {
          alert("You are not authorized to delete this club.");
        } else {
          alert("Failed to delete the club. Please try again.");
        }
      }
    }
  };

  const handleLeaveClub = async (clubId) => {
    if (window.confirm("Are you sure you want to leave this club?")) {
      try {
        await leaveClub(clubId);
        setClubs(clubs.filter((club) => club.club_id !== clubId));
        alert("You have left the club.");
      } catch (error) {
        console.error(
          "Error leaving club:",
          error.response?.data?.message || error.message
        );
        alert("Failed to leave the club. Please try again.");
      }
    }
  };

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
          <h1 className="text-center mb-4">My Clubs</h1>

          {loading ? (
            <div className="text-center">
              <p>Loading your clubs...</p>
            </div>
          ) : error ? (
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
                      position: "relative",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-white">{club.name}</h5>
                      <p className="card-text text-white">
                        {club.description}
                      </p>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleLeaveClub(club.club_id)}
                        >
                          Leave
                        </button>
                        {userId === club.creator_id && (
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteClub(club.club_id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white">
              You are not part of any clubs yet.
            </p>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default MyClubs;
