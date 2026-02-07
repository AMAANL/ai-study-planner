/**
 * API Route: Adapt Study Schedule
 * POST /api/schedule/adapt
 */

import { NextRequest, NextResponse } from 'next/server';
import { adaptSchedule } from '@/lib/ai/reasoning-engine';
import { StudySchedule, ConfidenceUpdate } from '@/types';

export async function POST(request: NextRequest) {
    try {
        const body: {
            currentSchedule: StudySchedule;
            confidenceUpdates: ConfidenceUpdate[];
            currentWeek: number;
        } = await request.json();

        // Validate input
        if (!body.currentSchedule || !body.confidenceUpdates || body.currentWeek === undefined) {
            return NextResponse.json(
                { error: 'Missing required fields: currentSchedule, confidenceUpdates, currentWeek' },
                { status: 400 }
            );
        }

        if (body.confidenceUpdates.length === 0) {
            return NextResponse.json(
                { error: 'At least one confidence update is required' },
                { status: 400 }
            );
        }

        // Adapt schedule using AI reasoning
        console.log('🔄 Adapting schedule based on confidence updates...');
        const adaptedSchedule = await adaptSchedule(
            body.currentSchedule,
            body.confidenceUpdates,
            body.currentWeek
        );

        console.log('✅ Schedule adapted successfully');

        return NextResponse.json({
            success: true,
            adaptedSchedule,
        });
    } catch (error: any) {
        console.error('❌ Error adapting schedule:', error);
        return NextResponse.json(
            {
                error: 'Failed to adapt schedule',
                details: error.message
            },
            { status: 500 }
        );
    }
}
