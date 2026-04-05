import { Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const pageStyle = {
    maxWidth: 980,
    margin: "0 auto",
    background: "#fff",
    color: "#111827",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
  };

  const headerStyle = {
    padding: 28,
    background: accentColor,
    color: "#fff",
  };

  const sectionHeader = (text) => (
    <div
      style={{
        fontSize: 18,
        fontWeight: 900,
        margin: "0 0 14px",
        paddingBottom: 10,
        borderBottom: "1px solid rgba(17,24,39,0.12)",
      }}
    >
      {text}
    </div>
  );

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: 40, fontWeight: 300 }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            marginTop: 14,
            fontSize: 13,
            opacity: 0.95,
          }}
        >
          {data.personal_info?.email && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Mail size={14} />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Phone size={14} />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <MapPin size={14} />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Linkedin size={14} />
              <span style={{ wordBreak: "break-word" }}>{data.personal_info.linkedin}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Globe size={14} />
              <span style={{ wordBreak: "break-word" }}>{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      <div style={{ padding: 26 }}>
        {data.professional_summary ? (
          <section style={{ marginBottom: 26 }}>
            <div style={{ ...sectionHeader("Professional Summary"), borderBottom: "none" }}>
              <span style={{ display: "inline-block", paddingBottom: 10, borderBottom: `1px solid rgba(17,24,39,0.12)` }}>
                Professional Summary
              </span>
            </div>
            <p style={{ margin: 0, color: "#374151", whiteSpace: "pre-line", fontSize: 15 }}>
              {data.professional_summary}
            </p>
          </section>
        ) : null}

        {data.experience?.length ? (
          <section style={{ marginBottom: 26 }}>
            {sectionHeader("Experience")}
            {data.experience.map((exp, idx) => (
              <div
                key={idx}
                style={{
                  borderLeft: `4px solid ${accentColor}`,
                  paddingLeft: 14,
                  marginBottom: 18,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "baseline" }}>
                  <div style={{ fontWeight: 900, fontSize: 16 }}>{exp.position}</div>
                  <div style={{ color: "#6b7280", fontSize: 13, whiteSpace: "nowrap" }}>
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </div>
                </div>
                <div style={{ marginTop: 4, color: accentColor, fontWeight: 800 }}>
                  {exp.company}
                </div>
                {exp.description ? (
                  <div style={{ marginTop: 10, color: "#374151", whiteSpace: "pre-line", fontSize: 14 }}>
                    {exp.description}
                  </div>
                ) : null}
              </div>
            ))}
          </section>
        ) : null}

        {data.project?.length ? (
          <section style={{ marginBottom: 26 }}>
            {sectionHeader("Projects")}
            {data.project.map((p, idx) => (
              <div key={idx} style={{ marginBottom: 16, borderLeft: `4px solid rgba(17,24,39,0.08)`, paddingLeft: 14 }}>
                <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 6 }}>{p.name}</div>
                {p.description ? (
                  <div style={{ color: "#374151", whiteSpace: "pre-line", fontSize: 14 }}>
                    {p.description}
                  </div>
                ) : null}
              </div>
            ))}
          </section>
        ) : null}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          {data.education?.length ? (
            <section>
              {sectionHeader("Education")}
              {data.education.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 900 }}>
                    {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                  </div>
                  <div style={{ color: accentColor, fontWeight: 800 }}>{edu.institution}</div>
                  <div style={{ color: "#6b7280", fontSize: 13, marginTop: 4 }}>
                    {formatDate(edu.graduation_date)}{" "}
                    {edu.gpa ? ` • GPA: ${edu.gpa}` : ""}
                  </div>
                </div>
              ))}
            </section>
          ) : null}

          {data.skills?.length ? (
            <section>
              {sectionHeader("Skills")}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {data.skills.map((skill, idx) => (
                  <span
                    key={`${skill}-${idx}`}
                    style={{
                      background: accentColor,
                      color: "#fff",
                      padding: "7px 12px",
                      borderRadius: 999,
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;

