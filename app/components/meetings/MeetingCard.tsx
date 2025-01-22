"use client";

import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Clock, Users, X } from "lucide-react";

interface MeetingCardProps {
    meeting: { id: string; title: string; date: string; time: string; attendees: number };
    onDelete: (id: string) => void;
}

export default function MeetingCard({ meeting, onDelete }: MeetingCardProps) {
    return (
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle>{meeting.title}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => onDelete(meeting.id)}>
                    <X />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="text-sm">
                    <Calendar className="inline-block mr-2" />
                    {meeting.date}
                </div>
                <div className="text-sm">
                    <Clock className="inline-block mr-2" />
                    {meeting.time}
                </div>
                <div className="text-sm">
                    <Users className="inline-block mr-2" />
                    {meeting.attendees} attendees
                </div>
            </CardContent>
        </Card>
    );
}
