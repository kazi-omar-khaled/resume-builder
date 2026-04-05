import React from "react";
import { GraduationCap, Plus, Trash } from "lucide-react";

/**
 * EducationForm Component
 *
 * Props:
 * - data: Array of education objects
 * - onChange: Function to update education data
 */
const EducationForm = ({ data, onChange }) => {
  /**
   * Add a new empty education entry
   */
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };

    onChange([...data, newEducation]);
  };

  /**
   * Remove an education entry by index
   */
  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  /**
   * Update a specific field in an education entry
   */
  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div>
      {/* Header */}
      <div>
        <h3>Education</h3>
        <p>Add your education details</p>

        <button type="button" onClick={addEducation}>
          <Plus size={16} />
          Add education
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div>
          <GraduationCap size={32} />
          <p>No education added yet</p>
          <p>Click "Add education" to get started</p>
        </div>
      ) : (
        <div>
          {data.map((education, index) => (
            <div key={index}>
              {/* Education Item Header */}
              <div>
                <h4>Education #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                >
                  <Trash size={16} />
                </button>
              </div>

              {/* Education Inputs */}
              <div>
                <input
                  type="text"
                  placeholder="Institution name"
                  value={education.institution}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Degree"
                  value={education.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Field of study"
                  value={education.field}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                />

                <input
                  type="month"
                  value={education.graduation_date}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "graduation_date",
                      e.target.value
                    )
                  }
                />

                <input
                  type="text"
                  placeholder="GPA"
                  value={education.gpa}
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
