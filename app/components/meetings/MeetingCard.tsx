"use client";

import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Clock, Users, X } from "lucide-react";

interface MeetingCardProps {
    meeting: { id: string; title: string; date: string; time: string; attendees: number };
    onDelete: (id: string) => void;
}

export default function MeetingCard({ meeting, onDelete }: MeetingCardProps) {
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3}}
        >
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-white">{meeting.title}</CardTitle>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white"
                            onClick={() => onDelete(meeting.id)}>
                        <X className="h-4 w-4"/>
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
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                        <Users className="h-4 w-4 mr-2"/>
                        {meeting.attendees} attendees
                    </div>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold">Join Meeting</Button>
                </CardContent>
            </Card>
        </motion.div>
            );
            }
