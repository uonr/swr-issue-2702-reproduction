'use client';

import { FC, Suspense } from 'react';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const Some: FC = () => {
    useSWR(
        ['B'],
        () => {
            return new Promise<'B'>((resolve) => {
                setTimeout(() => {
                    resolve('B');
                }, 1000);
            });
        },
        {
            suspense: true,
        },
    );

    useState(true);
    return <span>a</span>;
};

const TriggerBug: FC = ({ }) => {
    useSWR(
        ['A'],
        () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve('A');
                }, 1000);
            });
        },
        {
            suspense: true,
        },
    );

    return (
        <div>
            <Some />
        </div>
    );
};

export const Client: FC = () => {
    const [loading, setLoading] = useState(true);

    // To prevent SSR
    useEffect(() => setLoading(false), []);

    if (loading) {
        return <span>Loading...</span>;
    }
    return (
        <Suspense fallback={null}>
            <TriggerBug />
        </Suspense>
    );
};
