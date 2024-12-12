"use client";

// TODO: Change this page to use the contest id from the URL
//  CID should be the pulled from the URL
//  Figure out if the JSON is right
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from 'lucide-react';
import Link from "next/link";
import { useRouter } from 'next/router';

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

export default function Component() {
    const API_URL = 'http://localhost:5000';
    const [contestData, setContestData] = useState<ContestData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { cid } = router.query;

    useEffect(() => {
        const fetchContestData = async () => {
            try {
                if (!cid) return; // Wait until cid is available

                setLoading(true);

                // Fetch contest details and problems
                const contestResponse = await fetch(`${API_URL}/contest/${cid}`, {
                    credentials: 'include',
                });
                if (!contestResponse.ok) {
                    throw new Error('Failed to fetch contest data');
                }
                const contestData = await contestResponse.json();

                // Fetch leaderboard data
                const leaderboardResponse = await fetch(`${API_URL}/scoreboard/${cid}`, {
                    credentials: 'include',
                });
                if (!leaderboardResponse.ok) {
                    throw new Error('Failed to fetch leaderboard data');
                }
                const leaderboardData = await leaderboardResponse.json();

                // Map data to your ContestData interface
                const mappedContestData: ContestData = {
                    title: leaderboardData.contest.name,
                    startTime: `Starts: ${new Date(leaderboardData.contest.starts_at).toLocaleString()}`,
                    duration: `Ends: ${new Date(leaderboardData.contest.ends_at).toLocaleString()}`,
                    problems: contestData.contestProblemsStatus.map((problem: any) => ({
                        id: problem.pid,
                        name: problem.name,
                        difficulty: mapDifficulty(problem.difficulty),
                        language: problem.language || 'N/A',
                        score: problem.score,
                        solved: problem.status === 'correct',
                    })),
                    leaderboard: leaderboardData.allStatus.map((entry: any) => ({
                        name: entry.user.computing_id,
                        score: entry.total_score,
                    })),
                };

                setContestData(mappedContestData);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContestData();
    }, [cid]);

    const mapDifficulty = (difficulty: string): 'Easy' | 'Medium' | 'Hard' | 'NULL' => {
        switch (difficulty) {
            case 'Easy':
            case 'Medium':
            case 'Hard':
                return difficulty;
            default:
                return 'NULL';
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
    }

    if (!contestData) {
        return <div className="min-h-screen flex items-center justify-center">No data available</div>;
    }

    const totalProblems = contestData.problems.length;
    const solvedProblems = contestData.problems.filter((p) => p.solved).length;
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
                        <div
                            className="bg-red-600 h-2.5 rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </Card>

                <div className="flex gap-8">
                    <div className="flex-grow space-y-4">
                        {/* First Half of Problems */}
                        <Card className="p-4 shadow-neumorphic">
                            <h2 className="text-xl font-bold text-red-700 mb-4">Problems</h2>
                            <div className="text-sm text-gray-600 mb-4">
                                Tries: {solvedProblems}/{totalProblems} Score:{' '}
                                {contestData.problems.reduce((sum, p) => sum + p.score, 0)}
                            </div>
                            <div className="space-y-2">
                                {contestData.problems.slice(0, Math.ceil(totalProblems / 2)).map((problem) => (
                                    <ProblemItem key={problem.id} problem={problem} />
                                ))}
                            </div>
                        </Card>

                        {/* Second Half of Problems */}
                        <Card className="p-4 shadow-neumorphic">
                            <h2 className="text-xl font-bold text-red-700 mb-4">Problems</h2>
                            <div className="text-sm text-gray-600 mb-4">
                                Tries: {solvedProblems}/{totalProblems} Score:{' '}
                                {contestData.problems.reduce((sum, p) => sum + p.score, 0)}
                            </div>
                            <div className="space-y-2">
                                {contestData.problems.slice(Math.ceil(totalProblems / 2)).map((problem) => (
                                    <ProblemItem key={problem.id} problem={problem} />
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Leaderboard */}
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
    );
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
        <Link href={`/coding/${problem.id}`}>
            <div
                className={`flex items-center justify-between p-2 bg-white rounded-lg shadow-sm transition-colors duration-200 border ${difficultyColor} ${
                    isHovered ? 'border-opacity-100' : 'border-opacity-0'
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {problem.solved ? (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                )}
                <div className="flex-grow ml-2 truncate">{problem.name}</div>
                <div className={`mx-2 ${textColor} flex-shrink-0`}>{problem.difficulty}</div>
                <div className="mx-2 flex-shrink-0">{problem.language}</div>
                <div className="text-red-600 flex-shrink-0">{problem.score}</div>
            </div>
        </Link>
    );
}
