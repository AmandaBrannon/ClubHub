import { useState } from "react";
import { onRegistration } from "../api/auth";
import Layout from "../components/layout";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, email: values.email, password: values.password });

    try {
      const { data } = await onRegistration(values);
      setError("");
      setSuccess(data.message);
      setValues({ email: "", password: "" });
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  return (
    <Layout>
      <div
        style={{
          backgroundColor: "#1d1f21",
          minHeight: "100vh",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={(e) => onSubmit(e)}
          className="p-4 rounded"
          style={{
            backgroundColor: "#2a2d2f",
            width: "100%",
            maxWidth: "500px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <h1 className="text-center mb-4">Register</h1>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">
              Email address
            </label>
            <input
              onChange={(e) => onChange(e)}
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={values.email}
              placeholder="test@gmail.com"
              required
              style={{
                backgroundColor: "#444654",
                color: "white",
                border: "1px solid #555",
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">
              Password
            </label>
            <input
              onChange={(e) => onChange(e)}
              type="password"
              value={values.password}
              className="form-control"
              id="password"
              name="password"
              placeholder="password"
              required
              style={{
                backgroundColor: "#444654",
                color: "white",
                border: "1px solid #555",
              }}
            />
          </div>

          {error && (
            <div style={{ color: "red", margin: "10px 0", textAlign: "center" }}>
              {error}
            </div>
          )}
          {success && (
            <div
              style={{
                color: "green",
                margin: "10px 0",
                textAlign: "center",
              }}
            >
              {success}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: "#0066cc", borderColor: "#0066cc" }}
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
