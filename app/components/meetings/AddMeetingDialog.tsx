"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

interface AddMeetingDialogProps {
    onAddMeeting: (meeting: { title: string; date: string; time: string; attendees: number }) => void;
}

export default function AddMeetingDialog({ onAddMeeting }: AddMeetingDialogProps) {
    const [newMeeting, setNewMeeting] = useState({
        title: "",
        date: "",
        time: "",
        attendees: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAddMeeting({
            ...newMeeting,
            attendees: parseInt(newMeeting.attendees),
        });
        setNewMeeting({ title: "", date: "", time: "", attendees: "" });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Add Meeting</Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-white">
                <DialogHeader>
                    <DialogTitle>Add New Meeting</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={newMeeting.title}
                            onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={newMeeting.date}
                            onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="time">Time</Label>
                        <Input
                            id="time"
                            type="time"
                            value={newMeeting.time}
                            onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="attendees">Number of Attendees</Label>
                        <Input
                            id="attendees"
                            type="number"
                            value={newMeeting.attendees}
                            onChange={(e) => setNewMeeting({ ...newMeeting, attendees: e.target.value })}
                            required
                        />
                    </div>
                    <Button type="submit">Add Meeting</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
