// app/components/meetings/MeetingCard.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Clock, Users, X, Link, Star } from "lucide-react";
import EditMeetingDialog from "@/app/components/meetings/UpdateMeeting";
import { useState } from "react";

interface MeetingCardProps {
    meeting: {
        id: string;
        title: string;
        date: string;
        time: string;
        attendees: number;
        link: string;
        isStarred?: boolean; // Add isStarred to the meeting interface
    };
    onDelete: (id: string) => void;
    onUpdate: (updatedMeeting: {
        id: string;
        title: string;
        date: string;
        time: string;
        attendees: number;
        link: string;
        isStarred?: boolean;
    }) => void;
    onToggleStar: (id: string, isStarred: boolean) => void;
}

export default function MeetingCard({ meeting, onDelete, onUpdate, onToggleStar }: MeetingCardProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleStarClick = () => {
        console.log("Star clicked for meeting:", meeting.id, "Current state:", meeting.isStarred);
        onToggleStar(meeting.id, meeting.isStarred || false); // Toggle the star state
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
            >
                <Card className="bg-gray-800 border-gray-700 shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-white">{meeting.title}</CardTitle>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`text-gray-400 hover:text-yellow-400 ${
                                    meeting.isStarred ? "text-yellow-400" : ""
                                }`}
                                onClick={handleStarClick}
                            >
                                <Star
                                    className={`h-4 w-4 ${
                                        meeting.isStarred ? "fill-yellow-400" : "fill-none"
                                    }`}
                                />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white"
                                onClick={() => onDelete(meeting.id)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-sm text-gray-400 mb-2">
                            <Calendar className="h-4 w-4 mr-2" />
                            {meeting.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-400 mb-2">
                            <Clock className="h-4 w-4 mr-2" />
                            {meeting.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-400 mb-2">
                            <Users className="h-4 w-4 mr-2" />
                            {meeting.attendees} attendees
                        </div>
                        <div className="flex items-center text-sm text-gray-400 mb-4">
                            <Link className="h-4 w-4 mr-2" />
                            {meeting.link}
                        </div>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
                            Join Meeting
                        </Button>
                        <Button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold mt-3"
                            onClick={() => setIsEditDialogOpen(true)}
                        >
                            Edit
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
            <EditMeetingDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                meeting={meeting}
                onSave={onUpdate}
            />
        </>
    );
}