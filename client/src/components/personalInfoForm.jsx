// Import React
import React from "react";

// Import icons from lucide-react
import {
  Briefcase,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

/**
 * PersonalInfoForm Component
 * --------------------------
 * Collects and manages personal information for the resume,
 * including profile image upload and contact details.
 *
 * Props:
 * @param {Object} data - Personal information data
 * @param {Function} onChange - Callback to update parent state
 * @param {boolean} removeBackground - Toggle for background removal
 * @param {Function} setRemoveBackground - Setter for background removal state
 */
const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  /**
   * Update a specific field in personal info
   *
   * @param {string} field - Field name to update
   * @param {string|File} value - New value for the field
   */
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  /**
   * Configuration for personal information fields
   */
  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: Briefcase, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  /**
   * Generate an image preview URL
   * Supports both uploaded files and existing URLs
   */
  const getImagePreview = () => {
    if (!data?.image) return null;

    return typeof data.image === "string"
      ? data.image
      : URL.createObjectURL(data.image);
  };

  return (
    <div>
      {/* Form Header */}
      <h3>Personal Information</h3>
      <p>Get started with your basic personal details</p>

      {/* Profile Image Upload */}
      <div>
        <label>
          {/* Image Preview or Placeholder */}
          {data?.image ? (
            <img
              src={getImagePreview()}
              alt="Profile preview"
              width={120}
            />
          ) : (
            <div>
              <User size={32} />
              <p>Upload user image</p>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/jpeg, image/png"
            hidden
            onChange={(e) =>
              handleChange("image", e.target.files[0])
            }
          />
        </label>

        {/* Background Removal Toggle (only for uploaded files) */}
        {typeof data?.image === "object" && (
          <div>
            <p>Remove background</p>
            <label>
              <input
                type="checkbox"
                checked={removeBackground}
                onChange={() =>
                  setRemoveBackground((prev) => !prev)
                }
              />
              Enable background removal
            </label>
          </div>
        )}
      </div>

      {/* Personal Information Fields */}
      {fields.map((field) => {
        const Icon = field.icon;

        return (
          <div key={field.key}>
            <label>
              <Icon size={16} />
              {field.label}
              {field.required && <span>*</span>}
            </label>

            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) =>
                handleChange(field.key, e.target.value)
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;
