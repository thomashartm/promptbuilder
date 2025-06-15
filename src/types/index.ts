export type PromptParam = {
  name: string;
  value: string | string[];
}

export type PromptRecord = {
  id: string;
  text: string;
  frameworkIdId: string;
  params: PromptParam[];
}

export interface SavedPrompt {
  id: string;
  prompt: PromptRecord;
}
