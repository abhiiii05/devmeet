"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, Plus, X } from "lucide-react"
import { Header } from "../components/ui/header"
import { Sidebar } from "../components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"

// Define interfaces for our types
interface Meeting {
    id: number
    title: string
    date: string
    time: string
    attendees: number
}

interface NewMeeting {
    title: string
    date: string
    time: string
    attendees: string
}

interface MeetingCardProps {
    meeting: Meeting
    onDelete: (id: number) => void
    index: number
}

interface AddMeetingDialogProps {
    onAddMeeting: (meeting: Omit<Meeting, 'id'>) => void
}

export default function MeetingsPage() {
    const [meetings, setMeetings] = useState<Meeting[]>([
        { id: 1, title: "Team Standup", date: "2023-06-15", time: "09:00 AM", attendees: 5 },
        { id: 2, title: "Project Review", date: "2023-06-16", time: "02:00 PM", attendees: 8 },
        { id: 3, title: "Code Workshop", date: "2023-06-17", time: "10:00 AM", attendees: 12 },
    ])

    const addMeeting = (newMeeting: Omit<Meeting, 'id'>) => {
        setMeetings([...meetings, { id: meetings.length + 1, ...newMeeting }])
    }

    const deleteMeeting = (id: number) => {
        setMeetings(meetings.filter((meeting) => meeting.id !== id))
    }

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
                            {meetings.map((meeting, index) => (
                                <MeetingCard key={meeting.id} meeting={meeting} onDelete={deleteMeeting} index={index} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

function MeetingCard({ meeting, onDelete, index }: MeetingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
        >
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-lg font-medium text-white">{meeting.title}</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(meeting.id)}
                        className="text-gray-400 hover:text-white"
                    >
                        <X className="h-4 w-4" />
                    </Button>
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
                    <div className="flex items-center text-sm text-gray-400">
                        <Users className="h-4 w-4 mr-2" />
                        {meeting.attendees} attendees
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

function AddMeetingDialog({ onAddMeeting }: AddMeetingDialogProps) {
    const [newMeeting, setNewMeeting] = useState<NewMeeting>({
        title: "",
        date: "",
        time: "",
        attendees: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onAddMeeting({
            ...newMeeting,
            attendees: parseInt(newMeeting.attendees, 10) || 0
        })
        setNewMeeting({ title: "", date: "", time: "", attendees: "" })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="h-4 w-4 mr-2" /> Add Meeting
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
                            id="title"
                            value={newMeeting.title}
                            onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                            className="bg-gray-700 text-white border-gray-600"
                        />
                    </div>
                    <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={newMeeting.date}
                            onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                            className="bg-gray-700 text-white border-gray-600"
                        />
                    </div>
                    <div>
                        <Label htmlFor="time">Time</Label>
                        <Input
                            id="time"
                            type="time"
                            value={newMeeting.time}
                            onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                            className="bg-gray-700 text-white border-gray-600"
                        />
                    </div>
                    <div>
                        <Label htmlFor="attendees">Number of Attendees</Label>
                        <Input
                            id="attendees"
                            type="number"
                            value={newMeeting.attendees}
                            onChange={(e) => setNewMeeting({ ...newMeeting, attendees: e.target.value })}
                            className="bg-gray-700 text-white border-gray-600"
                        />
                    </div>
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Add Meeting
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}