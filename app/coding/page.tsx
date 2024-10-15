// <Card className="flex-1 p-6 shadow-neumorphic">
//     <div className="relative h-full">
//         <CodeEditor value={code} onChange={setCode} />
//     </div>
// </Card>

"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import Link from 'next/link'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import CodeEditor from "@/components/CodeEditor";

interface CodingChallenge {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
}

const challenge: CodingChallenge = {
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    description: `You are given an array of integers nums and an
integer k. There is a sliding window of
size k that starts at the left edge of the
array. The window slides one position to the
right until it reaches the right edge of the
array.

Return a list that contains the maximum element
in the window at each step.`
}

const programmingLanguages = ['C++', 'Python', 'Java', 'JavaScript', 'TypeScript']

export default function Component() {
    const [code, setCode] = useState<string>('')
    const [consoleOutput, setConsoleOutput] = useState<string>('')
    const [selectedLanguage, setSelectedLanguage] = useState<string>('C++')

    // const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setCode(e.target.value)
    // }

    const handleLanguageChange = (value: string) => {
        setSelectedLanguage(value)
    }

    const handleRunCode = () => {
        setConsoleOutput(`Running ${selectedLanguage} code...\n\n// Output will appear here`)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">

            <main className="max-w-7xl mx-auto">
                <Card className="p-4 mb-8 shadow-neumorphic">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <Menu className="mr-2 h-5 w-5 text-red-700" />
                            <h1 className="text-xl font-bold text-red-700">A Strange Contest 2025...</h1>
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="icon">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>

                <div className="flex gap-8">
                    <Card className="flex-1 p-6 shadow-neumorphic">
                        <h2 className="text-2xl font-bold text-red-700 mb-2">{challenge.title}</h2>
                        <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
              {challenge.difficulty}
            </span>
                        <p className="mt-4 whitespace-pre-wrap">{challenge.description}</p>
                    </Card>

                    <div className="flex-1 space-y-4">
                        <Card className="p-6 shadow-neumorphic">
                            <div className="flex justify-between items-center mb-4">
                                <div className="relative z-10">
                                    <Select onValueChange={handleLanguageChange} defaultValue={selectedLanguage}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select Language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {programmingLanguages.map((lang) => (
                                                <SelectItem key={lang} value={lang}>
                                                    {lang}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={handleRunCode}>Run Code</Button>
                            </div>
                            <Card className="flex-1 p-6 shadow-neumorphic">
                                <div className="relative h-full">
                                    <CodeEditor value={code} onChange={setCode} />
                                </div>
                            </Card>
                        </Card>

                        <Card className="p-6 shadow-neumorphic">
                            <h3 className="text-lg font-semibold mb-2">Console Output</h3>
                            <pre className="p-4 rounded-md overflow-x-auto border border-black">
                {consoleOutput || "// Run your code to see output"}
              </pre>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}