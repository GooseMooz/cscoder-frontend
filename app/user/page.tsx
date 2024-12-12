import React from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from 'next/link'
import { Trophy, Code, Star, PlusCircle, List, CheckCircle, FolderPlus, Medal, Target } from 'lucide-react'

interface UserStats {
    competitionsParticipated: number;
    problemsSolved: number;
    pointsAcquired: number;
    rank: string;
}

const userStats: UserStats = { // TODO: Add user stats to backend if possible
    competitionsParticipated: 15,
    problemsSolved: 87,
    pointsAcquired: 3450,
    rank: "Gold"
}

interface Activity {
    icon: React.ReactNode;
    text: string;
}

const recentActivities: Activity[] = [ /// TODO: Add recent activities to backend if possible
    { icon: <Trophy className="w-5 h-5 text-yellow-500" />, text: "Participated in 'Algorithm Challenge 2025'" },
    { icon: <CheckCircle className="w-5 h-5 text-green-500" />, text: "Solved 'Dynamic Programming Mastery' problem" },
    { icon: <FolderPlus className="w-5 h-5 text-blue-500" />, text: "Created 'Graph Theory Showdown' contest" },
    { icon: <Medal className="w-5 h-5 text-yellow-600" />, text: "Earned Gold rank" },
    { icon: <Target className="w-5 h-5 text-red-500" />, text: "Solved 100th problem" }
]

export default function UserAccount() {
    return (
        <div className="min-h-screen bg-gray-100 p-4">

            <main className="max-w-4xl mx-auto">
                <Card className="p-8 shadow-neumorphic mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-red-700">tza98</h1>
                        <span className="bg-yellow-400 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {userStats.rank}
            </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard
                            icon={<Trophy className="w-6 h-6 text-red-700" />}
                            title="Competitions"
                            value={userStats.competitionsParticipated}
                        />
                        <StatCard
                            icon={<Code className="w-6 h-6 text-red-700" />}
                            title="Problems Solved"
                            value={userStats.problemsSolved}
                        />
                        <StatCard
                            icon={<Star className="w-6 h-6 text-red-700" />}
                            title="Points"
                            value={userStats.pointsAcquired}
                        />
                    </div>
                </Card>

                <div className="flex flex-col md:flex-row gap-4">
                    <Link href={"/create"}>
                        // TODO: Check permissions of this user to show/hide this button
                        <Button className="flex-1 bg-white text-red-700 shadow-neumorphic transition-shadow">
                            <PlusCircle className="mr-2 h-4 w-4" /> Create New Contest/Problem
                        </Button>
                    </Link>

                    <Button className="flex-1 bg-white text-red-700 shadow-neumorphic transition-shadow">
                        <List className="mr-2 h-4 w-4" /> View My Competitions
                    </Button>
                </div>

                <Card className="mt-8 p-6 shadow-neumorphic">
                    <h2 className="text-2xl font-bold text-red-700 mb-4">Recent Activity</h2>
                    <ul className="space-y-2">
                        {recentActivities.map((activity, index) => (
                            <li key={index} className="bg-white p-3 rounded-md shadow-sm flex items-center space-x-3">
                                {activity.icon}
                                <span>{activity.text}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </main>
        </div>
    )
}

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: number;
}

function StatCard({ icon, title, value }: StatCardProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
            {icon}
            <div>
                <h2 className="text-sm font-medium text-gray-500">{title}</h2>
                <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    )
}