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

    const router = useRouter();

    const startRecording = async () => {
        try {
            // Step1: Capture the screen
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: false, // system audio false
            });

            // Step2: Capture the microphone
            const micStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                },
                video: false,
            });

            // Step3: Store References for cleanup
            screenStreamRef.current = screenStream;
            micStreamRef.current = micStream;

            // Step4: Merge the streams
            const combinedStream = new MediaStream([
                ...screenStream.getVideoTracks(), //Get the video part
                ...micStream.getAudioTracks(), // Get the audio part
            ]);

            // Step5: Show live preview
            if (liveVideoRef.current) {
                liveVideoRef.current.srcObject = combinedStream;
            };

            // Step6: Set up the recorder
            const mediaRecorder = new MediaRecorder(combinedStream, {
                mimeType: 'video/webm; codecs=vp9',
            });

            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            // Step7: Collect chunks as the're recorded
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) chunksRef.current.push(event.data);
            };

            // Step8: Handle recording completion
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                setMediaBlob(blob);

                if (liveVideoRef.current) {
                    liveVideoRef.current.srcObject = null;
                }

                // Critical: Stop all tracks
                screenStreamRef.current?.getTracks().forEach(t => t.stop());
                micStreamRef.current?.getTracks().forEach(t => t.stop());
            };

            // Step9: Start recording
            mediaRecorder.start();
            setIsRecording(true);

            // Step10: Handle native "stop sharing" button
            screenStream.getVideoTracks()[0].onended = stopRecording;

        } catch (err) {
            console.error('Error starting recording:', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    }

    const handleUpload = async () => {
        if (!mediaBlob) return;

        setIsUploading(true);

        try {
            // Step1: Get a singed upload url from our server
            const uploadConfig = await createUploadUrl();

            // Step2: Upload directly to Mux (not through our server!)
            await fetch(uploadConfig.url, {
                method: 'PUT',
                body: mediaBlob,
            });

            // Step3: Poll untill processing completes
            while (true) {
                const result = await getAssetIdFromUpload(uploadConfig.id);

                if (result.playbackId) {
                    router.push(`/video/${result.playbackId}`);
                    break;
                }

                await new Promise(r => setTimeout(r, 1000));
            }
        } catch (err) {
            console.error('Upload failed:', err);
            setIsUploading(false);
        }
    }

}