export interface FrameworkParameter {
  name: string;
  description: string;
  optional?: boolean;
}

export interface Framework {
  id: string;
  description: string;
  parameters: FrameworkParameter[];
}

export const FRAMEWORKS: Framework[] = [
  {
    id: 'RACE',
    description: 'Defines the AI Role, the Action to perform, provides Context, and specifies the desired Explanation.',
    parameters: [
      { name: 'role', description: 'Specify the role or persona for the AI' },
      { name: 'action', description: 'Describe the action or task required' },
      { name: 'context', description: 'Provide relevant background information' },
      { name: 'explanation', description: 'Clarify the expected explanation or output' },
    ],
  },
  {
    id: 'CARE',
    description: 'Provides Context, specifies the Action, defines the desired Result, and gives an Example output.',
    parameters: [
      { name: 'context', description: 'Background information for the task' },
      { name: 'action', description: 'Action or job to be done' },
      { name: 'result', description: 'Desired goal or outcome' },
      { name: 'example', description: 'Sample output to illustrate expectations' },
    ],
  },
  {
    id: 'APE',
    description: 'Defines the Action, Purpose, and Execution to guide the model.',
    parameters: [
      { name: 'action', description: 'The task or action to perform' },
      { name: 'purpose', description: 'The underlying goal or objective' },
      { name: 'execution', description: 'Description of how the outcome should look' },
    ],
  },
  {
    id: 'CREATE',
    description: 'Specifies Character, Request, Examples, Adjustment, Type of output, and Extras for comprehensive prompts.',
    parameters: [
      { name: 'character', description: 'Role or persona for the AI' },
      { name: 'request', description: 'Primary task or job to be done' },
      { name: 'examples', description: 'Example outputs demonstrating format or style' },
      { name: 'adjustment', description: 'Instructions for refining or improving output' },
      { name: 'typeOfOutput', description: 'Specify the format or structure of the output' },
      { name: 'extras', description: 'Any additional context or constraints', optional: true },
    ],
  },
  {
    id: 'TAG',
    description: 'Defines Task, Action, and Goal to keep prompts focused and measurable.',
    parameters: [
      { name: 'task', description: 'Overall task description' },
      { name: 'action', description: 'Specific action required' },
      { name: 'goal', description: 'End goal or success criteria' },
    ],
  },
  {
    id: 'CREO',
    description: 'Provides Context, Request, Explanation, and Outcome for clarity.',
    parameters: [
      { name: 'context', description: 'Background information' },
      { name: 'request', description: 'Task to be performed' },
      { name: 'explanation', description: 'Details explaining the task' },
      { name: 'outcome', description: 'Desired result or product' },
    ],
  },
  {
    id: 'RISE',
    description: 'Structures prompts with Role, Input, Steps, and Execution.',
    parameters: [
      { name: 'role', description: 'AI persona or role' },
      { name: 'input', description: 'Context and instructions' },
      { name: 'steps', description: 'Ask for step-by-step output' },
      { name: 'execution', description: 'Describe the expected outcome' },
    ],
  },
  {
    id: 'PAIN',
    description: 'Frames the Problem, specifies the Action, requests Information, and outlines Next Steps.',
    parameters: [
      { name: 'problem', description: 'Problem definition or challenge' },
      { name: 'action', description: 'Action to address the problem' },
      { name: 'information', description: 'Details or data needed' },
      { name: 'nextSteps', description: 'Resources or follow-up actions' },
    ],
  },
  {
    id: 'COAST',
    description: 'Combines Context, Objective, Actions, Scenario, and Task for detailed prompts.',
    parameters: [
      { name: 'context', description: 'Background information' },
      { name: 'objective', description: 'Overall goal or aim' },
      { name: 'actions', description: 'Detailed actions required' },
      { name: 'scenario', description: 'Specific situation or problem' },
      { name: 'task', description: 'Primary task to be performed' },
    ],
  },
  {
    id: 'ROSES',
    description: 'Uses Role, Objective, Scenario, Expected solution, and Steps to guide output.',
    parameters: [
      { name: 'role', description: 'AI persona or role' },
      { name: 'objective', description: 'Desired result' },
      { name: 'scenario', description: 'Context or background information' },
      { name: 'expectedSolution', description: 'Describe the outcome or solution' },
      { name: 'steps', description: 'Step-by-step instructions or breakdown' },
    ],
  },
];
