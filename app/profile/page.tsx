"use client"

import { motion } from "framer-motion"
import { Header } from "../components/ui/header"
import { Sidebar } from "../components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"

export default function ProfilePage() {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
                    <div className="container mx-auto px-6 py-8">
                        <h1 className="text-3xl font-semibold mb-6">Your Profile</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                                <Card className="bg-gray-800 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-semibold text-white">Personal Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl font-semibold">
                                                JD
                                            </div>
                                            <Button className="bg-indigo-600 hover:bg-indigo-700">Change Avatar</Button>
                                        </div>
                                        <div>
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" defaultValue="John Doe" className="bg-gray-700 text-white border-gray-600" />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                defaultValue="john.doe@example.com"
                                                className="bg-gray-700 text-white border-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                defaultValue="Full-stack developer passionate about creating innovative solutions."
                                                className="bg-gray-700 text-white border-gray-600"
                                            />
                                        </div>
                                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                <Card className="bg-gray-800 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-semibold text-white">Account Settings</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <Input id="current-password" type="password" className="bg-gray-700 text-white border-gray-600" />
                                        </div>
                                        <div>
                                            <Label htmlFor="new-password">New Password</Label>
                                            <Input id="new-password" type="password" className="bg-gray-700 text-white border-gray-600" />
                                        </div>
                                        <div>
                                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                                            <Input id="confirm-password" type="password" className="bg-gray-700 text-white border-gray-600" />
                                        </div>
                                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Change Password</Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

