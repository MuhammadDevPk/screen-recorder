'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAssetStatus } from '@/app/actions';
import { Loader2 } from 'lucide-react';

