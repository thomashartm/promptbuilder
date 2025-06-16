import React, { useState } from "react";
import FrameworkForm from "@/ui/FrameworkForm";
import SavedPrompts from "@/ui/SavedPrompts";
import NotificationField from "@/ui/NotificationField";

export default function App() {
  const [tab, setTab] = useState<"builder" | "saved">("builder");
  const [frameworkId, setFrameworkId] = useState<string | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState<string | null>(null);

  return (
    <div className="w-[400px]">
      <div>
        <NotificationField notification={notification || ""} />
      </div>
      <div className="tabs">
        <button className="tab-button" onClick={() => setTab("builder")}>
          Builder
        </button>
        <button className="tab-button" onClick={() => setTab("saved")}>
          Saved
        </button>
      </div>

      {tab === "builder" ? (
        <FrameworkForm
          frameworkId={frameworkId}
          setFrameworkId={setFrameworkId}
          inputs={inputs}
          setInputs={setInputs}
          setNotification={setNotification}
        />
      ) : ( <SavedPrompts /> )}
    </div>
  );
}
