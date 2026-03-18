'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createUploadUrl, getAssetIdFromUpload } from '@/app/actions';
import { Loader2, StopCircle, Monitor } from 'lucide-react';

export default function ScreenRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const screenStreamRef = useRef<MediaStream | null>(null);
    const micStreamRef = useRef<MediaStream | null>(null);
    const liveVideoRef = useRef<HTMLVideoElement | null>(null);
}