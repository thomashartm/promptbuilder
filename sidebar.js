document.getElementById("generateBtn").addEventListener("click", () => {
  const goal = document.getElementById("goal").value.trim();
  const context = document.getElementById("context").value.trim();
  const details = document.getElementById("details").value.trim();
  const steps = document.getElementById("steps").value.trim();
  const refine = document.getElementById("refine").value.trim();

  const prompt = `
Task: ${goal}
Context: ${context}
Details: ${details}
Steps: ${steps}
Refinement: ${refine}
`;

  const result = document.getElementById("result");
  result.innerText = prompt;
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const text = document.getElementById("result").innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Prompt copied to clipboard!");
  });
});

document.getElementById("shareBtn").addEventListener("click", async () => {
  const text = document.getElementById("result").innerText;
  if (navigator.share) {
    try {
      await navigator.share({ text });
    } catch (err) {
      console.error("Share failed:", err);
    }
  } else {
    alert("Share API not supported in this browser.");
  }
});
