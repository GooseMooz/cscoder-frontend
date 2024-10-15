"use client"

import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { CheckCircle, XCircle } from 'lucide-react'
import Link from "next/link";

interface Problem {
    id: number;
    name: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'NULL';
    language: string;
    score: number;
    solved: boolean;
}

interface ContestData {
    title: string;
    startTime: string;
    duration: string;
    problems: Problem[];
    leaderboard: { name: string; score: number }[];
}

const contestData: ContestData = {
    title: "A strange contest 2024-1-80",
    startTime: "Starts: Soon...",
    duration: "Ends: 3 Hours",
    problems: [
        { id: 1, name: "Container with most water", difficulty: "Medium", language: "C++", score: 8080, solved: true },
        { id: 2, name: "Valid Palindrome", difficulty: "Easy", language: "C++", score: 808, solved: true },
        { id: 3, name: "Trapping rain water", difficulty: "Hard", language: "C++", score: 0, solved: false },
        { id: 4, name: "Secret Problem", difficulty: "NULL", language: "C++", score: 0, solved: false },
        { id: 5, name: "Valid Palindrome", difficulty: "Easy", language: "C++", score: 808, solved: true },
        { id: 6, name: "Container with most water", difficulty: "Medium", language: "C++", score: 8080, solved: true },
        { id: 7, name: "Filling water buckets", difficulty: "Hard", language: "C++", score: 0, solved: false },
        { id: 8, name: "Container with most water", difficulty: "Easy", language: "C++", score: 808, solved: true },
        { id: 9, name: "Container with most water", difficulty: "NULL", language: "C++", score: 0, solved: false },
        { id: 10, name: "Container with most water", difficulty: "Medium", language: "C++", score: 80808, solved: false },
    ],
    leaderboard: Array(14).fill({ name: "tza98", score: 80808 }),
}

export default function Component() {
    const totalProblems = contestData.problems.length;
    const solvedProblems = contestData.problems.filter(p => p.solved).length;
    const progress = (solvedProblems / totalProblems) * 100;

    return (
        <div className="min-h-screen bg-gray-100 p-4">

            <main className="max-w-7xl mx-auto">
                <Card className="p-4 mb-8 shadow-neumorphic">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-red-700">{contestData.title}</h1>
                        <div className="text-sm text-gray-600">
                            <span className="mr-4">{contestData.startTime}</span>
                            <span>{contestData.duration}</span>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </Card>

                <div className="flex gap-8">
                    <div className="flex-grow space-y-4">
                        <Card className="p-4 shadow-neumorphic">
                            <h2 className="text-xl font-bold text-red-700 mb-4">TWO POINTERS</h2>
                            <div className="text-sm text-gray-600 mb-4">
                                Tries: {solvedProblems}/{totalProblems} Score: {contestData.problems.reduce((sum, p) => sum + p.score, 0)}
                            </div>
                            <div className="space-y-2">
                                {contestData.problems.slice(0, 5).map((problem) => (
                                    <ProblemItem key={problem.id} problem={problem} />
                                ))}
                            </div>
                        </Card>

                        <Card className="p-4 shadow-neumorphic">
                            <div className="text-sm text-gray-600 mb-4">
                                Tries: {solvedProblems}/{totalProblems} Score: {contestData.problems.reduce((sum, p) => sum + p.score, 0)}
                            </div>
                            <h2 className="text-xl font-bold text-red-700 mb-4">TWO POINTERS</h2>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className="space-y-2">
                                {contestData.problems.slice(5).map((problem) => (
                                    <ProblemItem key={problem.id} problem={problem} />
                                ))}
                            </div>
                        </Card>
                    </div>

                    <Card className="w-64 p-4 shadow-neumorphic h-fit">
                        <h2 className="text-xl font-bold text-red-700 mb-4">LEADERBOARD</h2>
                        <div className="space-y-2">
                            {contestData.leaderboard.map((entry, index) => (
                                <div key={index} className="text-sm">
                                    {entry.name} - {entry.score}
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    )
}

function ProblemItem({ problem }: { problem: Problem }) {
    const [isHovered, setIsHovered] = useState(false);

    const difficultyColor = {
        Easy: 'hover:bg-green-100 border-green-300',
        Medium: 'hover:bg-yellow-100 border-yellow-300',
        Hard: 'hover:bg-red-100 border-red-300',
        NULL: 'hover:bg-gray-100 border-gray-300',
    }[problem.difficulty];

    const textColor = {
        Easy: 'text-green-600',
        Medium: 'text-yellow-600',
        Hard: 'text-red-600',
        NULL: 'text-gray-600',
    }[problem.difficulty];

    return (
        <Link href={'/coding'}>
            <div
                className={`flex items-center justify-between p-2 bg-white rounded-lg shadow-sm transition-colors duration-200 border ${difficultyColor} ${isHovered ? 'border-opacity-100' : 'border-opacity-0'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {problem.solved ? (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0"/>
                ) : (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0"/>
                )}
                <div className="flex-grow ml-2 truncate">{problem.name}</div>
                <div className={`mx-2 ${textColor} flex-shrink-0`}>{problem.difficulty}</div>
                <div className="mx-2 flex-shrink-0">{problem.language}</div>
                <div className="text-red-600 flex-shrink-0">{problem.score}</div>
            </div>
        </Link>
    )
}