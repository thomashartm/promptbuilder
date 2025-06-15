import React, { useState } from "react";
import FrameworkForm from "@/ui/FrameworkForm";
import SavedPrompts from "@/ui/SavedPrompts";

export default function App() {
  const [tab, setTab] = useState<"builder" | "saved">("builder");

  return (
    <div className="w-[400px]">
      <div className="tabs">
        <button className="tab-button" onClick={() => setTab("builder")}>
          Builder
        </button>
        <button className="tab-button" onClick={() => setTab("saved")}>
          Saved
        </button>
      </div>
      {tab === "builder" ? <FrameworkForm /> : <SavedPrompts />}
    </div>
  );
}
