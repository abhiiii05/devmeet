// app/meetings/page.tsx
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
    link: string;
    isStarred?: boolean;
}

export default function MeetingsPage() {
    const [meetings, setMeetings] = useState<Meeting[]>([]);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await fetch("/api/meetings");
                if (!response.ok) {
                    throw new Error("Failed to fetch meetings");
                }
                const data = await response.json();
                setMeetings(data);
            } catch (error) {
                console.error("Error fetching meetings:", error);
            }
        };

        fetchMeetings();
    }, []);

    const addMeeting = async (newMeeting) => {
        try {
            const response = await fetch("/api/meetings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMeeting),
            });

            if (!response.ok) {
                throw new Error("Failed to add meeting");
            }

            const data = await response.json();
            setMeetings([...meetings, data]);
        } catch (error) {
            console.error("Error adding meeting:", error);
        }
    };

    const deleteMeeting = async (id: string) => {
        const { error } = await supabase.from("meetings").delete().eq("id", id);
        if (error) console.error(error);
        else setMeetings(meetings.filter((meeting) => meeting.id !== id));
    };

    const updateMeeting = async (updatedMeeting: Meeting) => {
        try {

            const response = await fetch(`/api/meetings/${updatedMeeting.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedMeeting),
            });
            if (!response.ok) {
                throw new Error("Failed to update meeting");
            }
            const data = await response.json();
            setMeetings((prevMeetings) =>
                prevMeetings.map((meeting) =>
                    meeting.id === updatedMeeting.id ? data : meeting
                )
            );
        } catch (error) {
            console.error("Error updating meeting:", error);
        }
    };

    const toggleStar = async (id: string, isStarred: boolean) => {
        console.log("Toggling star for meeting:", id, "New state:", !isStarred);

        try {
            const { error } = await supabase
                .from("meetings")
                .update({ isStarred: !isStarred })
                .eq("id", id);

            if (error) {
                console.error("Error toggling star:", error);
            } else {
                console.log("Star toggled successfully");
                setMeetings((prevMeetings) =>
                    prevMeetings.map((meeting) =>
                        meeting.id === id ? { ...meeting, isStarred: !isStarred } : meeting
                    )
                );
            }
        } catch (error) {
            console.error("Error in toggleStar:", error);
        }
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
                                    onUpdate={updateMeeting}
                                    onToggleStar={toggleStar}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}