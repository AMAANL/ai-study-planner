'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StudySchedule, StudentProfile } from '@/types';

export default function SchedulePage() {
    const router = useRouter();
    const [schedule, setSchedule] = useState<StudySchedule | null>(null);
    const [profile, setProfile] = useState<StudentProfile | null>(null);
    const [activeTab, setActiveTab] = useState<'schedule' | 'analysis' | 'insights'>('schedule');

    useEffect(() => {
        const scheduleData = sessionStorage.getItem('generatedSchedule');
        const profileData = sessionStorage.getItem('userProfile');

        if (!scheduleData) {
            router.push('/planner');
            return;
        }

        setSchedule(JSON.parse(scheduleData));
        if (profileData) setProfile(JSON.parse(profileData));
    }, [router]);

    if (!schedule) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    const getCognitiveLoadColor = (load: string) => {
        switch (load) {
            case 'high': return 'bg-red-500/20 border-red-500 text-red-200';
            case 'medium': return 'bg-yellow-500/20 border-yellow-500 text-yellow-200';
            case 'low': return 'bg-green-500/20 border-green-500 text-green-200';
            default: return 'bg-gray-500/20 border-gray-500 text-gray-200';
        }
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.push('/planner')}
                        className="text-purple-300 hover:text-purple-200 mb-4"
                    >
                        ← Create New Plan
                    </button>
                    <h1 className="text-4xl font-bold text-white mb-2">
                        {profile?.name ? `${profile.name}'s Study Plan` : 'Your Study Plan'}
                    </h1>
                    <p className="text-purple-300">
                        AI-generated adaptive schedule for {profile?.branch || 'your course'}
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('schedule')}
                        className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'schedule'
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/10 text-purple-300 hover:bg-white/20'
                            }`}
                    >
                        📅 Weekly Schedule
                    </button>
                    <button
                        onClick={() => setActiveTab('analysis')}
                        className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'analysis'
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/10 text-purple-300 hover:bg-white/20'
                            }`}
                    >
                        📊 Subject Analysis
                    </button>
                    <button
                        onClick={() => setActiveTab('insights')}
                        className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'insights'
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/10 text-purple-300 hover:bg-white/20'
                            }`}
                    >
                        🧠 AI Insights
                    </button>
                </div>

                {/* Weekly Schedule Tab */}
                {activeTab === 'schedule' && (
                    <div className="space-y-6">
                        {/* Next 7 Days Focus */}
                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500 rounded-2xl p-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">
                                🎯 Next 7 Days Focus
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {schedule.nextSevenDaysFocus?.slice(0, 6).map((focus, idx) => (
                                    <div key={idx} className="bg-white/10 backdrop-blur rounded-lg p-4">
                                        <div className="font-semibold text-purple-200">{focus.subjectName}</div>
                                        <div className="text-white text-lg">{focus.topicName}</div>
                                        <div className="text-purple-300 text-sm mt-2">{focus.reasoning}</div>
                                        {focus.prerequisiteWarnings && focus.prerequisiteWarnings.length > 0 && (
                                            <div className="mt-2 text-yellow-300 text-xs">
                                                ⚠️ {focus.prerequisiteWarnings[0]}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Weekly Schedules */}
                        {schedule.weeklySchedules?.map((week) => (
                            <div key={week.weekNumber} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    Week {week.weekNumber}: {week.startDate} to {week.endDate}
                                    <span className="text-purple-300 text-sm ml-4">
                                        ({week.totalHours.toFixed(1)} hours)
                                    </span>
                                </h3>

                                <div className="space-y-3">
                                    {week.slots.map((slot, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-4 rounded-lg border ${getCognitiveLoadColor(slot.cognitiveLoad)}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="font-semibold">{slot.subjectName} - {slot.topicName}</div>
                                                    <div className="text-sm opacity-90 mt-1">
                                                        {slot.day} | {slot.timeSlot} | {slot.duration}h
                                                    </div>
                                                </div>
                                                <div className="text-xs uppercase font-semibold px-2 py-1 rounded">
                                                    {slot.cognitiveLoad}
                                                </div>
                                            </div>
                                            <div className="text-xs mt-2 opacity-80">{slot.reasoning}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Subject Analysis Tab */}
                {activeTab === 'analysis' && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {schedule.subjectAnalyses?.map((analysis, idx) => (
                            <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                                <h3 className="text-2xl font-semibold text-white mb-2">
                                    {analysis.subjectName}
                                </h3>
                                <div className="text-purple-300 text-lg mb-4">
                                    {analysis.totalHoursAllocated.toFixed(1)} hours allocated
                                </div>

                                <div className="space-y-3 mb-4">
                                    {analysis.topicBreakdown.map((topic, tidx) => (
                                        <div key={tidx} className="bg-white/5 p-3 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-white">{topic.topicName}</span>
                                                <span className={`text-xs px-2 py-1 rounded ${getCognitiveLoadColor(topic.cognitiveLoad)}`}>
                                                    {topic.cognitiveLoad}
                                                </span>
                                            </div>
                                            <div className="text-purple-300 text-sm mt-1">
                                                {topic.hoursAllocated.toFixed(1)} hours
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-sm text-purple-200 bg-purple-500/20 p-3 rounded-lg">
                                    <strong>AI Reasoning:</strong> {analysis.reasoning}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* AI Insights Tab */}
                {activeTab === 'insights' && (
                    <div className="space-y-6">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                🔍 Dependency Inference Method
                            </h3>
                            <p className="text-purple-200 whitespace-pre-wrap">
                                {schedule.aiReasoning?.dependencyInferenceMethod}
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                ⚡ Cognitive Load Rationale
                            </h3>
                            <p className="text-purple-200 whitespace-pre-wrap">
                                {schedule.aiReasoning?.cognitiveLoadRationale}
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                🎯 Priority Decisions
                            </h3>
                            <p className="text-purple-200 whitespace-pre-wrap">
                                {schedule.aiReasoning?.priorityDecisions}
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                📅 Scheduling Logic
                            </h3>
                            <pre className="text-purple-200 text-sm overflow-auto">
                                {typeof schedule.aiReasoning?.schedulingLogic === 'string'
                                    ? schedule.aiReasoning.schedulingLogic
                                    : JSON.stringify(schedule.aiReasoning?.schedulingLogic ?? {}, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
