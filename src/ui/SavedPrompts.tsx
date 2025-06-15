import React, { useEffect, useState } from "react";
import {
  savePrompt,
  loadPrompts,
  deletePrompt,
  updatePrompt,
  reorderPrompts,
  SavedPrompt,
} from "@/utils/storage";
import {downloadContent} from "@/utils/actions.ts";
import {PromptRecord} from "@/types";

export default function SavedPrompts() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);

  useEffect(() => {
    loadPrompts().then(setPrompts);
  }, []);

  const remove = async (id: string) => {
    await deletePrompt(id);
    setPrompts(await loadPrompts());
  };

  const update = async (id: string, prompt: PromptRecord) => {
    await updatePrompt(id, prompt);
    setPrompts(await loadPrompts());
  };

  const move = async (from: number, to: number) => {
    const indexes = prompts.map((_, i) => i);
    indexes.splice(to, 0, indexes.splice(from, 1)[0]);
    await reorderPrompts(indexes);
    setPrompts(await loadPrompts());
  };

  return (
    <div className="space-y-2">
      <ul id="savedList" className="saved-list">
        {prompts.map((p, idx) => (
          <li key={idx}>
            <div className="flex">
              <div className="flex w-3/5">{p.id}: {p.prompt?.text}</div>
              <div className="flex w-2/5">
                <button
                  className="border px-2"
                  onClick={() => navigator.clipboard.writeText(p.prompt.text)}
                >
                  Copy
                </button>
                <button className="border px-2" onClick={() => remove(p.id)}>
                  Delete
                </button>
                <button className="border px-2" onClick={() => downloadContent(p.prompt.text, `${p.id}.txt`, 'text/plain')}>
                  Download
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
