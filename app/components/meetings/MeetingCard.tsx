"use client";

import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Clock, Users, X ,Link} from "lucide-react";
import EditMeetingDialog from "@/app/components/meetings/UpdateMeeting";
import {useState} from "react";

interface MeetingCardProps {
    meeting: { id: string; title: string; date: string; time: string; attendees: number; link: string };
    onDelete: (id: string) => void;
    onUpdate: (updatedMeeting: {
        id: string;
        title: string;
        date: string;
        time: string;
        attendees: number;
        link: string;
    }) => void;
}

export default function MeetingCard({ meeting, onDelete, onUpdate}: MeetingCardProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    return (
        <>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }} // Add hover effect
            whileTap={{ scale: 0.98 }}  // Optional: Add a subtle tap effect
            // onClick={() => setIsEditDialogOpen(true)}
        >
            <Card className="bg-gray-800 border-gray-700 shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-white">{meeting.title}</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-white"
                        onClick={() => onDelete(meeting.id)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                        <Calendar className="h-4 w-4 mr-2"/>
                        {meeting.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                        <Clock className="h-4 w-4 mr-2"/>
                        {meeting.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                        <Users className="h-4 w-4 mr-2"/>
                        {meeting.attendees} attendees
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                        <Link className="h-4 w-4 mr-2"/>
                        {meeting.link}
                    </div>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold ">
                        Join Meeting
                    </Button>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold mt-3 " onClick={() => setIsEditDialogOpen(true)}>
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
