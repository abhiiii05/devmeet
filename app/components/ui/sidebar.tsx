"use client"

import { motion } from "framer-motion"
import { Home, Calendar, Users, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
    { icon: Home, text: "Dashboard", href: "/" },
    { icon: Calendar, text: "Meetings", href: "/meetings" },
    // { icon: Users, text: "Teams", href: "/teams" },
    { icon: Users, text: "Profile", href: "/profile" },
    { icon: Settings, text: "Settings", href: "/settings" },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 text-white w-64 min-h-screen p-4"
        >
            <div className="flex items-center justify-center mb-8">
                <h1 className="text-2xl font-bold">DevMeetup</h1>
            </div>
            <nav>
                <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                        <motion.li
                            key={item.text}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Link
                                href={item.href}
                                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                                    pathname === item.href ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.text}</span>
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </nav>
            <div className="absolute bottom-4">
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-400 hover:text-white">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                </button>
            </div>
        </motion.aside>
    )
}

