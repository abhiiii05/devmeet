"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Header } from "../components/ui/header";
import { Sidebar } from "../components/ui/sidebar";
import AddMeetingDialog from "../components/meetings/AddMeetingDialog";
import MeetingCard from "../components/meetings/MeetingCard";

interface Meeting {
    id: string;
    title: string;
    date: string;
    time: string;
    attendees: number;
}

export default function MeetingsPage() {
    const [meetings, setMeetings] = useState<Meeting[]>([]);

    // Fetch meetings from Supabase
    useEffect(() => {
        const fetchMeetings = async () => {
            const { data, error } = await supabase.from("meetings").select("*");
            if (error) console.error(error);
            else setMeetings(data || []);
        };

        fetchMeetings();
    }, []);

    const addMeeting = async (newMeeting: Omit<Meeting, "id">) => {
        const { data, error } = await supabase
            .from("meetings")
            .insert(newMeeting)
            .select();
        if (error) console.error(error);
        else setMeetings([...meetings, ...data]);
    };

    const deleteMeeting = async (id: string) => {
        const { error } = await supabase.from("meetings").delete().eq("id", id);
        if (error) console.error(error);
        else setMeetings(meetings.filter((meeting) => meeting.id !== id));
    };

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
                    <div className="container mx-auto px-6 py-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-semibold">Meetings</h1>
                            <AddMeetingDialog onAddMeeting={addMeeting} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {meetings.map((meeting) => (
                                <MeetingCard
                                    key={meeting.id}
                                    meeting={meeting}
                                    onDelete={deleteMeeting}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
