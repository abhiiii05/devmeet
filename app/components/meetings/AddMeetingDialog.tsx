"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

interface AddMeetingDialogProps {
    onAddMeeting: (meeting: { title: string; date: string; time: string; attendees: number; link:string }) => void;
}

export default function AddMeetingDialog({ onAddMeeting }: AddMeetingDialogProps) {
    const [newMeeting, setNewMeeting] = useState({
        title: "",
        date: "",
        time: "",
        attendees: "",
        link: "",
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAddMeeting({
            ...newMeeting,
            attendees: parseInt(newMeeting.attendees),
        });
        setNewMeeting({ title: "", date: "", time: "", attendees: "",link: "" });

        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 w-36"
                >
                    + Add Meeting
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-white">
                <DialogHeader>
                    <DialogTitle>Add New Meeting</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            className="text-black"
                            id="title"
                            value={newMeeting.title}
                            onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                            className="text-black"
                            id="date"
                            type="date"
                            value={newMeeting.date}
                            onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="time">Time</Label>
                        <Input
                            className="text-black"
                            id="time"
                            type="time"
                            value={newMeeting.time}
                            onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="attendees">Number of Attendees</Label>
                        <Input
                            className="text-black"
                            id="attendees"
                            type="number"
                            value={newMeeting.attendees}
                            onChange={(e) =>
                                setNewMeeting({...newMeeting, attendees: e.target.value})
                            }
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="attendees">Meeting Link</Label>
                        <Input
                            className="text-black"
                            id="attendees"
                            type="text"
                            value={newMeeting.link}
                            onChange={(e) =>
                                setNewMeeting({...newMeeting, link: e.target.value})
                            }
                            required
                        />
                    </div>
                    <Button className="bg-indigo-600 w-28" type="submit">
                        Add Meeting
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}