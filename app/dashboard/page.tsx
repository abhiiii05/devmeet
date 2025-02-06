'use client'

import { motion } from 'framer-motion'
import { Calendar, Users, MessageSquare, Plus, Star } from 'lucide-react'
import { Header } from '../components/ui/header'
import { Sidebar } from '../components/ui/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
                    <div className="container mx-auto px-6 py-8">
                        <h1 className="text-3xl font-semibold mb-6">Welcome back </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <StatsCard icon={Calendar} title="Upcoming Meetings" value="3" />
                            <StatsCard icon={Users} title="Active Projects" value="5" />
                            <StatsCard icon={Star} title="Unread Messages" value="12" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <UpcomingMeetings />
                            {/*<RecentActivity />*/}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

function StatsCard({ icon: Icon, title, value }: { icon: any, title: string, value: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="bg-gray-800 border-gray-700 ">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium text-gray-400 w">{title}</CardTitle>
                    <Icon className="h-4 w-4 text-indigo-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white ">{value}</div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

function UpcomingMeetings() {
    const meetings = [
        { id: 1, title: "Project Kickoff", time: "Today, 3:00 PM" },
        { id: 2, title: "Code Review", time: "Tomorrow, 10:00 AM" },
        { id: 3, title: "Team Sync", time: "Friday, 2:00 PM" },
    ]

    return (
        <Card className="bg-gray-800 border-gray-700 max-w-full ">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-white text">Upcoming Meetings</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {meetings.map((meeting) => (
                        <motion.li
                            key={meeting.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
                        >
                            <div>
                                <p className="font-medium text-white">{meeting.title}</p>
                                <p className="text-sm text-gray-400">{meeting.time}</p>
                            </div>
                            <Button variant="outline" size="sm" className="text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                                Join
                            </Button>
                        </motion.li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

// function RecentActivity() {
//     const activities = [
//         { id: 1, text: "Alice commented on your pull request", time: "2 hours ago" },
//         { id: 2, text: "Bob invited you to a new project", time: "Yesterday" },
//         { id: 3, text: "You completed the 'React Basics' course", time: "3 days ago" },
//     ]

    // return (
    //     <Card className="bg-gray-800 border-gray-700">
    //         <CardHeader>
    //             <CardTitle className="text-xl font-semibold text-white">Recent Activity</CardTitle>
    //         </CardHeader>
    //         <CardContent>
    //             <ul className="space-y-4">
    //                 {activities.map((activity, index) => (
    //                     <motion.li
    //                         key={activity.id}
    //                         initial={{ opacity: 0, y: 20 }}
    //                         animate={{ opacity: 1, y: 0 }}
    //                         transition={{ duration: 0.3, delay: index * 0.1 }}
    //                         className="flex items-start space-x-3 bg-gray-700 p-3 rounded-lg"
    //                     >
    //                         <div className="flex-shrink-0">
    //                             <div className="w-2 h-2 mt-2 rounded-full bg-indigo-400" />
    //                         </div>
    //                         <div>
    //                             <p className="text-white">{activity.text}</p>
    //                             <p className="text-sm text-gray-400">{activity.time}</p>
    //                         </div>
    //                     </motion.li>
    //                 ))}
    //             </ul>
    //         </CardContent>
    //     </Card>
    // )
// }