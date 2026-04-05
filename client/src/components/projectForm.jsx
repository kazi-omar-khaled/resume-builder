import React from "react";
import { Plus, Trash } from "lucide-react";

/**
 * ProjectForm Component
 *
 * Props:
 * - data: Array of project objects
 * - onChange: Function to update the projects list
 */
const ProjectForm = ({ data, onChange }) => {
  /**
   * Add a new empty project entry
   */
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };

    onChange([...data, newProject]);
  };

  /**
   * Remove a project by index
   */
  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  /**
   * Update a specific field in a project
   */
  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div>
      {/* Header Section */}
      <div>
        <h3>Projects</h3>
        <p>Add your projects</p>

        <button type="button" onClick={addProject}>
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* Project List */}
      <div>
        {data.map((project, index) => (
          <div key={index}>
            {/* Project Item Header */}
            <div>
              <h4>Project #{index + 1}</h4>
              <button
                type="button"
                onClick={() => removeProject(index)}
              >
                <Trash size={16} />
              </button>
            </div>

            {/* Project Inputs */}
            <div>
              <input
                type="text"
                placeholder="Project name"
                value={project.name}
                onChange={(e) =>
                  updateProject(index, "name", e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Project type"
                value={project.type}
                onChange={(e) =>
                  updateProject(index, "type", e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Project description"
                value={project.description}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectForm;
