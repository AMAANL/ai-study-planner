# AI Study Planner for Engineering Students

<img width="1470" height="797" alt="Screenshot 2026-02-07 at 5 21 43 PM" src="https://github.com/user-attachments/assets/1bce8501-47b5-4fd8-a7d8-eef631e5fb60" />

<img width="942" height="588" alt="Screenshot 2026-02-07 at 5 21 58 PM" src="https://github.com/user-attachments/assets/d6d6efe1-30de-4132-8cf6-f4df8abb74fd" />

<img width="1470" height="731" alt="Screenshot 2026-02-07 at 5 22 19 PM" src="https://github.com/user-attachments/assets/bbbeed54-352b-4993-8aa8-78c1302497f7" />

<img width="1465" height="792" alt="Screenshot 2026-02-07 at 5 23 50 PM" src="https://github.com/user-attachments/assets/339b6958-1401-415f-be2f-c807bd28bb7b" />

<img width="1381" height="704" alt="Screenshot 2026-02-07 at 5 55 11 PM" src="https://github.com/user-attachments/assets/16c2ef0d-c1aa-4be7-842e-fc6a0a95d660" />

<img width="1335" height="634" alt="Screenshot 2026-02-07 at 6 37 05 PM" src="https://github.com/user-attachments/assets/fa0e632c-bcd5-450c-9813-6f31f167f641" />


