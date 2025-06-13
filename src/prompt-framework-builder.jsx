import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import frameworks from "./prompt-framework-template";

export default function PromptFrameworkBuilder() {
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const [promptPreview, setPromptPreview] = useState("");

  const handleSelectChange = (e) => {
    const fw = frameworks.find((f) => f.id === e.target.value);
    setSelectedFramework(fw);
    setFieldValues({});
    setPromptPreview("");
  };

  const handleChange = (id, value) => {
    setFieldValues((prev) => ({ ...prev, [id]: value }));
  };

  const generatePrompt = () => {
    if (!selectedFramework) return;
    const lines = selectedFramework.fields.map((field) => {
      if (field.type === "static") return field.label;
      const val = fieldValues[field.id];
      return val ? `${field.label}: ${val}` : "";
    });
    setPromptPreview(lines.filter(Boolean).join("\n"));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Prompt Framework Builder</h2>

      <label className="block mb-2">Choose a framework:</label>
      <select className="mb-4 p-2 border rounded" onChange={handleSelectChange}>
        <option value="">-- Select --</option>
        {frameworks.map((fw) => (
          <option key={fw.id} value={fw.id}>
            {fw.name}
          </option>
        ))}
      </select>

      {selectedFramework && (
        <div className="mb-4">
          <p className="mb-2 text-sm text-gray-600">
            {selectedFramework.description}
          </p>
          {selectedFramework.fields.map((field) => (
            <div key={field.id} className="mb-3">
              {field.type === "text" && (
                <Input
                  placeholder={field.label}
                  value={fieldValues[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
              {field.type === "textarea" && (
                <Textarea
                  placeholder={field.label}
                  rows={3}
                  value={fieldValues[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
              {field.type === "static" && (
                <p className="text-sm text-gray-500 italic">{field.label}</p>
              )}
            </div>
          ))}
          <Button onClick={generatePrompt}>Generate Prompt</Button>
        </div>
      )}

      {promptPreview && (
        <div className="mt-4 border rounded p-4 bg-gray-50 whitespace-pre-wrap">
          <h3 className="text-md font-semibold mb-2">Generated Prompt:</h3>
          <p>{promptPreview}</p>
        </div>
      )}
    </div>
  );
}
