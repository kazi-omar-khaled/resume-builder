import React, { useState } from "react";
import { Plus, Sparkles, X } from "lucide-react";

const SkillsForm = ({ data = [], onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    if (data.includes(trimmed)) return;
    onChange([...data, trimmed]);
    setNewSkill("");
  };

  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div>
      <div>
        <h3 style={{ margin: "0 0 6px" }}>Skills</h3>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          Add your technical and soft skills.
        </p>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 14, alignItems: "center" }}>
        <input
          className="ui-input"
          type="text"
          placeholder="Type a skill and press Enter"
          onChange={(e) => setNewSkill(e.target.value)}
          value={newSkill}
          onKeyDown={handleKeyPress}
        />
        <button
          type="button"
          className="ui-btn ui-btn--primary"
          onClick={addSkill}
          disabled={!newSkill.trim()}
          aria-label="Add skill"
        >
          <Plus size={16} />
        </button>
      </div>

      {data.length > 0 ? (
        <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 10 }}>
          {data.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 10px",
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: 999,
                fontWeight: 700,
              }}
            >
              {skill}
              <button
                type="button"
                className="ui-btn ui-btn--ghost"
                style={{ padding: 6, borderRadius: 999 }}
                onClick={() => removeSkill(index)}
                aria-label={`Remove ${skill}`}
              >
                <X size={16} />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div style={{ marginTop: 18, textAlign: "center", color: "var(--muted)" }}>
          <Sparkles size={34} style={{ marginBottom: 8 }} />
          <div>No skills added yet</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>
            Add relevant skills above
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;

