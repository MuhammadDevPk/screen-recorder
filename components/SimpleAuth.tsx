'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SimpleAuth({ currentUser }: { currentUser: string | null }) {
    const [userName, setUserName] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        if (!userName.trim()) return;
        await fetch('/api/fake-login', {
            method: 'POST',
            body: JSON.stringify({userName}),
        });
        router.refresh();
    };

    const handleLogout = async () => {
        await fetch('/api/fake-logout', {method: 'DELETE'});
        router.refresh();
    }

}