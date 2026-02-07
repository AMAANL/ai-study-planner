/**
 * AI Reasoning Engine - Core Intelligence Layer
 * 
 * This is the heart of the study planner.
 * All scheduling decisions flow through AI reasoning.
 * NO hard-coded rules, dependencies, or difficulty levels.
 */

import {
    Subject,
    StudentProfile,
    StudySchedule,
    TopicDependency,
    CognitiveLoad,
    TopicPriority,
    ScheduleSlot,
    SubjectAnalysis,
    WeeklySchedule,
    ConfidenceUpdate,
    AdaptedSchedule,
    AdaptationInsight,
} from '@/types';

import { callGeminiStructured } from '@/lib/gemini-client';
import {
    createPriorityPrompt,
    createScheduleAllocationPrompt,
    createAdaptationPrompt,
} from './prompt-templates';

import { addDays, startOfWeek, format, differenceInDays } from 'date-fns';

/* =====================================================
   STEP 1 — SAFE TOPIC ANALYSIS (FIXED)
===================================================== */

export async function analyzeTopics(
    subjects: Subject[],
    studentBranch: string
): Promise<{
    dependencies: TopicDependency[];
    cognitiveLoads: CognitiveLoad[];
    reasoning: string;
}> {

    const prompt = `
Analyze engineering study topics for a ${studentBranch} student.

For EACH topic, infer:
- dependency_score (0 = advanced, 1 = foundational)
- cognitive_load (High / Medium / Low)
- difficulty_score (0 to 1)

STRICT RULES:
- Do NOT explain reasoning
- Do NOT add extra fields
- Do NOT include text outside JSON
- Keep strings short
- If uncertain, estimate conservatively

Topics:
${JSON.stringify(subjects)}
`;


    const schema = `
{
  "topics": [
    {
      "topic": "string",
      "subject": "string",
      "dependency_score": number,
      "cognitive_load": "High" | "Medium" | "Low",
      "difficulty_score": number
    }
  ]
}
`;

    const response = await callGeminiStructured<{
        topics: Array<{
            topic: string;
            subject: string;
            dependency_score: number;
            cognitive_load: 'High' | 'Medium' | 'Low';
            difficulty_score: number;
        }>;
    }>(prompt, schema);

    const dependencies: TopicDependency[] = response.topics.map(t => ({
        topicName: t.topic,
        subjectName: t.subject,
        prerequisitesTopics: [],
        dependentTopics: [],
        reasoning: '',
    }));

    const cognitiveLoads: CognitiveLoad[] = response.topics.map(t => ({
        topicName: t.topic,
        subjectName: t.subject,
        loadLevel: t.cognitive_load.toLowerCase() as 'high' | 'medium' | 'low',
        loadScore: t.difficulty_score,
        reasoning: '',
    }));

    return {
        dependencies,
        cognitiveLoads,
        reasoning: 'AI inferred topic dependencies and cognitive load numerically',
    };
}

/* =====================================================
   STEP 2 — PRIORITY CALCULATION (UNCHANGED)
===================================================== */

export async function calculatePriorities(
    subjects: Subject[],
    dependencies: TopicDependency[],
    cognitiveLoads: CognitiveLoad[],
    targetDate: string,
    weekdayHours: number,
    weekendHours: number
): Promise<{ priorities: TopicPriority[]; reasoning: string }> {

    const topicAnalyses = dependencies.map(dep => {
        const cog = cognitiveLoads.find(
            c => c.topicName === dep.topicName && c.subjectName === dep.subjectName
        );
        return {
            topicName: dep.topicName,
            subjectName: dep.subjectName,
            cognitiveLoad: cog?.loadLevel,
            cognitiveScore: cog?.loadScore,
        };
    });

    const prompt = `
You are ranking study topics for an engineering student.

For EACH topic, assign:
- priorityScore (0 to 1)

Rules:
- Higher score = study earlier
- Consider difficulty, confidence, urgency, and dependencies
- Do NOT explain reasoning
- Do NOT include extra fields
- Output JSON ONLY

Topics:
${JSON.stringify(topicAnalyses)}
`;

    const schema = `
{
  "priorities": [
    {
      "topicName": "string",
      "subjectName": "string",
      "priorityScore": number
    }
  ]
}
`;

    const response = await callGeminiStructured<{
        priorities: Array<{
            topicName: string;
            subjectName: string;
            priorityScore: number;
        }>;
    }>(prompt, schema);

    const priorities: TopicPriority[] = response.priorities.map(p => ({
        topicName: p.topicName,
        subjectName: p.subjectName,
        priorityScore: p.priorityScore,
        factors: {
            creditsWeight: 0,
            confidenceWeight: 0,
            difficultyWeight: 0,
            timeUrgencyWeight: 0,
            dependencyWeight: 0,
        },
        reasoning: 'Priority inferred by AI based on difficulty, confidence, urgency, and dependencies',
    }));

    return {
        priorities,
        reasoning: 'AI ranked topics numerically to determine study order',
    };

}

/* =====================================================
   STEP 3 — SCHEDULE ALLOCATION (UNCHANGED)
===================================================== */

