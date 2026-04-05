// Import React
import React from "react";

// Import resume templates
import ModernTemplate from "../assets/templates/ModernTemplate";
import MinimalTemplate from "../assets/templates/MinimalTemplate";
import MinimalImageTemplate from "../assets/templates/MinimalImageTemplate";
import ClassicTemplate from "../assets/templates/ClassicTemplate";

/**
 * ResumePreview Component
 *
 * Renders a resume preview based on the selected template.
 *
 * @param {Object} data - Resume data (personal info, experience, education, etc.)
 * @param {string} template - Selected template type (modern, minimal, minimal_image, classic)
 * @param {string} accentColor - Accent color applied to the template
 * @param {string} classes - Optional custom CSS classes
 */
const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  
  /**
   * Returns the appropriate resume template
   * based on the selected template type.
   */
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;

      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;

      case "minimal_image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;

      // Default template (classic)
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className={classes}>
      {/* Render the selected resume template */}
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
