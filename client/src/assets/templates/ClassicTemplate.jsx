import { Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const containerStyle = {
    maxWidth: 980,
    margin: "0 auto",
    padding: 34,
    background: "#fff",
    color: "#111827",
    lineHeight: 1.55,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
  };

  const sectionTitleStyle = {
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0.5,
    color: accentColor,
    margin: "0 0 10px",
    textTransform: "uppercase",
  };

  return (
    <div style={containerStyle}>
      <header
        style={{
          textAlign: "center",
          borderBottom: `2px solid ${accentColor}`,
          paddingBottom: 18,
          marginBottom: 24,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 34, fontWeight: 900, color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 14,
            marginTop: 12,
            color: "#6b7280",
            fontSize: 13,
          }}
        >
          {data.personal_info?.email && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Mail size={14} />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Phone size={14} />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MapPin size={14} />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Linkedin size={14} />
              <span style={{ wordBreak: "break-word" }}>{data.personal_info.linkedin}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Globe size={14} />
              <span style={{ wordBreak: "break-word" }}>{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      {data.professional_summary ? (
        <section style={{ marginBottom: 22 }}>
          <div style={sectionTitleStyle}>Professional Summary</div>
          <p style={{ margin: 0, color: "#374151", whiteSpace: "pre-line" }}>
            {data.professional_summary}
          </p>
        </section>
      ) : null}

      {data.experience?.length ? (
        <section style={{ marginBottom: 22 }}>
          <div style={sectionTitleStyle}>Professional Experience</div>
          <div>
            {data.experience.map((exp, idx) => (
              <div
                key={idx}
                style={{
                  borderLeft: `4px solid ${accentColor}`,
                  paddingLeft: 14,
                  marginBottom: 14,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "baseline" }}>
                  <div>
                    <div style={{ fontWeight: 900 }}>{exp.position}</div>
                    <div style={{ color: "#374151", fontWeight: 700 }}>{exp.company}</div>
                  </div>
                  <div style={{ color: "#6b7280", fontSize: 13, whiteSpace: "nowrap" }}>
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </div>
                </div>

                {exp.description ? (
                  <div style={{ marginTop: 8, color: "#374151", whiteSpace: "pre-line" }}>
                    {exp.description}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.project?.length ? (
        <section style={{ marginBottom: 22 }}>
          <div style={sectionTitleStyle}>Projects</div>
          <div>
            {data.project.map((proj, idx) => (
              <div
                key={idx}
                style={{
                  borderLeft: `3px solid rgba(17,24,39,0.14)`,
                  paddingLeft: 12,
                  marginBottom: 12,
                }}
              >
                <div style={{ fontWeight: 900 }}>{proj.name}</div>
                {proj.description ? (
                  <div style={{ marginTop: 4, color: "#374151", whiteSpace: "pre-line" }}>
                    {proj.description}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.education?.length ? (
        <section style={{ marginBottom: 22 }}>
          <div style={sectionTitleStyle}>Education</div>
          <div>
            {data.education.map((edu, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", gap: 18, marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 900 }}>
                    {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                  </div>
                  <div style={{ color: "#374151", fontWeight: 700 }}>{edu.institution}</div>
                  {edu.gpa ? (
                    <div style={{ marginTop: 4, color: "#6b7280", fontSize: 13 }}>
                      GPA: {edu.gpa}
                    </div>
                  ) : null}
                </div>
                <div style={{ color: "#6b7280", fontSize: 13, whiteSpace: "nowrap" }}>
                  {formatDate(edu.graduation_date)}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.skills?.length ? (
        <section style={{ marginBottom: 0 }}>
          <div style={sectionTitleStyle}>Core Skills</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {data.skills.map((skill, idx) => (
              <div key={idx} style={{ color: "#374151", fontWeight: 700 }}>
                • {skill}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default ClassicTemplate;

