"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

interface EditMeetingDialogProps {
    isOpen: boolean;
    onClose: () => void;
    meeting: {
        id: string;
        title: string;
        date: string;
        time: string;
        attendees: number;
        link: string;
    };
    onSave: (updatedMeeting: {
        id: string;
        title: string;
        date: string;
        time: string;
        attendees: number;
        link: string;
    }) => void;
}

export default function EditMeetingDialog({ isOpen, onClose, meeting, onSave }: EditMeetingDialogProps) {
    const [title, setTitle] = useState(meeting.title);
    const [date, setDate] = useState(meeting.date);
    const [time, setTime] = useState(meeting.time);
    const [attendees, setAttendees] = useState(meeting.attendees.toString());
    const [link, setLink] = useState(meeting.link);

    const handleSave = () => {
        onSave({
            id: meeting.id,
            title,
            date,
            time,
            attendees: parseInt(attendees),
            link,
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-gray-800 text-white">
                <DialogHeader>
                    <DialogTitle>Edit Meeting</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                    className="space-y-4"
                >
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            className="text-black"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                            className="text-black"
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="time">Time</Label>
                        <Input
                            className="text-black"
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="attendees">Number of Attendees</Label>
                        <Input
                            className="text-black"
                            id="attendees"
                            type="number"
                            value={attendees}
                            onChange={(e) => setAttendees(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="link">Meeting Link</Label>
                        <Input
                            className="text-black"
                            id="link"
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="text-black w-20 font-bold"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-indigo-600 w-20 font-bold ">
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}