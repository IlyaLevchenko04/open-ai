# AI Text Paraphraser by JustDone

Transform your writing from good to great with our AI-powered Paraphraser tool. This web app leverages advanced AI models (OpenAI and Google Gemini) to help you humanize, rephrase, and improve your text with ease.

## Features
- **AI-Powered Paraphrasing**: Uses both OpenAI and Gemini models with automatic fallback for reliability.
- **Simple UI**: Paste, type, or use sample text. One click to paraphrase.
- **Fast & Secure**: Your text is processed securely via API.
- **Modern Stack**: Built with Next.js, React, Tailwind CSS, and MUI.

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd openAI-proj
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up API Keys
Create a `.env.local` file in the project root with the following variables:
```env
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key
```
You can obtain API keys from [OpenAI](https://platform.openai.com/) and [Google AI Studio](https://aistudio.google.com/).

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
1. Enter or paste your text in the input area.
2. Click **Paraphrase**.
3. View the paraphrased result below.
4. Use the clear button to reset and try again.

## Project Structure
- `src/app/` – Next.js app directory and API routes
- `src/features/` – Main paraphrasing UI logic
- `src/services/` – AI provider integrations (OpenAI, Gemini)
- `src/utils/ai/` – AI manager with provider fallback logic
- `src/shared/texts/` – UI text and descriptions

## License
MIT
