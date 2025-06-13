import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, GripVertical } from "lucide-react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core";

const STORAGE_KEY = "prompt_form_fields";

const FieldTypes = {
  text: "Text",
  textarea: "Textarea",
};

const frameworks = [
  {
    id: "cot",
    name: "Chain of Thought",
    description: "Step-by-step reasoning",
    fields: [
      { id: "question", label: "Question", type: "textarea", required: true },
      {
        id: "rationale",
        label: "Start with: 'Let's think step by step.'",
        type: "static",
      },
    ],
  },
  {
    id: "react",
    name: "ReAct (Reason + Action)",
    description: "Agent-style reasoning with actions and observations",
    fields: [
      {
        id: "context",
        label: "Context or Question",
        type: "textarea",
        required: true,
      },
      {
        id: "actions",
        label: "Possible Actions (e.g. Search, Lookup)",
        type: "textarea",
      },
      {
        id: "final_answer",
        label: "Final Answer (optional placeholder)",
        type: "static",
      },
    ],
  },
  {
    id: "few_shot",
    name: "Few-Shot Prompting",
    description: "Include labeled examples before your query",
    fields: [
      { id: "examples", label: "Examples (input → output)", type: "textarea" },
      { id: "query", label: "Your input", type: "text" },
    ],
  },
  {
    id: "instruction_format",
    name: "Instruction Format",
    description: "Instruction + Input + Response",
    fields: [
      { id: "instruction", label: "Instruction", type: "textarea" },
      { id: "input", label: "Input (optional)", type: "textarea" },
      { id: "response", label: "Response (auto-generated)", type: "static" },
    ],
  },
];

export default frameworks;
