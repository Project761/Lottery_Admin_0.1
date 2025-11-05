import React, { useState, useEffect } from "react";
import { Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const LOGIN_API = `${BASE_URL}/api/AppUser/LOGIN_AppUser`;

  useEffect(() => {
    const token =
      localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    if (token) onLogin({ alreadyLoggedIn: true });
  }, [onLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!username.trim() || !password) {
      setErrorMsg("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      const payload = { UserName: username.trim(), Password: password, grant_type: "password" };

      const response = await axios.post(LOGIN_API, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      });

      const data = response.data;

      if (data.error === "200") {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("access_token", data.access_token);
        storage.setItem("refresh_token", data.refresh_token);
        storage.setItem("FullName", data.FullName || "");
        storage.setItem("UserID", data.UserID || "");
        storage.setItem("remember_me", remember ? "true" : "false");

        setErrorMsg(null);
        onLogin(data);
      } else {
        setErrorMsg(data.error_description || "Invalid username or password.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (err.response?.data?.error_description) {
        setErrorMsg(err.response.data.error_description);
      } else if (err.code === "ECONNABORTED") {
        setErrorMsg("Request timed out. Please try again.");
      } else {
        setErrorMsg("Unable to connect to the server. Please check your internet or server status.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg d-flex justify-content-center align-items-center vh-100">
      <Card className="login-card shadow-lg border-0" style={{ maxWidth: 420, width: "95%" }}>
        <Card.Header className="text-center login-header">
          <h4 className="mb-0 text-white fw-bold">Sign in</h4>
        </Card.Header>
        <Card.Body className="p-4">
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="small">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="small">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex align-items-center justify-content-between mb-3">
              <Form.Check
                type="switch"
                id="remember"
                label="Remember me"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <small className="text-muted">Forgot password? Contact admin.</small>
            </div>

            <Button variant="danger" type="submit" className="w-100 py-2 login-btn" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" /> Signing in...
                </>
              ) : (
                "LOGIN"
              )}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <a href="https://lottery.arustu.com" className="text-decoration-none small text-primary">
              Back to Home Page
            </a>
          </div>
        </Card.Body>
      </Card>

      <footer className="login-footer text-center text-light mt-3">
        © 2025, made with ❤️ by{" "}
        <a
          href="https://arustutechnology.com"
          target="_blank"
          rel="noreferrer"
          className="text-info fw-semibold text-decoration-none"
        >
          Arustu Technology
        </a>{" "}
        for a better web.
      </footer>
    </div>
  );
};

export default Login;
