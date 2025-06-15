export interface SavedPrompt {
  id: string;
  text: string;
}

const STORAGE_KEY = 'saved_prompts';

export async function loadPrompts(): Promise<SavedPrompt[]> {
  const result = await browser.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] ?? [];
}

export async function savePrompt(text: string) {
  const prompts = await loadPrompts();
  prompts.push({ id: Date.now().toString(), text });
  await browser.storage.local.set({ [STORAGE_KEY]: prompts });
}

export async function deletePrompt(id: string) {
  const prompts = await loadPrompts();
  await browser.storage.local.set({
    [STORAGE_KEY]: prompts.filter(p => p.id !== id),
  });
}

export async function updatePrompt(id: string, text: string) {
  const prompts = await loadPrompts();
  await browser.storage.local.set({
    [STORAGE_KEY]: prompts.map(p => (p.id === id ? { ...p, text } : p)),
  });
}

export async function reorderPrompts(indexes: number[]) {
  const prompts = await loadPrompts();
  const newOrder = indexes.map(i => prompts[i]);
  await browser.storage.local.set({ [STORAGE_KEY]: newOrder });
}
