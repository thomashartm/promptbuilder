# 🧠 Prompt Builder – Browser Extension

**Prompt Builder** is a Chrome/Firefox browser web extension that helps users craft, customize, and manage prompts for LLMs like ChatGPT, Claude, or Gemini — faster and smarter.

## Why?
Because building prompts is quite a repetitive process and often times I am basically solving similar problems.
And from time to time, some of my prompts are just worth to be reused later on.
As I am using multiple different LLMs, the LLM's history does not help me here either.

That's where prompt builder comes in.

## ✨ Features

- 🛠 **Simple Prompt-building UI** with structured inputs
- 🗋 **Preloaded templates** (email writing, summarization, idea generation)
- 🧠 **Live editable prompt preview**
- ✅ **Copy, share, save** prompt actions
- 📅 **Persistent storage** of recent prompts (in browser)
- 📂 **Saved prompts tab** with preview + delete
- 📌 **Minimal sidebar layout**, fully self-contained
- 🛡 Built with **React.js, Typescript**, **ShadCDNui-style layout**, **SVG icons**

## How to work with it?

![Prompt Builder UI](https://github.com/user-attachments/assets/eab9a14d-0571-4e0d-baba-1bb9f5eab7cf)

Prompt Builder is a Chrome/Firefox sidebar extension.
1. Simply install the extension
2. Craft your prompt and/or use one of the provided templates.
3. (Optional) Save the prompt.
4. Copy the prompt using the copy button and paste it into your favourite LLM's input field.

---

## 📦 Installation (Development)

1. Clone the repo:
   ```bash
   git clone https://github.com/thomashartm/prompt-builder-extension.git
   cd prompt-builder-extension
   ```

2.1 Chrome
   ```bash
   npm run dev:chrome
   ```
   - Open a new tab in the browser that pops up
   - Enable the extension
   - Use the web-extension settings and developer mode to debug the extension

2.2 Firefox:
   - wxt dev mode for FF is not supported ye
   - Open Firefox:
   - Go to `about:debugging`
   - Click **"This Firefox"**
   - Click **"Load Temporary Add-on"**
   - Select `manifest.json` from the project directory

3. The extension will appear as a sidebar icon in the browser.

---

## 🔐 Privacy & Storage

This extension stores:
- Generated prompts in your browser using `browser.storage.local`
- Nothing is sent externally or saved to any server
- GitHub integration (coming soon) will be optional and token-based

---

## 🔧 Tech Stack

- wxt - WebExtension Framework
- React JS
- WebExtension APIs (`browser.storage.local`)
- SVG icons via `<symbol>` sprite
- Local-only

---

## 📌 Roadmap

- [ ] GitHub login to save prompts as Gists
- [ ] Custom categories/tags for saved prompts
- [ ] Pre defined prompts for different audiences
- [x] Export saved prompt history to JSON or TXT
- [ ] Optional sync between devices

---

## 🤝 Contributing

PRs and feature suggestions welcome! If you have wonderfully crafted and powerful prompts, great make a pull request or create an improvement ticket.
If you wan to contribute directly:
1. Fork the repo
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Commit your changes
4. Push and open a PR

---

## 📄 License

MIT License. Free to use, modify, and distribute.

---

## 💡 Author

Built with ❤️ by [thomashartm].
Feel free to reach out with feedback or ideas.
