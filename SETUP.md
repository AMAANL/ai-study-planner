# 🚀 AI Study Planner - Setup Guide

## ⚠️ IMPORTANT: API Key Required

This application requires a **Google Gemini API key** to function. Follow these steps:

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Step 2: Add API Key to Project

Open the file `.env.local` in the project root and replace the placeholder:

```bash
# Replace this line:
GEMINI_API_KEY=your_gemini_api_key_here

# With your actual key:
GEMINI_API_KEY=AIzaSyD...your_actual_key_here
```

**Important**: 
- The key should start with `AIzaSy`
- Keep this file secure and never commit it to Git
- Without a valid key, the app will show "Failed to generate schedule"

### Step 3: Restart the Development Server

After adding your API key:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## ✅ Quick Verification

Once the server is running with your API key:

1. Open http://localhost:3000
2. Click "Create Your Study Plan"
3. Fill in the form with sample data
4. Click "Generate My Schedule"
5. You should see a personalized schedule with AI reasoning

If you still see "Failed to generate schedule", check that:
- Your API key is valid (starts with `AIzaSy`)
- The `.env.local` file is in the project root
- You restarted the dev server after adding the key

---

## 🎨 UI Note

The app is designed for **dark mode** and will automatically apply dark styling regardless of your system preferences.

---

## 📞 Troubleshooting

**Error: "API key not valid"**
- Check that you copied the full API key from Google AI Studio
- Ensure there are no extra spaces or quotes around the key in `.env.local`
- Verify the key is on the line `GEMINI_API_KEY=...` with no spaces around `=`

**Error: "Failed to generate schedule"**
- Check the terminal for detailed error messages
- Common issues: API quota exceeded, network problems, invalid input

**UI not visible**
- The app uses dark mode - ensure your browser supports it
- Try refreshing the page
- Check browser console for errors (F12)

---

For full documentation, see [README.md](./README.md)
