export const templates = {
  email: {
    label: "Write a business email",
    goal: "Write a business email to a client explaining a new pricing model.",
    context:
      "We recently introduced a new tiered pricing structure for enterprise customers.",
    details: "Professional tone, about 120 words",
    steps: "Open with a greeting, explain pricing, include contact info",
    refine: "Ensure the tone remains polite and confident",
  },
  summary: {
    label: "Summarize a text for a newsletter",
    goal: "Summarize a text for a newsletter",
    context: "A 2,000-word article on electric vehicle trends in 2024",
    details: "Concise, informative, ~80 words",
    steps: "Summarize in 3 bullets, then write 1 headline",
    refine: "Make sure technical jargon is minimized",
  },
  ideas: {
    label: "Generate social media post",
    goal: "Generate social media post ideas for a fitness brand",
    context: "Client runs a wellness blog and fitness coaching program",
    details: "Casual, upbeat tone, emoji-friendly",
    steps: "List 5 post ideas, each with a title + hook",
    refine: "Add seasonal relevance where possible",
  },
};
