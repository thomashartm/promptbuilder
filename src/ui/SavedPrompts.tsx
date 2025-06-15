import React, { useEffect, useState } from 'react';
import { loadPrompts, deletePrompt, updatePrompt, reorderPrompts, SavedPrompt } from '../utils/storage';

export default function SavedPrompts() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);

  useEffect(() => {
    loadPrompts().then(setPrompts);
  }, []);

  const remove = async (id: string) => {
    await deletePrompt(id);
    setPrompts(await loadPrompts());
  };

  const update = async (id: string, text: string) => {
    await updatePrompt(id, text);
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
      {prompts.map((p, idx) => (
        <div key={p.id} className="border p-2 space-y-1">
          <textarea
            className="border p-1 w-full"
            value={p.text}
            onChange={e => update(p.id, e.target.value)}
          />
          <div className="flex space-x-2">
            <button className="border px-2" onClick={() => navigator.clipboard.writeText(p.text)}>Copy</button>
            <button className="border px-2" onClick={() => remove(p.id)}>Delete</button>
            {idx > 0 && <button className="border px-2" onClick={() => move(idx, idx - 1)}>Up</button>}
            {idx < prompts.length - 1 && <button className="border px-2" onClick={() => move(idx, idx + 1)}>Down</button>}
          </div>
        </div>
      ))}
    </div>
  );
}
