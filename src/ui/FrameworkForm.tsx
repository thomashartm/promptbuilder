import React, { useState } from "react";
import { FRAMEWORKS, Framework } from "@/frameworks";
import { savePrompt } from "@/utils/storage";

export default function FrameworkForm() {
  const [frameworkId, setFrameworkId] = useState(FRAMEWORKS[0].id);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");

  const framework = FRAMEWORKS.find((f) => f.id === frameworkId)!;

  const handleChange = (name: string, value: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  const generatePrompt = () => {
    const fields = framework.parameters.map(
      (p) => `${p.name}: ${inputs[p.name] || ""}`,
    );
    setResult(fields.join("\n"));
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(result);
  };

  const save = async () => {
    if (result.trim()) {
      await savePrompt(result.trim());
    }
  };

  return (
    <div className="space-y-2">
      <div>
        <label className="block mb-1">Framework</label>
        <select
          className="border p-1 w-full"
          value={frameworkId}
          onChange={(e) => setFrameworkId(e.target.value)}
        >
          {FRAMEWORKS.map((f) => (
            <option key={f.id} value={f.id}>
              {f.id}
            </option>
          ))}
        </select>
        <p className="text-xs mt-1">{framework.description}</p>
      </div>

      {framework.parameters.map((param) => (
        <div key={param.name}>
          <label className="block mb-1">{param.name}</label>
          <textarea
            className="border p-1 w-full"
            rows={2}
            placeholder={param.description}
            value={inputs[param.name] || ""}
            onChange={(e) => handleChange(param.name, e.target.value)}
          ></textarea>
        </div>
      ))}

      <div className="flex space-x-2">
        <button className="border px-2" onClick={generatePrompt}>
          Generate
        </button>
        <button className="border px-2" onClick={copyPrompt}>
          Copy
        </button>
        <button className="border px-2" onClick={save}>
          Save
        </button>
      </div>

      <textarea className="border p-1 w-full" rows={8} value={result} />
    </div>
  );
}
