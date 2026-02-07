#!/bin/bash

# AI Study Planner - Quick Setup Script
# This script will set up the AI Study Planner project

echo "🚀 Setting up AI Study Planner..."
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Check for .env.local
if [ ! -f ".env.local" ]; then
    echo "⚠️  Creating .env.local file..."
    cat > .env.local << 'EOF'
# Add your Gemini API key here
GEMINI_API_KEY=your_gemini_api_key_here
EOF
    echo "❗ IMPORTANT: Edit .env.local and add your Gemini API key!"
    echo "   Get your key from: https://makersuite.google.com/app/apikey"
else
    echo "✅ .env.local file exists"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Edit .env.local and add your Gemini API key"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "🎨 Features:"
echo "  • Light/Dark mode toggle"
echo "  • AI-powered scheduling"
echo "  • Interactive dashboard"
echo "  • Smooth animations"
echo ""
