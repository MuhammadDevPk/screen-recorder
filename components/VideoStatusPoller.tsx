'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAssetStatus } from '@/app/actions';
import { Loader2 } from 'lucide-react';

export default function VideoStatusPoller({
    id,
    isVideoReady,
}: {
    id: string;
    isVideoReady: boolean;
}) {
    const router = useRouter();

    useEffect(() =>{
        const checkStatus = async () => {
            const { status, transcriptStatus } = await getAssetStatus(id);

            if (!isVideoReady && status === 'ready') {
                router.refresh();
            }

            if (isVideoReady && transcriptStatus === 'ready'){
                router.refresh();
            }
        };

        const interval = setInterval(checkStatus, 3000);
        return () => clearInterval(interval);  
    }, [id, isVideoReady, router]);

    if (isVideoReady) return null;
}