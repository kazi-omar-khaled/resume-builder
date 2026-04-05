import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../config/api.js";
import { login, setLoading } from "../app/features/authSlice.js";
import { toast } from "../utils/toast.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialMode = useMemo(() => {
    const query = new URLSearchParams(window.location.search);
    const urlState = query.get("state");
    return urlState === "register" || urlState === "signup" ? "signup" : "login";
  }, []);

  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      if (mode === "login") {
        const { data } = await api.post("/api/users/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", data.token);
        dispatch(login({ token: data.token, user: data.user }));
        toast.success("Login successful");
        navigate("/app");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const { data } = await api.post("/api/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", data.token);
      dispatch(login({ token: data.token, user: data.user }));
      toast.success("Account created");
      navigate("/app");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="auth-section">
      <div className="auth-card">
        {mode === "login" ? (
          <>
            <h2 className="auth-title">Login to Your Account</h2>
            <p className="auth-subtext">
              Access your AI-powered resume builder dashboard.
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  className="ui-input"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  className="ui-input"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, password: e.target.value }))
                  }
                  required
                />
              </div>

              <button className="auth-btn ui-btn ui-btn--primary" type="submit">
                Login
              </button>

              <div className="auth-links">
                <span
                  className="switch-link"
                  onClick={() => setMode("signup")}
                  role="button"
                  tabIndex={0}
                >
                  Don’t have an account? Sign Up
                </span>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="auth-title">Create Your Account</h2>
            <p className="auth-subtext">
              Start building AI-generated resumes in minutes.
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  className="ui-input"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  className="ui-input"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  className="ui-input"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, password: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  className="ui-input"
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      confirmPassword: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <button className="auth-btn ui-btn ui-btn--primary" type="submit">
                Create Account
              </button>

              <div className="auth-links">
                <span
                  className="switch-link"
                  onClick={() => setMode("login")}
                  role="button"
                  tabIndex={0}
                >
                  Already have an account? Login
                </span>
              </div>
            </form>
          </>
        )}

        <style>{`
          :root {
            --bg: #f4f6fb;
            --card-bg: #ffffff;
            --text-main: #1a1a1a;
            --text-muted: #555;
            --primary: #5568ff;
            --border: #d5d8e5;
          }

          .auth-section {
            width: 100%;
            min-height: 100vh;
            background: var(--bg);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }

          .auth-card {
            background: var(--card-bg);
            width: 100%;
            max-width: 420px;
            padding: 32px;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
            text-align: center;
          }

          .auth-title {
            font-size: 1.9rem;
            margin-bottom: 8px;
            color: var(--text-main);
          }

          .auth-subtext {
            font-size: 1rem;
            color: var(--text-muted);
            margin-bottom: 26px;
          }

          .auth-form {
            width: 100%;
            text-align: left;
            margin-top: 14px;
          }

          .form-group {
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
          }

          .form-group label {
            margin-bottom: 6px;
            font-size: 0.95rem;
            color: var(--text-main);
            font-weight: 600;
          }

          .auth-btn {
            width: 100%;
            padding: 12px 0;
            margin-top: 10px;
            border: none;
            border-radius: 10px;
            background: var(--primary);
            color: #fff;
            font-size: 1.1rem;
            cursor: pointer;
            transition: 0.25s ease;
          }

          .auth-btn:hover {
            background: #4455e6;
            transform: translateY(-2px);
            box-shadow: 0 5px 14px rgba(85,104,255,0.25);
          }

          .auth-links {
            margin-top: 20px;
            text-align: center;
          }

          .switch-link {
            color: var(--primary);
            font-size: 0.95rem;
            cursor: pointer;
            transition: 0.2s;
            user-select: none;
          }

          .switch-link:hover {
            text-decoration: underline;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Login;

