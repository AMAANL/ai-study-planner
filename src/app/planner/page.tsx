'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StudentProfile, Subject, Topic } from '@/types';
import ThemeToggle from '@/components/ThemeToggle';

export default function PlannerPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form state
    const [profile, setProfile] = useState<StudentProfile>({
        name: '',
        branch: '',
        graduationYear: new Date().getFullYear() + 1,
        weekdayHours: 3,
        weekendHours: 6,
        preferredTime: 'night',
    });

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [currentSubject, setCurrentSubject] = useState({
        name: '',
        credits: 3,
        confidence: 3,
    });
    const [currentTopics, setCurrentTopics] = useState<Topic[]>([]);
    const [currentTopic, setCurrentTopic] = useState({
        name: '',
        isStrong: false,
        isWeak: false,
        confidence: 3,
    });

    const [targetDate, setTargetDate] = useState('');

    const addTopic = () => {
        if (!currentTopic.name.trim()) return;
        setCurrentTopics([...currentTopics, { ...currentTopic }]);
        setCurrentTopic({ name: '', isStrong: false, isWeak: false, confidence: 3 });
    };

    const removeTopic = (index: number) => {
        setCurrentTopics(currentTopics.filter((_, i) => i !== index));
    };

    const addSubject = () => {
        if (!currentSubject.name.trim() || currentTopics.length === 0) {
            setError('Subject name and at least one topic are required');
            return;
        }
        setSubjects([...subjects, { ...currentSubject, topics: [...currentTopics] }]);
        setCurrentSubject({ name: '', credits: 3, confidence: 3 });
        setCurrentTopics([]);
        setError('');
    };

    const removeSubject = (index: number) => {
        setSubjects(subjects.filter((_, i) => i !== index));
    };

    const generateSchedule = async () => {
        if (subjects.length === 0) {
            setError('Please add at least one subject');
            return;
        }
        if (!targetDate) {
            setError('Please set a target completion date');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/schedule/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    profile,
                    subjects,
                    targetDate,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate schedule');
            }

            // Store schedule in sessionStorage and navigate to results
            sessionStorage.setItem('generatedSchedule', JSON.stringify(data.schedule));
            sessionStorage.setItem('userProfile', JSON.stringify(profile));
            router.push('/schedule');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8 scroll-smooth">
            <ThemeToggle />
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600">
                    Create Your Study Plan
                </h1>

                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${step >= s
                                    ? 'bg-purple-500 text-white shadow-lg'
                                    : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-purple-300'
                                    }`}
                            >
                                {s}
                            </div>
                            {s < 4 && (
                                <div
                                    className={`w-16 h-1 ${step > s ? 'bg-purple-500' : 'bg-white/10'
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-200 dark:border-white/20 shadow-2xl animate-scale-in">
                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {/* Step 1: Profile */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">
                                📝 Your Profile
                            </h2>

                            <div>
                                <label className="block text-purple-200 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300/50"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-purple-200 mb-2">Branch</label>
                                <input
                                    type="text"
                                    value={profile.branch}
                                    onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300/50"
                                    placeholder="e.g., Computer Science, Mechanical, Electrical"
                                />
                            </div>

                            <div>
                                <label className="block text-purple-200 mb-2">Graduation Year</label>
                                <input
                                    type="number"
                                    value={profile.graduationYear}
                                    onChange={(e) => setProfile({ ...profile, graduationYear: parseInt(e.target.value) })}
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-purple-200 mb-2">Weekday Hours/Day</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="12"
                                        value={profile.weekdayHours}
                                        onChange={(e) => setProfile({ ...profile, weekdayHours: parseFloat(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-purple-200 mb-2">Weekend Hours/Day</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="16"
                                        value={profile.weekendHours}
                                        onChange={(e) => setProfile({ ...profile, weekendHours: parseFloat(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-purple-200 mb-2">Preferred Study Time</label>
                                <select
                                    value={profile.preferredTime}
                                    onChange={(e) => setProfile({ ...profile, preferredTime: e.target.value as any })}
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                                >
                                    <option value="morning">Morning</option>
                                    <option value="afternoon">Afternoon</option>
                                    <option value="night">Night</option>
                                </select>
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                            >
                                Next →
                            </button>
                        </div>
                    )}

                    {/* Step 2: Subjects */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">
                                📚 Add Subjects
                            </h2>

                            {subjects.length > 0 && (
                                <div className="space-y-2 mb-6">
                                    {subjects.map((subj, idx) => (
                                        <div key={idx} className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                                            <div>
                                                <span className="text-white font-semibold">{subj.name}</span>
                                                <span className="text-purple-300 text-sm ml-3">
                                                    {subj.credits} credits | {subj.topics.length} topics
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => removeSubject(idx)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div>
                                <label className="block text-purple-200 mb-2">Subject Name</label>
                                <input
                                    type="text"
                                    value={currentSubject.name}
                                    onChange={(e) => setCurrentSubject({ ...currentSubject, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300/50"
                                    placeholder="e.g., Data Structures, Thermodynamics"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-purple-200 mb-2">Credits</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={currentSubject.credits}
                                        onChange={(e) => setCurrentSubject({ ...currentSubject, credits: parseFloat(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-purple-200 mb-2">Overall Confidence (1-5)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={currentSubject.confidence}
                                        onChange={(e) => setCurrentSubject({ ...currentSubject, confidence: parseInt(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(3)}
                                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                            >
                                Add Topics for this Subject →
                            </button>

                            <button
                                onClick={() => setStep(1)}
                                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition"
                            >
                                ← Back
                            </button>
                        </div>
                    )}

                    {/* Step 3: Topics */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">
                                📖 Add Topics for {currentSubject.name || 'Subject'}
                            </h2>

                            {currentTopics.length > 0 && (
                                <div className="space-y-2 mb-6">
                                    {currentTopics.map((topic, idx) => (
                                        <div key={idx} className="bg-white/5 p-3 rounded-lg flex justify-between items-center">
                                            <div>
                                                <span className="text-white">{topic.name}</span>
                                                <span className="text-purple-300 text-sm ml-3">
                                                    {topic.isStrong && '💪 Strong'}
                                                    {topic.isWeak && '⚠️ Weak'}
                                                    {!topic.isStrong && !topic.isWeak && '➖ Neutral'}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => removeTopic(idx)}
                                                className="text-red-400 hover:text-red-300 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div>
                                <label className="block text-purple-200 mb-2">Topic Name</label>
                                <input
                                    type="text"
                                    value={currentTopic.name}
                                    onChange={(e) => setCurrentTopic({ ...currentTopic, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300/50"
                                    placeholder="e.g., Dynamic Programming, Arrays, Graph Algorithms"
                                />
                            </div>

                            <div className="flex gap-4">
                                <label className="flex items-center text-purple-200">
                                    <input
                                        type="checkbox"
                                        checked={currentTopic.isStrong}
                                        onChange={(e) => setCurrentTopic({ ...currentTopic, isStrong: e.target.checked, isWeak: false })}
                                        className="mr-2"
                                    />
                                    Strong Topic
                                </label>
                                <label className="flex items-center text-purple-200">
                                    <input
                                        type="checkbox"
                                        checked={currentTopic.isWeak}
                                        onChange={(e) => setCurrentTopic({ ...currentTopic, isWeak: e.target.checked, isStrong: false })}
                                        className="mr-2"
                                    />
                                    Weak Topic
                                </label>
                            </div>

                            <div>
                                <label className="block text-purple-200 mb-2">Confidence (1-5)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={currentTopic.confidence}
                                    onChange={(e) => setCurrentTopic({ ...currentTopic, confidence: parseInt(e.target.value) })}
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                                />
                            </div>

                            <button
                                onClick={addTopic}
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                            >
                                + Add Topic
                            </button>

                            {currentTopics.length > 0 && (
                                <>
                                    <button
                                        onClick={() => {
                                            addSubject();
                                            setStep(2);
                                        }}
                                        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                                    >
                                        Save Subject & Continue
                                    </button>

                                    {subjects.length > 0 && (
                                        <button
                                            onClick={() => {
                                                addSubject();
                                                setStep(4);
                                            }}
                                            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                                        >
                                            Save & Set Target Date →
                                        </button>
                                    )}
                                </>
                            )}

                            <button
                                onClick={() => setStep(2)}
                                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition"
                            >
                                ← Back
                            </button>
                        </div>
                    )}

                    {/* Step 4: Target Date & Generate */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">
                                🎯 Target Completion Date
                            </h2>

                            <div>
                                <label className="block text-purple-200 mb-2">When do you want to complete?</label>
                                <input
                                    type="date"
                                    value={targetDate}
                                    onChange={(e) => setTargetDate(e.target.value)}
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                                />
                            </div>

                            <div className="bg-purple-500/20 border border-purple-500 rounded-lg p-4">
                                <h3 className="text-white font-semibold mb-2">Summary</h3>
                                <p className="text-purple-200 text-sm">
                                    {subjects.length} subjects with {subjects.reduce((acc, s) => acc + s.topics.length, 0)} topics
                                </p>
                                <p className="text-purple-200 text-sm">
                                    {profile.weekdayHours} hrs/weekday, {profile.weekendHours} hrs/weekend
                                </p>
                            </div>

                            <button
                                onClick={generateSchedule}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-6 py-4 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? '🧠 AI is thinking...' : '✨ Generate My Schedule'}
                            </button>

                            <button
                                onClick={() => setStep(2)}
                                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition"
                            >
                                ← Back
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
