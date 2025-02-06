'use client';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { Calendar, Users, MessageSquare,Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Header } from './components/ui/header';
import { Sidebar } from './components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from './lib/supabaseClient';
import { MultiStepLoader as Loader } from '../components/ui/multi-step-loader';

export default function DashboardPage() {
    const { isSignedIn, user, isLoaded } = useUser();
    const [meetingCount, setMeetingCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch meeting count
    useEffect(() => {
        const fetchData = async () => {
            try {
                const count = await getMeetingCount();
                setMeetingCount(count);
            } catch (error) {
                setError('Failed to fetch meeting count');
            } finally {
                setLoading(false);
            }
        };

        if (isLoaded && isSignedIn) {
            fetchData();
        }
    }, [isLoaded, isSignedIn]);

    // Loading state
    if (!isLoaded) {
        return (
            <div>
                <MultiStepLoaderDemo />
            </div>
        );
    }

    // Not signed in state
    if (!isSignedIn) {
        return <div>Sign in to view this page</div>;
    }

    // Error state
    if (error) {
        return <p>{error}</p>;
    }

    // Loading state for meeting count
    if (loading) {
        return <MultiStepLoaderDemo />;
    }

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
                    <div className="container mx-auto px-6 py-8">
                        <h1 className="text-3xl font-semibold mb-6">Welcome back, {user.firstName}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <StatsCard icon={Calendar} title="Upcoming Meetings" value={meetingCount} />
                            <StatsCard icon={Users} title="Active Projects" value={2} />
                            <StatsCard icon={Star} title="Unread Messages" value={6} />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <UpcomingMeetings />
                            {/* <RecentActivity /> */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

// StatsCard Component
function StatsCard({ icon: Icon, title, value }: { icon: any; title: string; value: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
                    <Icon className="h-4 w-4 text-indigo-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white">{value}</div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

// UpcomingMeetings Component
function UpcomingMeetings() {
    const meetings = [
        { id: 1, title: 'Project Kickoff', time: 'Today, 3:00 PM' },
        { id: 2, title: 'Code Review', time: 'Tomorrow, 10:00 AM' },
        { id: 3, title: 'Team Sync', time: 'Friday, 2:00 PM' },
    ];

    return (
        <Card className="bg-gray-800 border-gray-700 w-full">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-white">Upcoming Meetings</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {meetings.map((meeting) => (
                        <motion.li
                            key={meeting.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
                        >
                            <div>
                                <p className="font-medium text-white">{meeting.title}</p>
                                <p className="text-sm text-gray-400">{meeting.time}</p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white"
                            >
                                Join
                            </Button>
                        </motion.li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

// MultiStepLoaderDemo Component
export function MultiStepLoaderDemo() {
    const [loading, setLoading] = useState(false);
    return (
        <div className="w-full h-[60vh] flex items-center justify-center">
            <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
        </div>
    );
}

// Fetch meeting count from Supabase
export async function getMeetingCount(): Promise<number> {
    const { count, error } = await supabase
        .from('meetings')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error fetching meeting count:', error);
        throw error;
    }

    return count || 0;
}

const loadingStates = [
    { text: 'Buying a condo' },
    { text: 'Travelling in a flight' },
    { text: 'Meeting Tyler Durden' },
    { text: 'He makes soap' },
    { text: 'We goto a bar' },
    { text: 'Start a fight' },
    { text: 'We like it' },
    { text: 'Welcome to F**** C***' },
];
// 'use client'
//
//
// export default function Example() {
//     const { isSignedIn, user, isLoaded } = useUser()
//
//     if (!isLoaded) {
//         return <div>Loading...</div>
//     }
//
//     if (!isSignedIn) {
//         return <div>Sign in to view this page</div>
//     }
//
//     return <div>Hello {user.firstName}!</div>
// }