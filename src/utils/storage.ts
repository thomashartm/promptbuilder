import {PromptRecord} from "@/types";

export interface SavedPrompt {
  id: string;
  prompt: PromptRecord;
}

const STORAGE_KEY = 'saved_prompts';

export async function loadPrompts(): Promise<SavedPrompt[]> {
  const result = await browser.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] ?? [];
}

export async function savePrompt(prompt: PromptRecord) {
  const prompts = await loadPrompts();
  prompts.push({ id: Date.now().toString(), prompt });
  await browser.storage.local.set({ [STORAGE_KEY]: prompts });
}

export async function deletePrompt(id: string) {
  const prompts = await loadPrompts();
  await browser.storage.local.set({
    [STORAGE_KEY]: prompts.filter(p => p.id !== id),
  });
}

export async function updatePrompt(id: string, prompt: PromptRecord) {
  const prompts = await loadPrompts();
  await browser.storage.local.set({
    [STORAGE_KEY]: prompts.map(p => (p.id === id ? { ...p, prompt } : p)),
  });
}

export async function reorderPrompts(indexes: number[]) {
  const prompts = await loadPrompts();
  const newOrder = indexes.map(i => prompts[i]);
  await browser.storage.local.set({ [STORAGE_KEY]: newOrder });
}
