/**
 * Prompt Templates for AI Reasoning Engine
 * 
 * CRITICAL: These prompts ensure NO hard-coded dependencies or rules.
 * All topic relationships, difficulty, and priorities are AI-inferred.
 */

import { Subject, StudentProfile } from '@/types';

/**
 * Prompt for analyzing topic dependencies and cognitive load in a single batch call
 * This combines two analyses to optimize API usage
 */
export function createTopicAnalysisPrompt(
    subjects: Subject[],
    studentBranch: string
): string {
    const subjectsText = subjects.map(s =>
        `Subject: ${s.name} (${s.credits} credits)
Topics: ${s.topics.map(t => `"${t.name}" (confidence: ${t.confidence}/5, ${t.isStrong ? 'strong' : t.isWeak ? 'weak' : 'neutral'})`).join(', ')}`
    ).join('\n\n');

    return `You are an AI reasoning engine for an adaptive study planner for ${studentBranch} engineering students.

TASK: Analyze the following subjects and topics to infer:
1. Topic dependencies (which topics are foundational and which depend on others)
2. Cognitive load (conceptual difficulty and mental effort required)

SUBJECTS AND TOPICS:
${subjectsText}

CRITICAL INSTRUCTIONS:
- You MUST NOT use any pre-existing knowledge of academic curricula or standard topic orderings
- Infer dependencies PURELY from semantic analysis of topic names and subject context
- DO NOT assume fixed hierarchies (e.g., do NOT automatically assume "Arrays" comes before "Trees")
- Analyze the MEANING of each topic name to determine:
  - Which concepts are more foundational based on their semantic complexity
  - Which topics require understanding of other topics based on conceptual relationships
  - How abstract or concrete each topic is
  
- For cognitive load, consider:
  - Semantic complexity of the topic name
  - Abstractness vs concreteness
  - Typical mental models required (infer from topic name)
  - NOT student confidence (that's handled separately in priority scoring)

For each topic, you must provide:
1. Which topics (if any) should likely be learned BEFORE this topic (prerequisites)
2. Which topics depend ON this topic
3. Cognitive load level (high/medium/low) and score (0-1)
4. Clear reasoning for BOTH dependency and cognitive load decisions

Respond with a JSON object with this structure:
{
  "analyses": [
    {
      "topicName": "...",
      "subjectName": "...",
      "prerequisites": ["topic1", "topic2"],
      "dependents": ["topic3"],
      "dependencyReasoning": "Based on semantic analysis, this topic requires understanding X because...",
      "cognitiveLoad": "high" | "medium" | "low",
      "cognitiveScore": 0.0-1.0,
      "cognitiveReasoning": "This topic involves abstract concepts like..."
    }
  ],
  "overallReasoning": "My approach to inferring dependencies was based on..."
}`;
}

/**
 * Prompt for dynamic priority scoring
 * AI decides how to weight different factors based on context
 */
export function createPriorityPrompt(
    subjects: Subject[],
    topicAnalyses: any[], // From previous AI call
    targetDate: string,
    weekdayHours: number,
    weekendHours: number
): string {
    const now = new Date();
    const target = new Date(targetDate);
    const daysRemaining = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const weeksRemaining = Math.ceil(daysRemaining / 7);

    const subjectsText = subjects.map(s =>
        `${s.name}: ${s.credits} credits, confidence ${s.confidence}/5, ${s.topics.length} topics`
    ).join('\n');

    const analysesText = JSON.stringify(topicAnalyses, null, 2);

    return `You are an AI reasoning engine for an adaptive study planner.

TASK: Determine the relative priority of each topic for scheduling.

CONTEXT:
- Target completion date: ${targetDate} (${weeksRemaining} weeks, ${daysRemaining} days remaining)
- Available study time: ${weekdayHours} hours/weekday, ${weekendHours} hours/weekend
- Total available hours: ~${(weekdayHours * 5 + weekendHours * 2) * weeksRemaining} hours

SUBJECTS:
${subjectsText}

TOPIC ANALYSES (dependencies and cognitive load):
${analysesText}

CRITICAL INSTRUCTIONS:
- You must DYNAMICALLY determine how to weight these factors:
  1. Subject credits (higher credits = more important academically)
  2. Student confidence (lower confidence = needs more time)
  3. Topic cognitive load (higher load = needs early focus when energy is high)
  4. Time remaining (tight deadlines = prioritize high-value topics)
  5. Dependencies (foundational topics must come before dependent ones)

- DO NOT use a fixed formula
- The weighting should adapt based on:
  - How much time is available vs needed
  - How confidence varies across subjects
  - How many high-load topics exist
  
- Consider that:
  - Low confidence + high cognitive load = very high priority
  - Foundational topics (many dependents) = high priority to unlock others
  - High credits + low confidence = high priority for academic success
  - Tight timeline = prioritize topics that give maximum value

For each topic, provide:
1. Priority score (0-1, where 1 is highest priority)
2. The weight you assigned to each factor
3. Clear reasoning for why this topic got this priority

Respond with JSON:
{
  "priorities": [
    {
      "topicName": "...",
      "subjectName": "...",
      "priorityScore": 0.0-1.0,
      "factors": {
        "creditsWeight": 0.0-1.0,
        "confidenceWeight": 0.0-1.0,
        "difficultyWeight": 0.0-1.0,
        "timeUrgencyWeight": 0.0-1.0,
        "dependencyWeight": 0.0-1.0
      },
      "reasoning": "This topic received high priority because..."
    }
  ],
  "overallStrategy": "Given the time constraints and student profile, I weighted..."
}`;
}

