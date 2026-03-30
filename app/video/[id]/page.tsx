import Link from 'next/link';
import { getAssetStatus } from '@/app/actions';
import MuxPlayerWrapper from '@/components/MuxPlayerWrapper';
import VideoStatusPoller from '@/components/VideoStatusPoller';
import ShareButton from '@/components/ShareButton';
import VideoSummary from '@/components/VideoSummary';
import { ArrowLeft, Download } from 'lucide-react';

export default async function VideoPage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    const { id: playbackId } = await params;
    const { status, transcriptStatus, transcript } = await getAssetStatus(playbackId);

    const isVideoReady = status === 'ready';
    const isTranscriptReady = transcriptStatus === 'ready';

    const downloadUrl = `https://stream.mux.com/${playbackId}/high.mp4?download=screen-recording.mp4`;

};