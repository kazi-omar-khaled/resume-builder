import { Mail, MapPin, Phone } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
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
    display: "grid",
    gridTemplateColumns: "290px 1fr",
    minHeight: 900,
  };

  const sidebarStyle = {
    borderRight: "1px solid rgba(17,24,39,0.10)",
    padding: 30,
  };

  const mainStyle = {
    padding: 30,
  };

  const titleColorStyle = {
    color: accentColor,
  };

  const imageBlock = () => {
    const img = data.personal_info?.image;
    if (!img) return null;

    const isString = typeof img === "string";
    const src = isString ? img : URL.createObjectURL(img);

    return (
      <div style={{ marginBottom: 18 }}>
        <img
          src={src}
          alt="Profile"
          style={{
            width: 108,
            height: 108,
            borderRadius: 999,
            objectFit: "cover",
            border: `6px solid ${accentColor}22`,
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>
    );
  };

  return (
    <div style={pageStyle}>
      <aside style={sidebarStyle}>
        {imageBlock()}

        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 900, color: "#6b7280" }}>
            Contact
          </div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10, color: "#374151" }}>
            {data.personal_info?.phone && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Phone size={14} style={{ color: accentColor }} />
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.email && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Mail size={14} style={{ color: accentColor }} />
                <span>{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <MapPin size={14} style={{ color: accentColor }} />
                <span>{data.personal_info.location}</span>
              </div>
            )}
          </div>
        </div>

        {data.education?.length ? (
          <div style={{ marginTop: 26 }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 900, color: "#6b7280" }}>
              Education
            </div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <div style={{ fontWeight: 900, textTransform: "uppercase", fontSize: 13 }}>{edu.degree}</div>
                  <div style={{ color: "#6b7280", fontWeight: 700, marginTop: 4 }}>{edu.institution}</div>
                  <div style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>
                    {formatDate(edu.graduation_date)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {data.skills?.length ? (
          <div style={{ marginTop: 26 }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 900, color: "#6b7280" }}>
              Skills
            </div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              {data.skills.map((skill, idx) => (
                <div key={idx} style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(17,24,39,0.10)", color: "#374151", fontWeight: 700 }}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </aside>

      <main style={mainStyle}>
        <h1 style={{ margin: 0, fontSize: 42, fontWeight: 900, letterSpacing: 1, ...titleColorStyle }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <div style={{ marginTop: 8, textTransform: "uppercase", letterSpacing: 1.4, fontWeight: 800, fontSize: 13, color: "#6b7280" }}>
          {data.personal_info?.profession || "Profession"}
        </div>

        {data.professional_summary ? (
          <section style={{ marginTop: 22 }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 900, color: accentColor }}>
              Summary
            </div>
            <p style={{ margin: "12px 0 0", color: "#374151", whiteSpace: "pre-line" }}>
              {data.professional_summary}
            </p>
          </section>
        ) : null}

        {data.experience?.length ? (
          <section style={{ marginTop: 22 }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 900, color: accentColor }}>
              Experience
            </div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 18 }}>
              {data.experience.map((exp, idx) => (
                <div key={idx}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
                    <div style={{ fontWeight: 900 }}>{exp.position}</div>
                    <div style={{ color: "#6b7280", fontSize: 12, whiteSpace: "nowrap" }}>
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>
                  <div style={{ marginTop: 4, color: accentColor, fontWeight: 900 }}>{exp.company}</div>
                  {exp.description ? (
                    <div style={{ marginTop: 10, color: "#374151", whiteSpace: "pre-line" }}>{exp.description}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {data.project?.length ? (
          <section style={{ marginTop: 22 }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 900, color: accentColor }}>
              Projects
            </div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 16 }}>
              {data.project.map((project, idx) => (
                <div key={idx}>
                  <div style={{ fontWeight: 900 }}>{project.name}</div>
                  {project.type ? (
                    <div style={{ color: accentColor, fontWeight: 800, marginTop: 4 }}>{project.type}</div>
                  ) : null}
                  {project.description ? (
                    <div style={{ marginTop: 8, color: "#374151", whiteSpace: "pre-line" }}>
                      {project.description}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
};

export default MinimalImageTemplate;

