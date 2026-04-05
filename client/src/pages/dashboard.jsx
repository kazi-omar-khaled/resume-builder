import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Plus } from "lucide-react";

import api from "../config/api.js";
import dummyResumes from "../assets/dummyResumeData.js";
import { toast } from "../utils/toast.js";

const Modal = ({ children, onClose }) => (
  <div
    onClick={onClose}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 18,
      zIndex: 1000,
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="ui-card"
      style={{ width: "min(440px, 100%)", padding: 22 }}
    >
      {children}
    </div>
  </div>
);

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const colors = useMemo(
    () => ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"],
    []
  );

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes || []);
    } catch (error) {
      setAllResumes(dummyResumes);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) loadAllResumes();
  }, [token]);

  const createResume = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      );

      setAllResumes((prev) => [...prev, data.resume]);
      toast.success(data.message || "Resume created");
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    if (!resumeFile) {
      toast.error("Please choose a PDF file first.");
      return;
    }
    if (!String(title || "").trim()) {
      toast.error("Please enter a title.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", String(title).trim());
      formData.append("resume", resumeFile);

      const { data } = await api.post("/api/ai/upload-resume", formData, {
        headers: { Authorization: token },
      });

      toast.success("Resume uploaded & parsed");
      setTitle("");
      setResumeFile(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (event, resumeId) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify({ title }));

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });

      setAllResumes((prev) =>
        prev.map((r) => (r._id === resumeId ? { ...r, title } : r))
      );
      toast.success(data.message || "Updated");
      setTitle("");
      setEditingId(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this resume?"
      );
      if (!confirm) return;

      const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
        headers: { Authorization: token },
      });

      setAllResumes((prev) => prev.filter((r) => r._id !== resumeId));
      toast.success(data.message || "Deleted");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "60px 24px",
    background: "#f7f9fc",
    minHeight: "calc(100vh - 68px)",
  };

  const innerStyle = {
    width: "100%",
    maxWidth: "1100px",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 22,
    alignItems: "start",
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: 16,
    padding: 22,
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
  };

  return (
    <section style={containerStyle}>
      <div style={innerStyle}>
        <div
          className="ui-card"
          style={cardStyle}
          onClick={() => setShowCreateResume(true)}
          role="button"
          tabIndex={0}
        >
          <div style={{ fontSize: 42, color: "#5568ff" }}>
            <Plus />
          </div>
          <h3 style={{ margin: "10px 0 4px", fontSize: 18 }}>
            Create New Resume
          </h3>
          <p style={{ margin: 0, color: "#6b7280" }}>
            Start from scratch and customize templates.
          </p>
        </div>

        <div
          className="ui-card"
          style={cardStyle}
          onClick={() => setShowUploadResume(true)}
          role="button"
          tabIndex={0}
        >
          <div style={{ fontSize: 42, color: "#16a34a" }}>⬆️</div>
          <h3 style={{ margin: "10px 0 4px", fontSize: 18 }}>
            Upload Resume
          </h3>
          <p style={{ margin: 0, color: "#6b7280" }}>
            Let AI extract data from your resume.
          </p>
        </div>

        {allResumes.map((resume, index) => (
          <div key={resume._id} style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{ flex: 1, cursor: "pointer" }}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
              >
                <div
                  style={{
                    color: colors[index % colors.length],
                    fontWeight: 800,
                    fontSize: 16,
                    marginBottom: 6,
                  }}
                >
                  {resume.title || "Untitled Resume"}
                </div>
                <div style={{ color: "#6b7280", fontSize: 13 }}>
                  Template: {resume.template || "classic"}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  className="ui-btn ui-btn--ghost"
                  onClick={() => {
                    setEditingId(resume._id);
                    setTitle(resume.title || "");
                  }}
                >
                  Edit
                </button>
                <button
                  className="ui-btn ui-btn--ghost"
                  onClick={() => deleteResume(resume._id)}
                >
                  Delete
                </button>
              </div>
            </div>

            {editingId === resume._id && (
              <form
                onSubmit={(e) => editTitle(e, resume._id)}
                style={{ marginTop: 14 }}
              >
                <div className="form-group">
                  <label style={{ fontWeight: 700 }}>Resume title</label>
                  <input
                    className="ui-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button className="ui-btn ui-btn--primary" type="submit">
                    Save
                  </button>
                  <button
                    className="ui-btn ui-btn--ghost"
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setTitle("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>

      {showCreateResume && (
        <Modal onClose={() => setShowCreateResume(false)}>
          <form onSubmit={createResume}>
            <h3 style={{ margin: "0 0 10px" }}>Create Resume</h3>
            <div className="form-group">
              <label style={{ fontWeight: 700 }}>Title</label>
              <input
                className="ui-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Software Engineer Resume"
                required
              />
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button className="ui-btn ui-btn--primary" type="submit">
                Create
              </button>
              <button
                className="ui-btn ui-btn--ghost"
                type="button"
                onClick={() => setShowCreateResume(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showUploadResume && (
        <Modal onClose={() => setShowUploadResume(false)}>
          <form onSubmit={uploadResume}>
            <h3 style={{ margin: "0 0 10px" }}>Upload PDF Resume</h3>

            <div className="form-group">
              <label style={{ fontWeight: 700 }}>Title</label>
              <input
                className="ui-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. John Doe Resume"
                required
              />
            </div>

            <div className="form-group" style={{ marginTop: 12 }}>
              <label style={{ fontWeight: 700 }}>Resume file</label>
              <input
                className="ui-input"
                style={{ padding: 10 }}
                type="file"
                accept="application/pdf,.pdf"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                required
              />
            </div>

            {resumeFile && (
              <div style={{ marginTop: 10, color: "#6b7280" }}>
                Selected: {resumeFile.name}
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button
                className="ui-btn ui-btn--primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Upload"}
              </button>
              <button
                className="ui-btn ui-btn--ghost"
                type="button"
                onClick={() => setShowUploadResume(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
};

export default Dashboard;

