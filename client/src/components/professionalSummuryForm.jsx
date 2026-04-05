import React, { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";

import api from "../config/api.js";
import { toast } from "../utils/toast.js";

const ProfessionalSummuryForm = ({ data = "", onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      const prompt = `enhance my professional summary "${data}"`;

      const { data: res } = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        { headers: { Authorization: token } }
      );

      onChange(res.enhancedContent || "");
      toast.success("Summary enhanced");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
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
          <h3 style={{ margin: "0 0 6px" }}>Professional Summary</h3>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            Add a short, compelling summary for your resume.
          </p>
        </div>

        <button
          type="button"
          className="ui-btn ui-btn--primary"
          disabled={isGenerating || !token}
          onClick={generateSummary}
          style={{ whiteSpace: "nowrap" }}
        >
          {isGenerating ? <Loader2 size={18} /> : <Sparkles size={18} />}
          <span style={{ marginLeft: 8 }}>
            {isGenerating ? "Enhancing..." : "AI enhance"}
          </span>
        </button>
      </div>

      <div style={{ marginTop: 14 }}>
        <textarea
          className="ui-textarea"
          value={data}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          placeholder="Write your professional summary..."
          style={{ resize: "vertical" }}
        />
        <p
          style={{
            margin: "8px 0 0",
            color: "var(--muted)",
            fontSize: 13,
          }}
        >
          Tip: Keep it 2-4 sentences and include a few measurable achievements.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummuryForm;

