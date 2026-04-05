import React, { useMemo, useState } from "react";
import { Check } from "lucide-react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = useMemo(
    () => [
      { name: "Blue", value: "#0000FF" },
      { name: "Indigo", value: "#00008B" },
      { name: "Purple", value: "#800080" },
      { name: "Green", value: "#008000" },
      { name: "Red", value: "#FF0000" },
      { name: "Orange", value: "#FFA500" },
      { name: "Lime", value: "#00FF00" },
      { name: "Pink", value: "#FFC0CB" },
      { name: "Gray", value: "#808080" },
      { name: "Black", value: "#000000" },
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
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          Accent
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: selectedColor,
              display: "inline-block",
              marginLeft: 10,
              border: "1px solid rgba(0,0,0,0.12)",
            }}
          />
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: 260,
            background: "#fff",
            border: "1px solid var(--border)",
            borderRadius: 14,
            boxShadow: "var(--shadow)",
            padding: 10,
            zIndex: 20,
          }}
        >
          {colors.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "10px 10px",
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
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 999,
                    background: color.value,
                    border: "1px solid rgba(0,0,0,0.12)",
                    display: "inline-block",
                  }}
                />
                {color.name}
              </span>
              {selectedColor === color.value ? <Check size={18} /> : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;

