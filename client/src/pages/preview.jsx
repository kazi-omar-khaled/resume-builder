import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";

import api from "../config/api.js";
import ResumePreview from "../components/resumePreview";
import { toast } from "../utils/toast.js";

const Preview = () => {
  const { resumeId } = useParams();

  const printRequested = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("print") === "1";
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/public/${resumeId}`);
      if (data?.resume) setResumeData(data.resume);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeId]);

  useEffect(() => {
    if (!isLoading && resumeData && printRequested) {
      window.setTimeout(() => {
        try {
          window.print();
        } catch {
          // ignore
        }
      }, 350);
    }
  }, [isLoading, printRequested, resumeData]);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <Loader style={{ animation: "spin 1s linear infinite" }} />
        <style>{`
          @keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        `}</style>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <p style={{ fontWeight: 800, marginBottom: 8 }}>Resume not found</p>
        <a href="/" style={{ color: "var(--primary)", fontWeight: 700 }}>
          Go to homepage
        </a>
      </div>
    );
  }

  return (
    <div style={{ padding: 18, maxWidth: 1200, margin: "0 auto" }}>
      <ResumePreview
        data={resumeData}
        template={resumeData.template}
        accentColor={resumeData.accent_color || "#3B82F6"}
      />
    </div>
  );
};

export default Preview;

