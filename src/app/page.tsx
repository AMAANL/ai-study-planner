import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 scroll-smooth">
      <ThemeToggle />

      <div className="max-w-4xl w-full text-center">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600">
            AI Study Planner
          </h1>
          <p className="text-xl text-purple-700 dark:text-purple-200">
            AI-Powered Adaptive Scheduling for Engineering Students
          </p>
        </div>

        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-purple-200 dark:border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">
            🧠 Intelligent Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-purple-50 dark:bg-white/5 p-4 rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">
                🔍 Semantic Topic Analysis
              </h3>
              <p className="text-slate-700 dark:text-purple-100 text-sm">
                AI infers dependencies from topic names - no hard-coded rules
              </p>
            </div>
            <div className="bg-pink-50 dark:bg-white/5 p-4 rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              <h3 className="text-lg font-semibold text-pink-700 dark:text-purple-300 mb-2">
                ⚡ Cognitive Load Balancing
              </h3>
              <p className="text-slate-700 dark:text-purple-100 text-sm">
                Smart scheduling based on mental effort estimation
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-white/5 p-4 rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              <h3 className="text-lg font-semibold text-indigo-700 dark:text-purple-300 mb-2">
                🎯 Dynamic Prioritization
              </h3>
              <p className="text-slate-700 dark:text-purple-100 text-sm">
                AI decides factor weights based on your unique situation
              </p>
            </div>
            <div className="bg-violet-50 dark:bg-white/5 p-4 rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              <h3 className="text-lg font-semibold text-violet-700 dark:text-purple-300 mb-2">
                🔄 Continuous Adaptation
              </h3>
              <p className="text-slate-700 dark:text-purple-100 text-sm">
                Rebalances schedule based on your confidence updates
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/planner"
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-all transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
        >
          Create Your Study Plan →
        </Link>

        <div className="mt-12 text-purple-600 dark:text-purple-300 text-sm">
          <p>✨ Fully AI-powered | 🚀 Adaptive | 💡 Explainable</p>
        </div>
      </div>
    </div>
  );
}
