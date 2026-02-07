// Type definitions for the AI Study Planner

export interface StudentProfile {
  name: string;
  branch: string;
  graduationYear: number;
  weekdayHours: number;
  weekendHours: number;
  preferredTime: 'morning' | 'afternoon' | 'night';
}

export interface Topic {
  id?: string;
  name: string;
  isStrong: boolean;
  isWeak: boolean;
  confidence: number; // 1-5
}

export interface Subject {
  id?: string;
  name: string;
  credits: number;
  confidence: number; // 1-5
  topics: Topic[];
}

export interface StudyPlannerInput {
  profile: StudentProfile;
  subjects: Subject[];
  targetDate: string; // ISO date string
}

// AI Reasoning Output Types

export interface TopicDependency {
  topicName: string;
  subjectName: string;
  prerequisitesTopics: string[]; // Topics that should be learned first
  dependentTopics: string[]; // Topics that depend on this one
  reasoning: string;
}

export interface CognitiveLoad {
  topicName: string;
  subjectName: string;
  loadLevel: 'high' | 'medium' | 'low';
  loadScore: number; // 0-1
  reasoning: string;
}

export interface TopicPriority {
  topicName: string;
  subjectName: string;
  priorityScore: number; // 0-1
  reasoning: string;
  factors: {
    creditsWeight: number;
    confidenceWeight: number;
    difficultyWeight: number;
    timeUrgencyWeight: number;
  };
}

export interface ScheduleSlot {
  day: string; // e.g., "Monday", "2026-02-10"
  timeSlot: string; // e.g., "morning", "afternoon", "night"
  subjectName: string;
  topicName: string;
  duration: number; // hours
  cognitiveLoad: 'high' | 'medium' | 'low';
  reasoning: string;
}

export interface SubjectAnalysis {
  subjectName: string;
  totalHoursAllocated: number;
  priorityScore: number;
  topicBreakdown: {
    topicName: string;
    hoursAllocated: number;
    cognitiveLoad: 'high' | 'medium' | 'low';
  }[];
  reasoning: string;
}

export interface WeeklySchedule {
  weekNumber: number;
  startDate: string;
  endDate: string;
  slots: ScheduleSlot[];
  totalHours: number;
}

export interface StudySchedule {
  scheduleId?: string;
  profileId?: string;
  weeklySchedules: WeeklySchedule[];
  subjectAnalyses: SubjectAnalysis[];
  nextSevenDaysFocus: {
    topicName: string;
    subjectName: string;
    startDate: string;
    reasoning: string;
    prerequisiteWarnings?: string[];
  }[];
  aiReasoning: {
    dependencyInferenceMethod: string;
    cognitiveLoadRationale: string;
    priorityDecisions: string;
    schedulingLogic: string;
  };
  estimatedCompletionDate: string;
  version: number;
}

// Adaptation Types

export interface ConfidenceUpdate {
  topicId: string;
  topicName: string;
  subjectName: string;
  oldConfidence: number;
  newConfidence: number;
  weekNumber: number;
}

export interface AdaptationInsight {
  topicName: string;
  subjectName: string;
  changeType: 'time_increased' | 'time_decreased' | 'priority_adjusted' | 'reordered';
  oldHours: number;
  newHours: number;
  reasoning: string;
}

export interface AdaptedSchedule {
  originalSchedule: StudySchedule;
  updatedSchedule: StudySchedule;
  confidenceUpdates: ConfidenceUpdate[];
  adaptationInsights: AdaptationInsight[];
  aiReasoning: {
    confidenceAnalysis: string;
    rebalancingLogic: string;
    timeReallocationDecisions: string;
  };
}

// AI Request/Response Types (Internal)

export interface AITopicAnalysisRequest {
  subjects: Subject[];
  studentBranch: string;
}

export interface AITopicAnalysisResponse {
  dependencies: TopicDependency[];
  cognitiveLoads: CognitiveLoad[];
  reasoning: string;
}

export interface AIPriorityRequest {
  subjects: Subject[];
  cognitiveLoads: CognitiveLoad[];
  dependencies: TopicDependency[];
  targetDate: string;
  availableHours: {
    weekdayHours: number;
    weekendHours: number;
  };
}

export interface AIPriorityResponse {
  priorities: TopicPriority[];
  reasoning: string;
}

export interface AIScheduleRequest {
  subjects: Subject[];
  priorities: TopicPriority[];
  cognitiveLoads: CognitiveLoad[];
  dependencies: TopicDependency[];
  profile: StudentProfile;
  targetDate: string;
}

export interface AIScheduleResponse {
  schedule: StudySchedule;
  reasoning: string;
}

export interface AIAdaptationRequest {
  currentSchedule: StudySchedule;
  confidenceUpdates: ConfidenceUpdate[];
  currentWeek: number;
}

export interface AIAdaptationResponse {
  adaptedSchedule: AdaptedSchedule;
  reasoning: string;
}
