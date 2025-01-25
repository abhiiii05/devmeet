"use client"

import { motion } from "framer-motion"
import { Bell, Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <header className="bg-gray-800 border-b border-gray-700 py-4 px-6">
            <div className="flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                >
                    <Search className="h-5 w-5 text-gray-400 mr-2" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="bg-gray-700 text-white placeholder-gray-400 border-gray-600 w-64"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-4"
                >
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white h-9"
                    >
                        + Create Meeting
                    </Button>
                    
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                        JD
                    </div>
                </motion.div>
            </div>
        </header>
    )
}

