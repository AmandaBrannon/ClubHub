import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <nav className="navbar" style={{ backgroundColor: "#000" }}>
      <div className="container">
        <div>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <span className="navbar-brand mb-0 h1" style={{ color: "white" }}>
              Home
            </span>
          </NavLink>
        </div>

        {isAuth ? (
          <div>
            <NavLink to="/dashboard" className="mx-3" style={{ color: "white", textDecoration: "none" }}>
              <span>Dashboard</span>
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink to="/login" style={{ color: "white", textDecoration: "none" }}>
              <span>Login</span>
            </NavLink>

            <NavLink to="/register" className="mx-3" style={{ color: "white", textDecoration: "none" }}>
              <span>Register</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