> [!IMPORTANT]
> **🔑 API Key Required**: This app needs a Google Gemini API key to work. See [Quick Start](#-quick-start) for setup instructions.

An intelligent, adaptive study planner that generates personalized schedules using AI reasoning. **No hard-coded rules or dependencies** - all decisions are AI-driven.

## 🎯 Core Features

- **🧠 Semantic Topic Analysis**: AI infers dependencies from topic names, not predefined hierarchies
- **⚡ Cognitive Load Estimation**: Dynamic difficulty assessment based on semantic understanding
- **🎯 Adaptive Priority Scoring**: AI determines factor weights based on your unique situation
- **📅 Smart Scheduling**: Optimizes time allocation with load balancing
- **🔄 Continuous Adaptation**: Rebalances schedule based on confidence updates

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- **A Google Gemini API key** ([Get one FREE here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone and navigate to the project**:
   

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **🔑 CRITICAL: Set up your API key**:
   
   Open `.env.local` in the project root and **replace the placeholder** with your actual Gemini API key:
   
   ```bash
   # Before (won't work):
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # After (replace with your real key):
   GEMINI_API_KEY=AIzaSyD...your_actual_key_from_google
   ```
   
   **Where to get your key:**
   - Visit https://makersuite.google.com/app/apikey
   - Sign in with Google
   - Click "Create API Key"
   - Copy the entire key (starts with `AIzaSy`)

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

> [!WARNING]
> **Without a valid API key**, you'll see "Failed to generate schedule" errors. Make sure to complete step 3 before testing!

## 📖 How to Use

### Step 1: Create Your Profile
- Enter your name, branch, and graduation year
- Set available study hours (weekdays and weekends)
- Choose your preferred study time (morning/afternoon/night)

### Step 2: Add Subjects
- Add subjects with credits and overall confidence (1-5)
- You can add multiple subjects

### Step 3: Add Topics
- For each subject, add topics with:
  - Topic name (e.g., "Dynamic Programming", "Graph Algorithms")
  - Mark as strong/weak/neutral
  - Set confidence level (1-5)

### Step 4: Set Target Date & Generate
- Choose your target completion date
- Click "Generate My Schedule"
- AI analyzes your input and creates a personalized plan

### Viewing Your Schedule

The generated schedule includes:

1. **📅 Weekly Schedule**: Day-by-day breakdown with time slots and cognitive load indicators
2. **📊 Subject Analysis**: Hours allocated per subject with topic breakdowns
3. **🧠 AI Insights**: Complete reasoning for all AI decisions (dependencies, cognitive load, priorities, scheduling)

## 🧪 Example Usage

Try creating a profile with these details to see the AI in action:

**Profile**:
- Name: Alex
- Branch: Computer Science
- Weekday hours: 4
- Weekend hours: 7
- Preferred time: Night

**Subject 1**: Data Structures (4 credits, confidence: 2)
- Topics:
  - "Arrays" (strong, confidence: 4)
  - "Linked Lists" (neutral, confidence: 3)
  - "Binary Trees" (weak, confidence: 2)
  - "Graph Algorithms" (weak, confidence: 1)
  - "Dynamic Programming" (weak, confidence: 1)

**Subject 2**: Operating Systems (3 credits, confidence: 3)
- Topics:
  - "Process Management" (neutral, confidence: 3)
  - "Memory Management" (weak, confidence: 2)
  - "Synchronization" (weak, confidence: 2)

**Target Date**: 3 months from now

The AI will analyze these topics semantically and create a unique schedule specifically for Alex's situation.

## 🎨 Key Design Principles

### 1. No Hard-Coded Rules
- ❌ No predefined topic hierarchies (e.g., Arrays → Trees → Graphs)
- ❌ No static difficulty levels
- ❌ No fixed priority formulas
- ✅ All relationships inferred by AI from semantic analysis

### 2. Explainability
Every decision includes AI reasoning:
- Why certain topics are foundational
- Why specific cognitive loads were assigned
- Why priorities were set
- Why time was allocated in a particular way

### 3. Adaptability
The system can rebalance schedules based on:
- Confidence updates (topics you're struggling with get more time)
- Progress tracking (topics you've mastered get less time)

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │  Next.js + React + Tailwind
│   (User Input)  │
└────────┬────────┘
         │
┌────────▼────────┐
│   API Routes    │  Next.js API Routes
│   (Orchestrate) │
└────────┬────────┘
         │
┌────────▼────────────────┐
│  AI Reasoning Engine    │  Google Gemini 2.0
│  - Topic Analysis       │
│  - Cognitive Load       │
│  - Priority Scoring     │
│  - Schedule Allocation  │
└─────────────────────────┘
```

### AI Call Optimization

The system batches AI calls to minimize API usage:
1. **Topic Analysis** (1 call): Dependencies + Cognitive Load combined
2. **Priority Scoring** (1 call): Dynamic weighting
3. **Schedule Allocation** (1 call): Time allocation strategy
4. **Deterministic Scheduling**: No AI calls - applies AI strategy

Total: **3 AI calls per schedule generation**

## 📂 Project Structure

```
ai-study-planner/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── schedule/
│   │   │       ├── generate/route.ts  # Schedule generation endpoint
│   │   │       └── adapt/route.ts     # Adaptation endpoint
│   │   ├── planner/page.tsx           # Input form
│   │   ├── schedule/page.tsx          # Schedule display
│   │   └── page.tsx                   # Landing page
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── reasoning-engine.ts    # Core AI logic
│   │   │   └── prompt-templates.ts    # AI prompts
│   │   └── gemini-client.ts           # Gemini API wrapper
│   └── types/
│       └── index.ts                   # TypeScript types
```

## 🧠 How AI Reasoning Works

### 1. Topic Dependency Inference
The AI analyzes topic names semantically to determine:
- Which concepts are foundational (based on semantic complexity)
- Which topics require understanding of others (based on conceptual relationships)
- The optimal learning sequence

**Example**: Given topics like "Arrays", "Trees", "Graphs", "Dynamic Programming"
- AI might infer: Arrays are concrete → Trees build on arrays → Graphs need tree understanding → DP requires optimization thinking
- **But**: If the user inputs completely different topics, relationships are inferred from scratch

### 2. Cognitive Load Estimation
For each topic, AI estimates:
- Conceptual difficulty
- Abstractness vs concreteness
- Expected mental effort

**Not based on**: Student confidence (that's used in priority scoring)

### 3. Dynamic Priority Scoring
AI decides how to weight:
- Credits (academic importance)
- Confidence (learning need)
- Cognitive load (scheduling complexity)
- Time urgency (deadline pressure)
- Dependencies (prerequisite chains)

**The weighting adapts** to each student's situation.

### 4. Adaptive Scheduling
- High cognitive load topics → Preferred time slots
- Low cognitive load topics → Non-preferred times
- Foundational topics → Early in schedule
- Balanced daily load → Avoids consecutive high-load topics

## 🔄 Adaptation System

(Note: Full adaptation UI is planned for future enhancement)

The system supports rebalancing via the `/api/schedule/adapt` endpoint:
```json
{
  "currentSchedule": { ... },
  "confidenceUpdates": [
    { "topicName": "Dynamic Programming", "oldConfidence": 1, "newConfidence": 2 }
  ],
  "currentWeek": 2
}
```

AI analyzes confidence changes and reallocates time accordingly.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variable: `GEMINI_API_KEY`
4. Deploy!

### Local Production Build

```bash
npm run build
npm run start
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase URL (for persistence) | No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | No |

*Note*: Supabase integration is optional and can be added for data persistence.

## 🎯 Success Criteria

✅ **Uniqueness**: Different student profiles generate distinctly different schedules  
✅ **Explainability**: Every decision includes specific AI reasoning  
✅ **Zero Hard-Coding**: No static rules, dependencies, or difficulty tables  
✅ **Adaptivity**: Schedules rebalance based on confidence updates  

## 🤝 Contributing

This is a demonstration of AI-driven decision making. Contributions welcome!

## 📄 License

MIT License - feel free to use and modify

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Google Gemini AI](https://ai.google.dev/) - AI reasoning engine
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

**Remember**: This planner is designed to help you study smarter, not harder. The AI adapts to YOU, not the other way around. 🧠✨
