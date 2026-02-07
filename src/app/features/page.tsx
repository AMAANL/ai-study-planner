'use client';

import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function FeaturesPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display">
            {/* Navigation */}
            <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-slate-900/80 backdrop-blur-md px-6 md:px-20 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white glow-blue">
                            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-white">AI Planner</h2>
                    </div>
                    <nav className="hidden items-center gap-10 md:flex">
                        <a className="text-sm font-medium text-slate-400 transition-colors hover:text-white" href="#features">Features</a>
                        <a className="text-sm font-medium text-slate-400 transition-colors hover:text-white" href="#how-it-works">How it Works</a>
                        <Link href="/planner" className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95 glow-blue">
                            Get Started
                        </Link>
                    </nav>
                </div>
                <ThemeToggle />
            </header>

            <main className="flex-1 pt-24">
                {/* Hero Section */}
                <section className="relative px-6 py-20 md:px-20 lg:py-32">
                    <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-600/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-600 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600"></span>
                            </span>
                            Next-Gen Engineering Tool
                        </div>
                        <h1 className="mb-8 text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600 dark:from-white dark:to-blue-400">
                            Master Complexity with <span className="text-blue-600 dark:text-blue-400">AI Precision</span>
                        </h1>
                        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                            An adaptive environment that synthesizes engineering syllabi into personalized growth paths. Designed for cognitive peak performance.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link href="/planner" className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white transition-all hover:bg-blue-700 glow-blue">
                                Build Your Plan <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                            <Link href="/dashboard" className="rounded-xl border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-white/5 px-8 py-4 text-base font-bold transition-all hover:bg-white/80 dark:hover:bg-white/10">
                                View Dashboard
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Bento Box */}
                <section className="px-6 py-24 md:px-20" id="features">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 flex flex-col items-center text-center">
                            <h2 className="text-3xl font-bold md:text-4xl">Engineered for Excellence</h2>
                            <div className="mt-4 h-1.5 w-24 rounded-full bg-blue-600"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:grid-rows-2 lg:h-[700px]">
                            {/* Feature 1: Semantic Topic Analysis */}
                            <div className="glass-card group relative flex flex-col overflow-hidden rounded-xl p-8 md:col-span-2 hover:scale-[1.02] transition-transform">
                                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl transition-all group-hover:bg-blue-600/30"></div>
                                <div className="mb-auto relative z-10">
                                    <span className="material-symbols-outlined mb-6 text-4xl text-blue-600">psychology</span>
                                    <h3 className="mb-3 text-2xl font-bold">Semantic Topic Analysis</h3>
                                    <p className="text-slate-600 dark:text-slate-400">Our LLM-driven engine breaks down dense engineering textbooks into atomic, learnable concepts.</p>
                                </div>
                            </div>

                            {/* Feature 2: Cognitive Load Balancing */}
                            <div className="glass-card group relative flex flex-col overflow-hidden rounded-xl p-8 md:col-span-2 lg:col-span-1 hover:scale-[1.02] transition-transform">
                                <div className="mb-auto">
                                    <span className="material-symbols-outlined mb-6 text-4xl text-emerald-500">speed</span>
                                    <h3 className="mb-3 text-xl font-bold">Cognitive Load Balancing</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Prevents mental fatigue by spacing high-complexity subjects with lighter sessions.</p>
                                </div>
                            </div>

                            {/* Feature 3: Dynamic Prioritization */}
                            <div className="glass-card group relative flex flex-col overflow-hidden rounded-xl p-8 md:col-span-2 lg:col-span-1 hover:scale-[1.02] transition-transform">
                                <div className="mb-auto">
                                    <span className="material-symbols-outlined mb-6 text-4xl text-amber-500">low_priority</span>
                                    <h3 className="mb-3 text-xl font-bold">Dynamic Priority</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Real-time scheduling shifts based on performance and deadlines.</p>
                                </div>
                            </div>

                            {/* Feature 4: Continuous Adaptation */}
                            <div className="glass-card group relative flex flex-col overflow-hidden rounded-xl p-8 md:col-span-4 lg:col-span-2 hover:scale-[1.02] transition-transform">
                                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                                    <div className="flex-1">
                                        <span className="material-symbols-outlined mb-6 text-4xl text-purple-500">sync_alt</span>
                                        <h3 className="mb-3 text-2xl font-bold">Continuous Adaptation</h3>
                                        <p className="text-slate-600 dark:text-slate-400">The more you use it, the better it understands your learning curve.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Widget */}
                            <div className="glass-card group relative flex items-center justify-center overflow-hidden rounded-xl p-4 lg:col-span-2">
                                <div className="flex w-full items-center justify-around">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600">14k+</div>
                                        <div className="text-xs uppercase tracking-widest text-slate-500">Students</div>
                                    </div>
                                    <div className="h-8 w-[1px] bg-slate-300 dark:bg-white/10"></div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-emerald-500">89%</div>
                                        <div className="text-xs uppercase tracking-widest text-slate-500">Retention Rate</div>
                                    </div>
                                    <div className="h-8 w-[1px] bg-slate-300 dark:bg-white/10"></div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-purple-500">2.4x</div>
                                        <div className="text-xs uppercase tracking-widest text-slate-500">Efficiency</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How it Works */}
                <section className="bg-slate-100/50 dark:bg-slate-800/30 px-6 py-24 md:px-20" id="how-it-works">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-20 text-center">
                            <h2 className="mb-4 text-3xl font-bold md:text-4xl">The Flow of Mastery</h2>
                            <p className="text-slate-600 dark:text-slate-400">How the AI transforms raw data into a roadmap.</p>
                        </div>
                        <div className="relative flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-0">
                            {/* Step 1 */}
                            <div className="group relative flex flex-1 flex-col items-center text-center lg:px-10">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 glow-blue ring-1 ring-blue-600/50 transition-transform group-hover:scale-110">
                                    <span className="material-symbols-outlined text-3xl">upload_file</span>
                                </div>
                                <h4 className="mb-3 text-lg font-bold">Import Syllabus</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Drop your course materials into the dashboard.</p>
                            </div>

                            {/* Step 2 */}
                            <div className="group relative flex flex-1 flex-col items-center text-center lg:px-10">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500 ring-1 ring-purple-500/50 transition-transform group-hover:scale-110">
                                    <span className="material-symbols-outlined text-3xl">hub</span>
                                </div>
                                <h4 className="mb-3 text-lg font-bold">Semantic Map</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">AI maps prerequisites and dependencies automatically.</p>
                            </div>

                            {/* Step 3 */}
                            <div className="group relative flex flex-1 flex-col items-center text-center lg:px-10">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/50 transition-transform group-hover:scale-110">
                                    <span className="material-symbols-outlined text-3xl">calendar_today</span>
                                </div>
                                <h4 className="mb-3 text-lg font-bold">Adaptive Schedule</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Get a dynamic calendar that balances study, life, and rest.</p>
                            </div>

                            {/* Step 4 */}
                            <div className="group relative flex flex-1 flex-col items-center text-center lg:px-10">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/50 transition-transform group-hover:scale-110">
                                    <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                                </div>
                                <h4 className="mb-3 text-lg font-bold">Execute & Refine</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Study with focused sessions while AI adjusts to your pace.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="mx-6 my-20 md:mx-20">
                    <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-blue-600 p-12 text-center text-white glow-blue relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <span className="material-symbols-outlined text-9xl">auto_awesome</span>
                        </div>
                        <div className="relative z-10">
                            <h2 className="mb-6 text-4xl font-bold">Ready to transform your study journey?</h2>
                            <p className="mx-auto mb-10 max-w-xl text-blue-100 text-lg">
                                Join thousands of engineering students who optimize their learning with AI.
                            </p>
                            <Link href="/planner" className="inline-block rounded-xl bg-white px-10 py-4 text-base font-bold text-blue-600 transition-all hover:bg-slate-100 shadow-xl">
                                Create Free Account
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-800 px-6 py-12 md:px-20 bg-white/50 dark:bg-slate-900/50">
                <div className="mx-auto max-w-7xl text-center text-xs text-slate-600 dark:text-slate-400">
                    © 2024 AI Planner Inc. Engineering the future of education.
                </div>
            </footer>
        </div>
    );
}
