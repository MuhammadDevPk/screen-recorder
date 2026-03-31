'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function VideoThumbnail({ playbackId}: { playbackId: string }) {
    const [isHovered, setIsHovered] = useState(false);
    const [hasError, setHasError] = useState(false);

    const posterUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg?time=0`;
    const giftUrl = `https://image.mux.com/${playbackId}/animated.gif?width=320`;

    if (hasError) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500 text-sm">
                No preview
            </div>
        );
    }

    
}