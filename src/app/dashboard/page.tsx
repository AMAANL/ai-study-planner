'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

export default function DashboardPage() {
    const router = useRouter();
    const [userName, setUserName] = useState<string | null>(null);
    const [hasSchedule, setHasSchedule] = useState(false);

    useEffect(() => {
        // Check for existing user data
        const profileData = sessionStorage.getItem('userProfile');
        const scheduleData = sessionStorage.getItem('generatedSchedule');

        if (profileData) {
            const profile = JSON.parse(profileData);
            setUserName(profile.name);
        }

        if (scheduleData) {
            setHasSchedule(true);
        }
    }, []);

    const clearData = () => {
        sessionStorage.removeItem('userProfile');
        sessionStorage.removeItem('generatedSchedule');
        setHasSchedule(false);
        setUserName(null);
    };

    return (
        <div className="min-h-screen p-8 scroll-smooth">
            <ThemeToggle />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12 animate-fade-in">
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600 mb-3">
                        {userName ? `Welcome back, ${userName}!` : 'Dashboard'}
                    </h1>
                    <p className="text-slate-600 dark:text-purple-300 text-lg">
                        Your AI-powered study planning hub
                    </p>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {/* Create New Plan */}
                    <Link
                        href="/planner"
                        className="group bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-200 dark:border-white/20 hover:border-purple-400 dark:hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer animate-slide-up"
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                            Create New Plan
                        </h3>
                        <p className="text-slate-600 dark:text-purple-200 text-sm">
                            Generate a fresh AI-powered study schedule tailored to your needs
                        </p>
                    </Link>

                    {/* View Current Schedule */}
                    <Link
                        href={hasSchedule ? "/schedule" : "/planner"}
                        className="group bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-200 dark:border-white/20 hover:border-purple-400 dark:hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer animate-slide-up"
                        style={{ animationDelay: '0.1s' }}
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                            {hasSchedule ? 'View Schedule' : 'No Schedule Yet'}
                        </h3>
                        <p className="text-slate-600 dark:text-purple-200 text-sm">
                            {hasSchedule
                                ? 'Check your current study schedule and progress'
                                : 'Create your first plan to get started'}
                        </p>
                    </Link>

                    {/* AI Insights */}
                    <Link
                        href={hasSchedule ? "/schedule" : "/planner"}
                        className="group bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-200 dark:border-white/20 hover:border-purple-400 dark:hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer animate-slide-up"
                        style={{ animationDelay: '0.2s' }}
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                            AI Insights
                        </h3>
                        <p className="text-slate-600 dark:text-purple-200 text-sm">
                            Understand how AI prioritized and scheduled your topics
                        </p>
                    </Link>
                </div>

                {/* Features Section */}
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-8 border border-purple-200 dark:border-purple-500/30 mb-8 animate-scale-in">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                        ✨ What Makes This Special
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-purple-500 dark:bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">🧠</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Zero Hard-Coding</h3>
                                <p className="text-slate-600 dark:text-purple-200 text-sm">
                                    All dependencies inferred from semantic analysis, not predefined rules
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-pink-500 dark:bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">💡</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Fully Explainable</h3>
                                <p className="text-slate-600 dark:text-purple-200 text-sm">
                                    Every decision includes AI reasoning - you know why topics are ordered
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-indigo-500 dark:bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">🔄</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Adaptive Learning</h3>
                                <p className="text-slate-600 dark:text-purple-200 text-sm">
                                    Schedule rebalances based on your confidence updates
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-violet-500 dark:bg-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">⚡</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Smart Scheduling</h3>
                                <p className="text-slate-600 dark:text-purple-200 text-sm">
                                    Cognitive load balancing places hard topics during your peak hours
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Management */}
                {hasSchedule && (
                    <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-200 dark:border-white/20 animate-slide-up">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
                                    Data Management
                                </h3>
                                <p className="text-slate-600 dark:text-purple-200 text-sm">
                                    Clear your current schedule and start fresh
                                </p>
                            </div>
                            <button
                                onClick={clearData}
                                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                Clear All Data
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
