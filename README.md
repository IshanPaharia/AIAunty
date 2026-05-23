# AI Aunty 🧕
> **"She knows best. Always."**

AI Aunty is a fun, dramatic, and loving Single Page Application (SPA) built using React, Vite, and Tailwind CSS. It is powered by the Gemini API (`gemini-3.1-flash-lite`) to simulate a nosy Indian aunty who gives unsolicited advice, compares your achievements to your cousins, asks about your marriage plans, and comments on your life choices—all sprinkled with rich Hindi/Desi expressions (*beta*, *arre*, *haaye*, *bas karo*).

---

## ✨ Features

- **Nosy & Loving AI Personality**: Driven by Gemini with a detailed custom system prompt for accurate cultural humor.
- **Premium Desi Aesthetic**: Clean, high-end terracotta, royal crimson, and warm gold accents with elegant typography (`Outfit` and `Playfair Display`).
- **Interactive Input**: Fill in your own life situations, or instantly use one of the pre-loaded situation chips (*"I quit my job"*, *"I'm dating someone"*, *"I failed my exam"*).
- **WhatsApp Chat Experience**: Aunty's responses are displayed in a clean, authentic WhatsApp-styled chat bubble complete with double blue checkmarks and a quick-action **Ask Again** button.
- **API Key Warning State**: A developer-friendly setup UI warning that guides you if you forget to add your Gemini API Key.
- **Emoji Favicon**: Interactive page icon matches the AI Aunty persona perfectly.

---

## 🛠️ Tech Stack

* **Frontend Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Generative AI SDK**: [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
* **Model**: `gemini-3.1-flash-lite` (highly capable, extremely fast, and cost-efficient for hobby projects)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd AIAunty
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
   > 🔑 *Note: You can get your free/pay-as-you-go API key from [Google AI Studio](https://aistudio.google.com/).*

### Running the App

Start the development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser to start asking Aunty for advice!

### Building for Production

Compile production-ready static assets:
```bash
npm run build
```
The compiled files will be located in the `dist` directory.

---

## 📄 License

This is a hobby project. Feel free to use and customize it!
*Disclaimer: AI Aunty will judge you. Take her advice at your own risk.* 🧡
