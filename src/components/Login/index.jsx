import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically validate credentials with your backend
    // For now, we'll just check if email and password are not empty
    if (email && password) {
      onLogin(); // This will be handled by the parent component
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <div className="login-bg d-flex justify-content-center align-items-center vh-100">
      <Card className="login-card shadow-lg border-0">
        <Card.Header className="text-center login-header">
          <h4 className="mb-0 text-white fw-bold">Sign in</h4>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex align-items-center mb-3">
              <Form.Check
                type="switch"
                id="remember"
                label="Remember me"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
            </div>

            <Button
              variant="danger"
              type="submit"
              className="w-100 py-2 login-btn"
            >
              LOGIN
            </Button>
          </Form>

          <div className="text-center mt-3">
            <a href="/" className="text-decoration-none small text-primary">
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
