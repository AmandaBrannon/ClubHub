import React, { useState } from "react";
import { createClub } from "../api/clubs"; // Assuming you have an API function for creating clubs
import Layout from "../components/layout";

const CreateClub = () => {
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null); // Error state for feedback
  const [success, setSuccess] = useState(null); // Success message state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createClub({ name: clubName, description }); // Call API function to create club
      setSuccess("Club created successfully!");
      setError(null); // Clear any previous errors
      setClubName("");
      setDescription("");
    } catch (err) {
      console.error("Error creating club:", err.response?.data?.message || err.message);
      setError("Failed to create the club. Please try again.");
      setSuccess(null); // Clear any previous success message
    }
  };

  return (
    <Layout>
      <div
        style={{
          backgroundColor: "#1d1f21",
          minHeight: "100vh",
          width: "100vw",
          margin: 0,
          padding: 0,
          color: "white",
        }}
        className="d-flex align-items-center justify-content-center"
      >
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
                  <h1 className="text-center mb-4 text-white">
                    Create a New Club
                  </h1>
                  <form onSubmit={handleSubmit}>
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
                    <div className="form-floating mb-3">
                      <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Description"
                        style={{
                          backgroundColor: "#444654",
                          color: "white",
                          border: "1px solid #555",
                          height: "100px",
                        }}
                      />
                      <label htmlFor="description" style={{ color: "#bbb" }}>
                        Description
                      </label>
                    </div>
                    {error && (
                      <div style={{ color: "red", marginBottom: "10px" }}>
                        {error}
                      </div>
                    )}
                    {success && (
                      <div style={{ color: "green", marginBottom: "10px" }}>
                        {success}
                      </div>
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
                        Create Club
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateClub;