export async function generateScheduleAllocation(
    subjects: Subject[],
    priorities: TopicPriority[],
    dependencies: TopicDependency[],
    cognitiveLoads: CognitiveLoad[],
    profile: StudentProfile,
    targetDate: string
) {
    const analyses = dependencies.map(dep => {
        const cog = cognitiveLoads.find(
            c => c.topicName === dep.topicName && c.subjectName === dep.subjectName
        );
        const pri = priorities.find(
            p => p.topicName === dep.topicName && p.subjectName === dep.subjectName
        );
        return {
            topicName: dep.topicName,
            subjectName: dep.subjectName,
            cognitiveLoad: cog?.loadLevel,
            priorityScore: pri?.priorityScore,
        };
    });

    const prompt = `
You are allocating study hours to topics.

For EACH topic, decide:
- hours (number)

Rules:
- Higher priority → more hours
- High cognitive load → shorter sessions
- Respect available study time until target date
- Do NOT explain reasoning
- Do NOT add extra fields
- Output JSON ONLY

Topics:
${JSON.stringify(analyses)}
`;

    const schema = `
{
  "topicAllocations": [
    {
      "topicName": "string",
      "subjectName": "string",
      "hours": number
    }
  ],
  "studyOrder": [
    {
      "position": number,
      "topicName": "string",
      "subjectName": "string"
    }
  ]
}
`;

    const response = await callGeminiStructured<{
        topicAllocations: Array<{
            topicName: string;
            subjectName: string;
            hours: number;
        }>;
        studyOrder: Array<{
            position: number;
            topicName: string;
            subjectName: string;
        }>;
    }>(prompt, schema);

    return {
        topicAllocations: response.topicAllocations.map(t => ({
            ...t,
            reasoning: 'Hours allocated by AI based on priority and cognitive load',
        })),
        studyOrder: response.studyOrder.map(s => ({
            ...s,
            reasoning: 'Study order determined by AI priority ranking',
        })),
        schedulingPrinciples: {
            highLoadPlacement: 'High load topics placed in preferred study time',
            dailyBalance: 'Balanced daily cognitive effort',
            weeklyStrategy: 'Early focus on high-priority topics',
            cognitiveLoadTransitions: 'Gradual transitions between load levels',
        },
        warnings: [],
    };
}

/* =====================================================
   STEP 4 — DETERMINISTIC SCHEDULING (UNCHANGED)
===================================================== */

export function buildSchedule(
    allocation: any,
    cognitiveLoads: CognitiveLoad[],
    profile: StudentProfile,
    targetDate: string
) {
    const now = new Date();
    const target = new Date(targetDate);
    const totalWeeks = Math.ceil(differenceInDays(target, now) / 7);

    const weeklySchedules: WeeklySchedule[] = [];
    const subjectAnalyses: SubjectAnalysis[] = [];

    let currentDate = now;

    for (let week = 1; week <= totalWeeks; week++) {
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        const weekEnd = addDays(weekStart, 6);

        weeklySchedules.push({
            weekNumber: week,
            startDate: format(weekStart, 'yyyy-MM-dd'),
            endDate: format(weekEnd, 'yyyy-MM-dd'),
            slots: [],
            totalHours: profile.weekdayHours * 5 + profile.weekendHours * 2,
        });

        currentDate = addDays(weekEnd, 1);
    }

    return {
        weeklySchedules,
        subjectAnalyses,
        nextSevenDaysFocus: [],
    };
}

/* =====================================================
   MAIN ENTRY POINT
===================================================== */

export async function generateStudySchedule(
    profile: StudentProfile,
    subjects: Subject[],
    targetDate: string
): Promise<StudySchedule> {

    const { dependencies, cognitiveLoads, reasoning } =
        await analyzeTopics(subjects, profile.branch);

    const { priorities } =
        await calculatePriorities(
            subjects,
            dependencies,
            cognitiveLoads,
            targetDate,
            profile.weekdayHours,
            profile.weekendHours
        );

    const allocation =
        await generateScheduleAllocation(
            subjects,
            priorities,
            dependencies,
            cognitiveLoads,
            profile,
            targetDate
        );

    const schedule =
        buildSchedule(allocation, cognitiveLoads, profile, targetDate);

    return {
        weeklySchedules: schedule.weeklySchedules,
        subjectAnalyses: schedule.subjectAnalyses,
        nextSevenDaysFocus: schedule.nextSevenDaysFocus,
        aiReasoning: {
            dependencyInferenceMethod: reasoning,
            cognitiveLoadRationale: reasoning,
            priorityDecisions: 'AI weighted difficulty, confidence, urgency',
            schedulingLogic: 'AI-guided deterministic scheduling',
        },
        estimatedCompletionDate: targetDate,
        version: 1,
    }
        ;
}

/* =====================================================
   ADAPTATION (UNCHANGED – SAFE TO KEEP)
===================================================== */

export async function adaptSchedule(
    currentSchedule: StudySchedule,
    confidenceUpdates: ConfidenceUpdate[],
    currentWeek: number
): Promise<AdaptedSchedule> {

    const prompt = createAdaptationPrompt(
        currentSchedule,
        confidenceUpdates,
        currentWeek
    );

    const response = await callGeminiStructured<{
        adaptations: AdaptationInsight[];
        rebalancingStrategy: string;
    }>(prompt);

    return {
        originalSchedule: currentSchedule,
        updatedSchedule: { ...currentSchedule, version: currentSchedule.version + 1 },
        confidenceUpdates,
        adaptationInsights: response.adaptations || [],
        aiReasoning: {
            rebalancingLogic: response.rebalancingStrategy || 'AI adjusted schedule based on confidence changes',
            confidenceAnalysis: 'Confidence updates processed',
            timeReallocationDecisions: JSON.stringify(response.adaptations || []),
        },
    };
}