/**
 * Prompt for generating the actual schedule
 * AI provides the allocation strategy, then we apply deterministic scheduling
 */
export function createScheduleAllocationPrompt(
    subjects: Subject[],
    priorities: any[],
    analyses: any[],
    profile: StudentProfile,
    targetDate: string
): string {
    const now = new Date();
    const target = new Date(targetDate);
    const daysRemaining = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const weeksRemaining = Math.ceil(daysRemaining / 7);

    return `You are an AI reasoning engine for an adaptive study planner.

TASK: Determine the TIME ALLOCATION and ORDERING strategy for scheduling topics.

STUDENT PROFILE:
- Branch: ${profile.branch}
- Preferred study time: ${profile.preferredTime}
- Weekday hours: ${profile.weekdayHours}/day
- Weekend hours: ${profile.weekendHours}/day
- Target date: ${targetDate} (${weeksRemaining} weeks remaining)

SUBJECTS: ${subjects.length} subjects, ${subjects.reduce((acc, s) => acc + s.topics.length, 0)} total topics

PRIORITIES AND COGNITIVE LOADS:
${JSON.stringify({ priorities, analyses }, null, 2)}

CRITICAL INSTRUCTIONS:
- Determine how many hours each topic should receive
- Determine the ORDER in which topics should be studied (considering dependencies)
- Provide scheduling principles:
  - When to place high cognitive load topics (e.g., during preferred time, early in week)
  - How to balance topics across days
  - How to space out difficult topics
  - When to schedule prerequisite topics

DO NOT create day-by-day schedules - that will be done deterministically.
Instead, provide:
1. Hours allocation for each topic
2. Recommended study order (sequence of topics)
3. Scheduling principles based on cognitive load and student preferences

Respond with JSON:
{
  "topicAllocations": [
    {
      "topicName": "...",
      "subjectName": "...",
      "hours": number,
      "reasoning": "Allocated X hours because of priority Y and cognitive load Z..."
    }
  ],
  "studyOrder": [
    {
      "position": 1,
      "topicName": "...",
      "subjectName": "...",
      "reasoning": "This should be studied first because..."
    }
  ],
  "schedulingPrinciples": {
    "highLoadPlacement": "Place high cognitive load topics during...",
    "dailyBalance": "Each day should have...",
    "weeklyStrategy": "Over the week, distribute...",
    "cognitiveLoadTransitions": "Avoid consecutive high-load topics by..."
  },
  "warnings": [
    "Prerequisite gap: Topic X should be learned before Y but timeline is tight",
    "Insufficient time: Need 100 hours but only 80 available - prioritize high-value topics"
  ]
}`;
}

/**
 * Prompt for adapting schedule based on confidence updates
 */
export function createAdaptationPrompt(
    currentSchedule: any,
    confidenceUpdates: { topicName: string; subjectName: string; oldConfidence: number; newConfidence: number }[],
    currentWeek: number
): string {
    return `You are an AI reasoning engine for an adaptive study planner.

TASK: Analyze confidence changes and determine how to rebalance the study schedule.

CURRENT WEEK: ${currentWeek}

CONFIDENCE UPDATES:
${confidenceUpdates.map(u =>
        `- ${u.subjectName} / ${u.topicName}: ${u.oldConfidence} → ${u.newConfidence} (${u.newConfidence > u.oldConfidence ? 'improved' : 'declined'})`
    ).join('\n')}

CURRENT SCHEDULE SUMMARY:
${JSON.stringify(currentSchedule.topicAllocations || [], null, 2)}

CRITICAL INSTRUCTIONS:
- Analyze which topics are progressing well (confidence increased) vs struggling (confidence decreased/stagnant)
- Topics with improved confidence can receive LESS future time
- Topics with poor progress need MORE time or earlier rescheduling
- Consider if low confidence reveals prerequisite gaps
- Reallocate time from topics ahead of schedule to topics behind

Provide adaptation decisions:
1. Which topics should get more/less time
2. Should any topics be moved earlier in the schedule
3. Are there prerequisite warnings based on confidence patterns

Respond with JSON:
{
  "confidenceAnalysis": "Overall, the student is progressing well on X but struggling with Y...",
  "adaptations": [
    {
      "topicName": "...",
      "subjectName": "...",
      "changeType": "time_increased" | "time_decreased" | "priority_adjusted" | "reordered",
      "oldHours": number,
      "newHours": number,
      "reasoning": "Confidence dropped from 3 to 2, indicating difficulty - increasing time by..."
    }
  ],
  "prerequisiteWarnings": [
    "Low confidence in foundational topic X may impact learning topic Y"
  ],
  "rebalancingStrategy": "Given the confidence changes, the new strategy is..."
}`;
}
