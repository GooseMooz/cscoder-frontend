import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react'

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

export default function Component() {
    const [code, setCode] = useState<string>('')

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(e.target.value)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <header className="flex justify-between items-center mb-8">
                <div className="text-3xl font-bold text-red-700">CS-CODER</div>
                <Button className="bg-white text-red-700 shadow-neumorphic hover:shadow-neumorphic-inset transition-shadow">
                    Login
                </Button>
            </header>

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

                    <Card className="flex-1 p-6 shadow-neumorphic">
                        <div className="relative h-full">
              <textarea
                  className="w-full h-full min-h-[400px] p-2 pl-10 font-mono text-sm bg-white resize-none focus:outline-none"
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="Type your code here..."
              />
                            <div className="absolute top-0 left-0 p-2 font-mono text-sm text-gray-400 select-none pointer-events-none">
                                {code.split('\n').map((_, i) => (
                                    <div key={i}>{i + 1}</div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    )
}