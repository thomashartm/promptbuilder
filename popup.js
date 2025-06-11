document.getElementById("promptForm").addEventListener("submit", function(e) {
  e.preventDefault();

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

  document.getElementById("result").innerText = prompt;
});
