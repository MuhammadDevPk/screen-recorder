import Link from 'next/link';
import { getAssetStatus } from '@/app/actions';
import MuxPlayerWrapper from '@/components/MuxPlayerWrapper';
import VideoStatusPoller from '@/components/VideoStatusPoller';
import ShareButton from '@/components/ShareButton';
import VideoSummary from '@/components/VideoSummary';
import { ArrowLeft, Download } from 'lucide-react';