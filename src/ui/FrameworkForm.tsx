import React, { useState } from "react";
import { FRAMEWORKS, Framework } from "@/frameworks";
import { savePrompt } from "@/utils/storage";
import { PromptRecord } from "@/types";

export default function FrameworkForm({
  frameworkId,
  setFrameworkId,
  inputs,
  setInputs,
  setNotification,
}: {
  frameworkId: string | null;
  setFrameworkId: (id: string) => void;
  inputs: Record<string, string>;
  setInputs: (inputs: Record<string, string>) => void;
  setNotification: (message: string) => void;
}) {
  if (!frameworkId) {
    setFrameworkId(FRAMEWORKS[0].id);
  }
  const framework = FRAMEWORKS.find((f) => f.id === frameworkId)!;
  const [result, setResult] = useState("");


  const handleChange = (name: string, value: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  const generatePrompt = () => {
    const fields = framework.parameters.map(
      (p) => `${p.name}: ${inputs[p.name] || ""}`
    );
    console.log(fields.join("\n"));
    setResult(fields.join("\n"));
    setNotification("Prompt generated");
    setTimeout(() => setNotification(""), 3000);
  };

  const copyPrompt = () => {
    if (!result) {
      alert("Please generate a prompt first.");
      return;
    }
    navigator.clipboard.writeText(result);
    setNotification("Prompt copied to clipboard");
    setTimeout(() => setNotification(""), 3000);
  };

  const save = async () => {
    if (Object.keys(inputs).length > 0) {
      const prompt = {
        id: `${frameworkId}-${Date.now()}`,
        text: JSON.stringify(inputs),
        frameworkIdId: frameworkId,
        params: framework.parameters.map((p) => ({
          name: p.name,
          value: inputs[p.name] || "",
        })),
      } as PromptRecord;

      await savePrompt(prompt);
    }
  };

  return (
    <div className="space-y-3 view">
      <div>
        <label className="block mb-1">Prompt Framework</label>
        <select
          className="border p-1 w-full"
          value={frameworkId || ""}
          onChange={(e) => setFrameworkId(e.target.value)}
        >
          {FRAMEWORKS.map((f) => (
            <option key={f.id} value={f.id}>
              {f.id}
            </option>
          ))}
        </select>
        <p className="text-xs mt-1">{framework?.description}</p>
      </div>

      {framework?.parameters.map((param) => (
        <div key={param.name}>
          <label className="block mb-1">{param.name}</label>
          <textarea
            className="border p-1 w-full"
            rows={param.rowSize ?? 2}
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
