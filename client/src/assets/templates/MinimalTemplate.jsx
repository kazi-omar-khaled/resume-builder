const MinimalTemplate = ({ data, accentColor }) => {
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
    padding: 30,
    background: "#fff",
    color: "#111827",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    fontWeight: 400,
    lineHeight: 1.5,
  };

  const headingStyle = (text) => ({
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: 800,
    color: accentColor,
    margin: "0 0 14px",
  });

  const metaStyle = {
    color: "#6b7280",
    fontSize: 13,
    whiteSpace: "nowrap",
  };

  return (
    <div style={pageStyle}>
      <header style={{ marginBottom: 26 }}>
        <h1 style={{ margin: 0, fontSize: 42, fontWeight: 300, letterSpacing: 1 }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10, color: "#6b7280", fontSize: 13 }}>
          {data.personal_info?.email ? <span>{data.personal_info.email}</span> : null}
          {data.personal_info?.phone ? <span>{data.personal_info.phone}</span> : null}
          {data.personal_info?.location ? <span>{data.personal_info.location}</span> : null}
          {data.personal_info?.linkedin ? <span style={{ wordBreak: "break-word" }}>{data.personal_info.linkedin}</span> : null}
          {data.personal_info?.website ? <span style={{ wordBreak: "break-word" }}>{data.personal_info.website}</span> : null}
        </div>
      </header>

      {data.professional_summary ? (
        <section style={{ marginBottom: 24 }}>
          <div style={headingStyle("Summary")}>Summary</div>
          <p style={{ margin: 0, color: "#374151", whiteSpace: "pre-line" }}>
            {data.professional_summary}
          </p>
        </section>
      ) : null}

      {data.experience?.length ? (
        <section style={{ marginBottom: 24 }}>
          <div style={headingStyle("Experience")}>Experience</div>
          {data.experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "baseline" }}>
                <div style={{ fontSize: 16, fontWeight: 800 }}>{exp.position}</div>
                <div style={metaStyle}>
                  {formatDate(exp.start_date)} -{" "}
                  {exp.is_current ? "Present" : formatDate(exp.end_date)}
                </div>
              </div>
              <div style={{ color: "#6b7280", marginTop: 6 }}>{exp.company}</div>
              {exp.description ? (
                <div style={{ marginTop: 8, color: "#374151", whiteSpace: "pre-line" }}>
                  {exp.description}
                </div>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}

      {data.project?.length ? (
        <section style={{ marginBottom: 24 }}>
          <div style={headingStyle("Projects")}>Projects</div>
          {data.project.map((proj, idx) => (
            <div key={idx} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 900 }}>{proj.name}</div>
              {proj.description ? (
                <div style={{ marginTop: 6, color: "#374151", whiteSpace: "pre-line" }}>
                  {proj.description}
                </div>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        {data.education?.length ? (
          <section>
            <div style={headingStyle("Education")}>Education</div>
            {data.education.map((edu, idx) => (
              <div key={idx} style={{ marginBottom: 14 }}>
                <div style={{ fontWeight: 900 }}>
                  {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                </div>
                <div style={{ color: "#6b7280", marginTop: 4 }}>{edu.institution}</div>
                <div style={{ color: "#6b7280", fontSize: 13, marginTop: 4 }}>
                  {formatDate(edu.graduation_date)}
                </div>
              </div>
            ))}
          </section>
        ) : null}

        {data.skills?.length ? (
          <section>
            <div style={headingStyle("Skills")}>Skills</div>
            <div style={{ color: "#374151" }}>{data.skills.join(" • ")}</div>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default MinimalTemplate;

