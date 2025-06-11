import { templates } from "./templates.js";
import { templateCategories } from "./template-categories.js";

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const resultBox = document.getElementById("result");
  const savedList = document.getElementById("savedList");

  document.addEventListener("DOMContentLoaded", () => {
    populateTemplates(); // show all by default
  });

  // Notification function
  function showNotification(message) {
    const note = document.getElementById("notification");
    note.textContent = message;
    note.classList.remove("hidden");

    clearTimeout(note._timeout);
    note._timeout = setTimeout(() => {
      note.classList.add("hidden");
    }, 10000);
  }

  // Generate Prompt
  document.getElementById("generateBtn").addEventListener("click", () => {
    const goal = document.getElementById("goal").value.trim();
    const context = document.getElementById("context").value.trim();
    const details = document.getElementById("details").value.trim();
    const steps = document.getElementById("steps").value.trim();
    const refine = document.getElementById("refine").value.trim();

    if (!goal && !context && !details && !steps && !refine) {
      showNotification("⚠️ No content to generate a prompt.");
      return;
    }

    let prompt = "";

    if (goal) prompt += `🎯 Goal:\n${goal}\n\n`;
    if (context) prompt += `📄 Context:\n${context}\n\n`;
    if (details) prompt += `🛠️ Details:\n${details}\n\n`;
    if (steps) prompt += `🧩 Steps:\n${steps}\n\n`;
    if (refine) prompt += `🪄 Refine:\n${refine}\n`;

    document.getElementById("result").value = prompt.trim();
    showNotification("✅ Prompt generated!");
  });

  // Copy Prompt
  document.getElementById("copyBtn").addEventListener("click", async () => {
    const text = resultBox.value;
    try {
      const text = document.getElementById("result")?.value;
      if (!text) {
        showNotification("⚠️ Nothing to copy.");
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        console.log("Copied text:", text); // Debug
        showNotification("✅ Prompt copied to clipboard!");
      } catch (err) {
        console.error("Clipboard write failed:", err);
        showNotification("❌ Copy failed.");
      }
    } catch (err) {
      console.error(err);
      showNotification("❌ Copy failed.");
    }
  });

  // Share Prompt
  document.getElementById("shareBtn").addEventListener("click", async () => {
    const text = resultBox.value;
    if (navigator.share) {
      try {
        await navigator.share({ text });
        showNotification("📤 Shared successfully!");
      } catch (err) {
        console.error(err);
        showNotification("❌ Share failed.");
      }
    } else {
      showNotification("⚠️ Web Share API not supported.");
    }
  });

  // Save Prompt to local storage
  document.getElementById("saveBtn").addEventListener("click", async () => {
    const text = resultBox.value.trim();
    if (!text) {
      showNotification("⚠️ Nothing to save.");
      return;
    }

    const { prompts = [] } = await browser.storage.local.get("prompts");
    const newPrompts = [text, ...prompts].slice(0, 20);
    await browser.storage.local.set({ prompts: newPrompts });
    showNotification("💾 Prompt saved!");
    loadSavedPrompts(); // refresh
  });

  // Load saved prompts into history tab
  async function loadSavedPrompts() {
    const { prompts = [] } = await browser.storage.local.get("prompts");
    savedList.innerHTML = "";
    prompts.forEach((text, index) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = text.slice(0, 80) + (text.length > 80 ? "…" : "");
      span.title = text;
      span.style.cursor = "pointer";
      span.addEventListener("click", () => {
        resultBox.value = text;
        document.getElementById("tab-builder").click(); // switch tab
      });

      const copyBtn = document.createElement("button");
      copyBtn.className = "list-icon";
      copyBtn.innerHTML = `
        <svg class="icon"><use href="icons/symbols.svg#icon-copy" /></svg>
      `;
      copyBtn.title = "Copy prompt";
      copyBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(text);
          showNotification("📋 Prompt copied to clipboard!");
        } catch (err) {
          console.error("Clipboard error:", err);
          showNotification("❌ Failed to copy.");
        }
      });

      const del = document.createElement("button");
      del.className = "list-icon";
      del.innerHTML = `
        <svg class="icon">
          <use href="icons/symbols.svg#icon-delete"></use>
        </svg>
      `;
      del.title = "Delete prompt";
      del.addEventListener("click", async (e) => {
        e.stopPropagation(); // prevent triggering span click
        const newPrompts = prompts.filter((_, i) => i !== index);
        await browser.storage.local.set({ prompts: newPrompts });
        showNotification("🗑️ Prompt deleted");
        loadSavedPrompts(); // refresh
      });

      li.appendChild(span);
      li.appendChild(copyBtn);
      li.appendChild(del);
      savedList.appendChild(li);
    });
  }

  // Load saved prompts on start
  loadSavedPrompts();

  // Load templates
  document.getElementById("templateSelect").addEventListener("change", (e) => {
    const tpl = templates[e.target.value];
    if (tpl) {
      document.getElementById("goal").value = tpl.goal;
      document.getElementById("context").value = tpl.context;
      document.getElementById("details").value = tpl.details;
      document.getElementById("steps").value = tpl.steps;
      document.getElementById("refine").value = tpl.refine;
      showNotification("📋 Template loaded.");
    }
  });

  const categorySelect = document.getElementById("categoryFilter");
  const templateSelect = document.getElementById("templateSelect");

  function populateTemplates(selectedCategory = "") {
    templateSelect.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "-- Select Template --";
    templateSelect.appendChild(defaultOption);

    for (const [key, template] of Object.entries(templates)) {
      if (!selectedCategory || template.category === selectedCategory) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = template.label;
        templateSelect.appendChild(option);
      }
    }
  }

  categorySelect.addEventListener("change", (e) => {
    populateTemplates(e.target.value);
  });

  function populateCategorySelect() {
    categorySelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "-- All --";
    categorySelect.appendChild(defaultOption);

    templateCategories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  }

  populateCategorySelect();

  function download(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }

  document
    .getElementById("exportJsonBtn")
    .addEventListener("click", async () => {
      const { prompts = [] } = await browser.storage.local.get("prompts");
      download(
        JSON.stringify(prompts, null, 2),
        "saved-prompts.json",
        "application/json",
      );
    });

  document
    .getElementById("exportTxtBtn")
    .addEventListener("click", async () => {
      const { prompts = [] } = await browser.storage.local.get("prompts");
      download(prompts.join("\n\n---\n\n"), "saved-prompts.txt", "text/plain");
    });

  // Tab switching
  document.getElementById("tab-builder").addEventListener("click", () => {
    document.getElementById("tab-builder").classList.add("active");
    document.getElementById("tab-history").classList.remove("active");
    document.getElementById("tab-content-builder").classList.add("active");
    document.getElementById("tab-content-history").classList.remove("active");
  });

  document.getElementById("tab-history").addEventListener("click", () => {
    document.getElementById("tab-history").classList.add("active");
    document.getElementById("tab-builder").classList.remove("active");
    document.getElementById("tab-content-history").classList.add("active");
    document.getElementById("tab-content-builder").classList.remove("active");
  });
});
