'use client';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { Calendar, Users, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Header } from './components/ui/header';
import { Sidebar } from './components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from './lib/supabaseClient';
import { ElementType } from 'react';

interface Meeting {
    id: number;
    title: string;
    time: string;
    date: string;
    attendees: string[];
    link: string;
    isStarred: boolean;
}

export default function DashboardPage() {
    const { isSignedIn, user, isLoaded } = useUser();
    const [totalAttendees, setTotalAttendees] = useState<number>(0);
    const [meetingCount, setMeetingCount] = useState<number>(0);
    const [impCount, setimpCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch meeting count
    useEffect(() => {
        const fetchData = async () => {
            try {
                const count = await getMeetingCount();
                setMeetingCount(count);
            } catch (error) {
                console.log(error);
                setError('Failed to fetch meeting count');
            } finally {
                setLoading(false);
            }
        };

        if (isLoaded && isSignedIn) {
            fetchData();
        }
    }, [isLoaded, isSignedIn]);

    useEffect(() => {
        const fetchTotalAttendees = async () => {
            try {
                const { data, error } = await supabase
                    .from('meetings')
                    .select('attendees');

                if (error) {
                    throw error;
                }

                // Calculate the sum of attendees manually
                const sum = data.reduce((acc, meeting) => acc + meeting.attendees, 0);
                setTotalAttendees(sum);
            } catch (error) {
                setError('Failed to fetch total attendees');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTotalAttendees();
    }, []);

    const fetchImportantMeetingsCount = async () => {
        try {
            const { count, error } = await supabase
                .from('meetings')
                .select('*', { count: 'exact', head: true })
                .eq('isStarred', true);

            if (error) {
                console.error('Error fetching important meetings count:', error);
            } else {
                console.log('Important meetings count fetched successfully:', count);
                setimpCount(count || 0);
            }
        } catch (error) {
            console.error('Error in fetchImportantMeetingsCount:', error);
        }
    };

    // Call fetchImportantMeetingsCount when the component mounts or when meetings change
    useEffect(() => {
        fetchImportantMeetingsCount();
    }, []);

    // Loading state
    if (!isLoaded) {
        return <div>Loading...</div>;
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
        return <div>Loading...</div>;
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
                            <StatsCard icon={Users} title="Total Attendees" value={totalAttendees} />
                            <StatsCard icon={Star} title="Important Meeting Count" value={impCount} />
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
function StatsCard({ icon: Icon, title, value }: { icon: ElementType; title: string; value: number }) {
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

const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
};

// UpcomingMeetings Component
function UpcomingMeetings() {
    const [meetings, setMeetings] = useState<Meeting[]>([]); // Specify the type
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all meetings from the API
        const fetchMeetings = async () => {
            try {
                const response = await fetch('/api/meetings');
                if (!response.ok) {
                    throw new Error('Failed to fetch meetings');
                }
                const data: Meeting[] = await response.json(); // Specify the type of the response
                setMeetings(data);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeetings();
    }, []);

    // Filter meetings to only include starred ones
    const starredMeetings = meetings.filter((meeting) => meeting.isStarred);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="bg-gray-800 border-gray-700 w-full">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-white">Important Meetings</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {starredMeetings.length === 0 ? (
                        <p className="text-gray-400">No important meetings found.</p>
                    ) : (
                        starredMeetings.map((meeting) => (
                            <motion.li
                                key={meeting.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
                            >
                                <div>
                                    <p className="font-bold text-xl text-white">{meeting.title}</p>
                                    <p className="text-sm text-gray-400">
                                        {formatDate(meeting.date)} at {meeting.time}
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white"
                                >
                                    Join
                                </Button>
                            </motion.li>
                        ))
                    )}
                </ul>
            </CardContent>
        </Card>
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