import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Briefcase,
  Download,
  Eye,
  EyeOff,
  FileText,
  Folder,
  GraduationCap,
  Sparkles,
  Share2,
  User,
} from "lucide-react";

import api from "../config/api.js";
import { toast } from "../utils/toast.js";

import PersonalInfoForm from "../components/personalInfoForm";
import ResumePreview from "../components/resumePreview";
import TemplateSelector from "../components/templateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummuryForm from "../components/professionalSummuryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/projectForm";
import SkillsForm from "../components/SkillsForm";

const normalizeResume = (resume) => {
  const normalized = resume || {};

  return {
    _id: normalized._id || "",
    title: normalized.title || "",
    personal_info: normalized.personal_info || {},
    professional_summary:
      normalized.professional_summary ??
      normalized.professional_summury ??
      "",
    experience: normalized.experience || [],
    education: normalized.education || [],
    project: normalized.project || normalized.projects || [],
    skills: normalized.skills || [],
    template: normalized.template || "classic",
    accent_color:
      normalized.accent_color || normalized.accentColor || "#3B82F6",
    public: Boolean(normalized.public),
  };
};

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const sections = useMemo(
    () => [
      { id: "personal", name: "Personal Info", icon: User },
      { id: "summury", name: "Summary", icon: FileText },
      { id: "experience", name: "Experience", icon: Briefcase },
      { id: "education", name: "Education", icon: GraduationCap },
      { id: "projects", name: "Projects", icon: Folder },
      { id: "skills", name: "Skills", icon: Sparkles },
    ],
    []
  );

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const activeSection = sections[activeSectionIndex];

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
        headers: { Authorization: token },
      });

      if (data.resume) {
        setResumeData(normalizeResume(data.resume));
        document.title = data.resume.title || "ResumeAI Builder";
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (resumeId && token) loadExistingResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeId, token]);

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public })
      );

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });

      if (data.resume) setResumeData(normalizeResume(data.resume));
      else setResumeData((prev) => ({ ...prev, public: !prev.public }));

      toast.success(data.message || "Visibility updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleShare = () => {
    const resumeUrl = `${window.location.origin}/view/${resumeId}`;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      navigator.clipboard?.writeText(resumeUrl);
      toast.success("Share link copied");
    }
  };

  const saveResume = async () => {
    try {
      const updatedResumeData = structuredClone(resumeData);

      const imageValue = updatedResumeData.personal_info?.image;
      const imageIsFile =
        imageValue &&
        typeof imageValue === "object" &&
        typeof imageValue.name === "string";

      if (imageIsFile) {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));

      if (removeBackground) formData.append("removeBackground", "yes");
      if (imageIsFile) formData.append("image", imageValue);

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });

      if (data.resume) setResumeData(normalizeResume(data.resume));
      toast.success(data.message || "Saved");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const downloadResume = () => {
    window.open(
      `/view/${resumeId}?print=1`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div style={{ paddingBottom: 40 }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "18px auto 0",
          padding: "0 18px",
        }}
      >
        <Link
          to="/app"
          style={{
            textDecoration: "none",
            color: "var(--primary)",
            fontWeight: 800,
          }}
        >
          ← Back to dashboard
        </Link>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "18px auto 0",
          padding: "0 18px",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 18,
          alignItems: "start",
        }}
      >
        <div className="ui-card" style={{ padding: 18 }}>
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                height: 6,
                background: "rgba(0,0,0,0.06)",
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${
                    (activeSectionIndex * 100) / (sections.length - 1)
                  }%`,
                  background: "var(--primary)",
                }}
              />
            </div>
            <div
              style={{
                marginTop: 10,
                color: "var(--muted)",
                fontWeight: 800,
              }}
            >
              {activeSection.name}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {activeSection.id === "personal" && (
              <PersonalInfoForm
                data={resumeData.personal_info}
                onChange={(data) =>
                  setResumeData((prev) => ({ ...prev, personal_info: data }))
                }
                removeBackground={removeBackground}
                setRemoveBackground={setRemoveBackground}
              />
            )}

            {activeSection.id === "summury" && (
              <ProfessionalSummuryForm
                data={resumeData.professional_summary}
                onChange={(value) =>
                  setResumeData((prev) => ({
                    ...prev,
                    professional_summary: value,
                  }))
                }
              />
            )}

            {activeSection.id === "experience" && (
              <ExperienceForm
                data={resumeData.experience}
                onChange={(value) =>
                  setResumeData((prev) => ({ ...prev, experience: value }))
                }
              />
            )}

            {activeSection.id === "education" && (
              <EducationForm
                data={resumeData.education}
                onChange={(value) =>
                  setResumeData((prev) => ({ ...prev, education: value }))
                }
              />
            )}

            {activeSection.id === "projects" && (
              <ProjectForm
                data={resumeData.project}
                onChange={(value) =>
                  setResumeData((prev) => ({ ...prev, project: value }))
                }
              />
            )}

            {activeSection.id === "skills" && (
              <SkillsForm
                data={resumeData.skills}
                onChange={(value) =>
                  setResumeData((prev) => ({ ...prev, skills: value }))
                }
              />
            )}

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <TemplateSelector
                  selectedTemplate={resumeData.template}
                  onChange={(template) =>
                    setResumeData((prev) => ({ ...prev, template }))
                  }
                />
                <ColorPicker
                  selectedColor={resumeData.accent_color}
                  onChange={(accent_color) =>
                    setResumeData((prev) => ({ ...prev, accent_color }))
                  }
                />
              </div>

              <button
                type="button"
                className="ui-btn ui-btn--primary"
                onClick={saveResume}
              >
                Save changes
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              {activeSectionIndex !== 0 ? (
                <button
                  type="button"
                  className="ui-btn ui-btn--ghost"
                  onClick={() =>
                    setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                  }
                >
                  Previous
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                className="ui-btn ui-btn--primary"
                onClick={() =>
                  setActiveSectionIndex((prev) =>
                    Math.min(prev + 1, sections.length - 1)
                  )
                }
                disabled={activeSectionIndex === sections.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="ui-card" style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {resumeData.public ? (
                  <button
                    type="button"
                    className="ui-btn ui-btn--primary"
                    onClick={handleShare}
                  >
                    <Share2 size={16} style={{ marginRight: 8 }} />
                    Share
                  </button>
                ) : null}
                <button
                  type="button"
                  className="ui-btn ui-btn--ghost"
                  onClick={changeResumeVisibility}
                >
                  {resumeData.public ? <Eye size={16} /> : <EyeOff size={16} />}
                  <span style={{ marginLeft: 8 }}>
                    {resumeData.public ? "Public" : "Private"}
                  </span>
                </button>
              </div>

              <button
                type="button"
                className="ui-btn ui-btn--ghost"
                onClick={downloadResume}
              >
                <Download size={16} style={{ marginRight: 8 }} />
                Download
              </button>
            </div>
          </div>

          <div className="ui-card" style={{ padding: 12 }}>
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

