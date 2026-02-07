/**
 * API Route: Generate Study Schedule
 * POST /api/schedule/generate
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateStudySchedule } from '@/lib/ai/reasoning-engine';
import { StudyPlannerInput } from '@/types';

export async function POST(request: NextRequest) {
    try {
        const body: StudyPlannerInput = await request.json();

        // Validate input
        if (!body.profile || !body.subjects || !body.targetDate) {
            return NextResponse.json(
                { error: 'Missing required fields: profile, subjects, targetDate' },
                { status: 400 }
            );
        }

        if (body.subjects.length === 0) {
            return NextResponse.json(
                { error: 'At least one subject is required' },
                { status: 400 }
            );
        }

        // Generate schedule using AI reasoning engine
        console.log('🚀 Generating study schedule...');
        const schedule = await generateStudySchedule(
            body.profile,
            body.subjects,
            body.targetDate
        );

        console.log('✅ Schedule generated successfully');

        return NextResponse.json({
            success: true,
            schedule,
        });
    } catch (error: any) {
        console.error('❌ Error generating schedule:', error);
        return NextResponse.json(
            {
                error: 'Failed to generate schedule',
                details: error.message
            },
            { status: 500 }
        );
    }
}
