'use client';

import { useState } from 'react';
import { generateVideoSummary } from '@/app/actions';
import { Sparkles, Loader2 } from 'lucide-react';

interface SummaryData {
    title: string;
    summary: string;
    tags: string[];
}

