import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../app/features/authSlice.js";

const DashboardNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav
      style={{
        width: "100%",
        background: "#ffffff",
        borderBottom: "1px solid #e6e7ee",
        padding: "14px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "68px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/app"
          style={{
            fontSize: "1.35rem",
            fontWeight: "700",
            color: "#1a1a1a",
            textDecoration: "none",
            transition: "0.25s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#5568ff")}
          onMouseLeave={(e) => (e.target.style.color = "#1a1a1a")}
        >
          ResumeAI
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span style={{ fontSize: "1rem", color: "#1a1a1a" }}>
          <p style={{ margin: 0 }}>welcome, {user?.name || "User"}</p>
        </span>

        <button
          onClick={logoutUser}
          style={{
            padding: "7px 16px",
            borderRadius: 8,
            border: "1px solid #5568ff",
            color: "#5568ff",
            background: "transparent",
            fontSize: "0.95rem",
            cursor: "pointer",
            transition: "0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#5568ff";
            e.target.style.color = "#fff";
            e.target.style.boxShadow = "0 4px 10px rgba(85,104,255,0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#5568ff";
            e.target.style.boxShadow = "none";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;

