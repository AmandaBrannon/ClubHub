import { useState } from "react";
import { onLogin } from "../api/auth";
import Layout from "../components/layout";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await onLogin(values);
      dispatch(authenticateUser());

      localStorage.setItem("isAuth", "true");
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    }
  };

  return (
    <Layout>
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
        <div className="container-fluid py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div
                className="card shadow-lg"
                style={{
                  backgroundColor: "#2a2d2f",
                  border: "1px solid #444654",
                }}
              >
                <div className="card-body p-5">
                  <h1 className="text-center mb-4 text-white">Login</h1>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className="form-floating mb-3">
                      <input
                        onChange={(e) => onChange(e)}
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={values.email}
                        placeholder="Email Address"
                        required
                        style={{
                          backgroundColor: "#444654",
                          color: "white",
                          border: "1px solid #555",
                        }}
                      />
                      <label htmlFor="email" style={{ color: "#bbb" }}>
                        Email Address
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        onChange={(e) => onChange(e)}
                        type="password"
                        value={values.password}
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        style={{
                          backgroundColor: "#444654",
                          color: "white",
                          border: "1px solid #555",
                        }}
                      />
                      <label htmlFor="password" style={{ color: "#bbb" }}>
                        Password
                      </label>
                    </div>

                    {error && (
                      <div
                        style={{
                          color: "red",
                          margin: "10px 0",
                          textAlign: "center",
                        }}
                      >
                        {error}
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
                        Submit
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

export default Login;
