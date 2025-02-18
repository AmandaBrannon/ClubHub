import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProtectedInfo, onLogout } from "../api/auth";
import { getAllEvents } from "../api/events";
import Layout from "../components/layout";
import { unauthenticateUser } from "../redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [error, setError] = useState(null);

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.error("Logout Error:", error.response?.data?.message || error.message);
    }
  };

  const loadProtectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();
      setProtectedData(data.info);
    } catch (error) {
      console.error("Error fetching protected info:", error.response?.data?.message || error.message);
      setError("Failed to load user information. Please try again.");
      logout();
    }
  };

  const loadEvents = async () => {
    try {
      const { data } = await getAllEvents();
      setEventList(data.events);
      setError(null);
    } catch (error) {
      console.error("Error fetching events:", error.response?.data?.message || error.message);
      setError("Failed to load events. Please try again.");
    }
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        await loadProtectedInfo();
        await loadEvents();
      } catch (error) {
        console.error("Dashboard initialization error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  return loading ? (
    <Layout>
      <h1 className="text-center text-white">Loading...</h1>
    </Layout>
  ) : (
    <div
      style={{
        backgroundColor: "#1d1f21",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Layout>
        <div className="container py-5 text-white">
          <h1 className="text-center mb-4">ClubHub Dashboard</h1>

          <div className="d-flex justify-content-between mb-4">
            <button
              onClick={logout}
              className="btn btn-outline-danger"
            >
              Logout
            </button>
            <button
              onClick={() => navigate("/create-event")}
              className="btn btn-info"
            >
              Create Event
            </button>
          </div>

          {/* Events Section */}
          <div className="card mb-4" style={{ backgroundColor: "#2a2d2f" }}>
            <div className="card-body">
              <h2 className="card-title text-white">Events</h2>
              <div className="event-list">
                {error ? (
                  <div style={{ color: "red" }}>{error}</div>
                ) : eventList.length > 0 ? (
                  <ul className="list-group">
                    {eventList.map((event) => (
                      <li
                        key={event.event_id}
                        className="list-group-item"
                        style={{
                          backgroundColor: "#2a2d2f",
                          color: "white",
                        }}
                      >
                        <strong>{event.event_name}</strong> - {event.location} (
                        {new Date(event.event_date).toLocaleString()} )
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white">No events available. Create one to get started!</p>
                )}
              </div>
            </div>
          </div>

          {/* Club Management Section */}
          <div className="card" style={{ backgroundColor: "#2a2d2f" }}>
            <div className="card-body">
              <h2 className="card-title text-white">Club Management</h2>
              <div className="d-grid gap-2">
                <button
                  onClick={() => navigate("/create-club")}
                  className="btn btn-secondary"
                >
                  Create Club
                </button>
                <button
                  onClick={() => navigate("/my-clubs")}
                  className="btn btn-secondary"
                >
                  View My Clubs
                </button>
                <button
                  onClick={() => navigate("/browse-clubs")}
                  className="btn btn-secondary"
                >
                  Browse Clubs
                </button>
              </div>
              <h4 className="mt-4 text-center text-white">
                (づ｡◕‿‿◕｡)づ Enjoy your clubs!
              </h4>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
