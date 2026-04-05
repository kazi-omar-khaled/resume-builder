import React, { useState } from "react";
import { Briefcase, Plus, Sparkles, Trash } from "lucide-react";
import { useSelector } from "react-redux";

import api from "../config/api.js";
import { toast } from "../utils/toast.js";

const ExperienceForm = ({ data = [], onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = () => {
    onChange([
      ...data,
      {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
        is_current: false,
      },
    ]);
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateDescription = async (index) => {
    const experience = data[index];
    const prompt = `enhance this job description "${experience.description}" for the position of ${experience.position} at ${experience.company}.`;

    try {
      setGeneratingIndex(index);
      const { data: res } = await api.post(
        "/api/ai/enhance-job-desc",
        { userContent: prompt },
        { headers: { Authorization: token } }
      );

      updateExperience(index, "description", res.enhancedContent || "");
      toast.success("Description enhanced");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <div>
          <h3 style={{ margin: "0 0 6px" }}>Experience</h3>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            Add your work experience.
          </p>
        </div>

        <button
          type="button"
          className="ui-btn ui-btn--primary"
          onClick={addExperience}
        >
          <Plus size={16} /> <span style={{ marginLeft: 8 }}>Add experience</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div style={{ marginTop: 18, textAlign: "center", color: "var(--muted)" }}>
          <Briefcase size={32} style={{ marginBottom: 8 }} />
          <div>No work experience added yet</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>
            Click “Add experience” to get started
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 14 }}>
          {data.map((experience, index) => (
            <div
              key={index}
              className="ui-card"
              style={{ padding: 14, marginBottom: 12 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ fontWeight: 800 }}>Experience #{index + 1}</div>
                <button
                  type="button"
                  className="ui-btn ui-btn--ghost"
                  onClick={() => removeExperience(index)}
                  aria-label="Remove experience"
                >
                  <Trash size={16} />
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                <div>
                  <label style={{ fontWeight: 700, fontSize: 13 }}>Company</label>
                  <input
                    className="ui-input"
                    type="text"
                    placeholder="Company"
                    value={experience.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 700, fontSize: 13 }}>Position</label>
                  <input
                    className="ui-input"
                    type="text"
                    placeholder="Position"
                    value={experience.position}
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                <div>
                  <label style={{ fontWeight: 700, fontSize: 13 }}>Start date</label>
                  <input
                    className="ui-input"
                    type="month"
                    value={experience.start_date}
                    onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 700, fontSize: 13 }}>End date</label>
                  <input
                    className="ui-input"
                    type="month"
                    value={experience.end_date}
                    disabled={experience.is_current}
                    onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={experience.is_current}
                    onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                  />
                  <span style={{ color: "var(--muted)" }}>Currently working here</span>
                </label>
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <label style={{ fontWeight: 700, fontSize: 13 }}>Job description</label>
                  <button
                    type="button"
                    className="ui-btn ui-btn--ghost"
                    disabled={generatingIndex === index || !token}
                    onClick={() => generateDescription(index)}
                  >
                    <Sparkles size={16} />{" "}
                    <span style={{ marginLeft: 8 }}>
                      {generatingIndex === index ? "Enhancing..." : "Enhance with AI"}
                    </span>
                  </button>
                </div>

                <textarea
                  rows={4}
                  className="ui-textarea"
                  placeholder="Describe your role and achievements"
                  value={experience.description}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  style={{ marginTop: 8, resize: "vertical" }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;

