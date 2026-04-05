import React, { useMemo, useState } from "react";
import { Check, LayoutTemplate } from "lucide-react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = useMemo(
    () => [
      { id: "classic", name: "Classic", preview: "Resume format 1" },
      { id: "modern", name: "Modern", preview: "Resume format 2" },
      { id: "minimal_image", name: "Minimal Image", preview: "Resume format 3" },
      { id: "minimal", name: "Minimal", preview: "Resume format 4" },
    ],
    []
  );

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className="ui-btn ui-btn--ghost"
        onClick={() => setIsOpen((p) => !p)}
        aria-expanded={isOpen}
      >
        <LayoutTemplate style={{ marginRight: 8 }} size={16} />
        Template
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: 320,
            background: "#fff",
            border: "1px solid var(--border)",
            borderRadius: 14,
            boxShadow: "var(--shadow)",
            padding: 10,
            zIndex: 20,
          }}
        >
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "12px 10px",
                borderRadius: 12,
                border: "1px solid transparent",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 6,
                color: "var(--text)",
              }}
            >
              <div>
                <div style={{ fontWeight: 800 }}>{template.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  {template.preview}
                </div>
              </div>

              {selectedTemplate === template.id ? (
                <Check size={18} />
              ) : (
                <div style={{ width: 18 }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;

