"use client"
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RefreshCcw, Search, PlusCircle, Trash } from 'lucide-react'
import CodeEditor from "@/components/CodeEditor";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface Problem {
    id: string;
    name: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface Test {
    input: string;
    expectedOutput: string;
}

// TODO: Fetch recently created problems from backend
const initialProblems: Problem[] = [
    { id: '1', name: 'Two Sum', difficulty: 'Easy' },
    { id: '2', name: 'Reverse Linked List', difficulty: 'Easy' },
    { id: '3', name: 'Binary Tree Level Order Traversal', difficulty: 'Medium' },
    { id: '4', name: 'Merge K Sorted Lists', difficulty: 'Hard' },
    { id: '5', name: 'Sliding Window Maximum', difficulty: 'Hard' },
]

const programmingLanguages = ['C++', 'Python', 'Java', 'JavaScript'] // Make sure these are the right ones

export default function ContestProblemCreation() {
    const [availableProblems, setAvailableProblems] = useState<Problem[]>(initialProblems)
    const [selectedProblems, setSelectedProblems] = useState<string[]>([])
    const [contestName, setContestName] = useState('')
    const [contestDescription, setContestDescription] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const [problemName, setProblemName] = useState('')
    const [problemDescription, setProblemDescription] = useState('')
    const [tests, setTests] = useState<Test[]>([{ input: '', expectedOutput: '' }])
    const [code, setCode] = useState('')
    const [activeTestTab, setActiveTestTab] = useState('0')
    const [selectedLanguage, setSelectedLanguage] = useState<string>('C++')

    useEffect(() => {
        // TODO: Add backend connection for this page
        //  - Assemble the problem data to the right format
        //  - Send the right problem data to the right backend endpoint
        const filteredProblems = initialProblems.filter(problem =>
            problem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            problem.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setAvailableProblems(filteredProblems)
    }, [searchTerm])

    const handleLanguageChange = (value: string) => {
        setSelectedLanguage(value)
    }

    const handleProblemSelection = (problemId: string) => {
        if (selectedProblems.includes(problemId)) {
            setSelectedProblems(selectedProblems.filter(id => id !== problemId))
        } else {
            setSelectedProblems([...selectedProblems, problemId])
        }
    }

    const handleRefresh = () => {
        setAvailableProblems(initialProblems)
    }

    const handleCreateContest = () => {
        console.log('Creating contest:', { contestName, contestDescription, selectedProblems })
        // Here you would typically send this data to your backend
    }

    const handleCreateProblem = () => {
        console.log('Creating problem:', { problemName, problemDescription, tests, code })
        // Here you would typically send this data to your backend
    }

    const handleAddTest = () => {
        const newTestIndex = tests.length.toString()
        setTests([...tests, { input: '', expectedOutput: '' }])
        setActiveTestTab(newTestIndex)
    }

    const handleRemoveTest = (index: number) => {
        const newTests = tests.filter((_, i) => i !== index)
        setTests(newTests)
        setActiveTestTab((parseInt(activeTestTab) <= index ? Math.max(0, index - 1) : activeTestTab).toString())
    }

    const handleTestChange = (index: number, field: 'input' | 'expectedOutput', value: string) => {
        const newTests = [...tests]
        newTests[index][field] = value
        setTests(newTests)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">

            <main className="max-w-6xl mx-auto">
                <Tabs defaultValue="contest" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="contest">Create Contest</TabsTrigger>
                        <TabsTrigger value="problem">Create Problem</TabsTrigger>
                    </TabsList>
                    <TabsContent value="contest">
                        <Card className="p-6 shadow-neumorphic">
                            <h2 className="text-2xl font-bold text-red-700 mb-4">Create a New Contest</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="contestName" className="block text-sm font-medium text-gray-700">Contest Name</label>
                                    <Input
                                        id="contestName"
                                        value={contestName}
                                        onChange={(e) => setContestName(e.target.value)}
                                        className="mt-1"
                                        placeholder="Enter contest name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contestDescription" className="block text-sm font-medium text-gray-700">Contest Description</label>
                                    <Textarea
                                        id="contestDescription"
                                        value={contestDescription}
                                        onChange={(e) => setContestDescription(e.target.value)}
                                        className="mt-1"
                                        placeholder="Enter contest description"
                                        rows={4}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Problems</label>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <div className="relative flex-grow">
                                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <Input
                                                type="text"
                                                placeholder="Search problems..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-8"
                                            />
                                        </div>
                                        <Button onClick={handleRefresh} variant="outline" size="icon">
                                            <RefreshCcw className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="max-h-60 overflow-y-auto space-y-2">
                                        {availableProblems.map((problem) => (
                                            <div key={problem.id} className="flex items-center space-x-2 p-2 bg-white rounded-md shadow-sm">
                                                <input
                                                    type="checkbox"
                                                    id={`problem-${problem.id}`}
                                                    checked={selectedProblems.includes(problem.id)}
                                                    onChange={() => handleProblemSelection(problem.id)}
                                                    className="rounded text-red-600 focus:ring-red-500"
                                                />
                                                <label htmlFor={`problem-${problem.id}`} className="flex-grow text-sm text-gray-700">
                                                    {problem.name}
                                                </label>
                                                <Badge variant={problem.difficulty === 'Easy' ? 'secondary' : problem.difficulty === 'Medium' ? 'default' : 'destructive'}>
                                                    {problem.difficulty}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Button onClick={handleCreateContest} className="w-full bg-red-700 hover:bg-red-800 text-white">
                                    Create Contest
                                </Button>
                            </div>
                        </Card>
                    </TabsContent>
                    <TabsContent value="problem">
                        <Card className="p-6 shadow-neumorphic">
                            <h2 className="text-2xl font-bold text-red-700 mb-4">Create a New Problem</h2>
                            <div className="flex gap-6">
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <label htmlFor="problemName" className="block text-sm font-medium text-gray-700">Problem Name</label>
                                        <Input
                                            id="problemName"
                                            value={problemName}
                                            onChange={(e) => setProblemName(e.target.value)}
                                            className="mt-1"
                                            placeholder="Enter problem name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="problemDescription" className="block text-sm font-medium text-gray-700">Problem Description</label>
                                        <Textarea
                                            id="problemDescription"
                                            value={problemDescription}
                                            onChange={(e) => setProblemDescription(e.target.value)}
                                            className="mt-1"
                                            placeholder="Enter problem description"
                                            rows={4}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Test Cases</label>
                                        <Tabs value={activeTestTab} onValueChange={setActiveTestTab}>
                                            <div className="flex items-center justify-between mb-2">
                                                <TabsList>
                                                    {tests.map((_, index) => (
                                                        <TabsTrigger key={index} value={index.toString()}>Test {index + 1}</TabsTrigger>
                                                    ))}
                                                </TabsList>
                                                <Button variant="outline" size="sm" onClick={handleAddTest}>
                                                    <PlusCircle className="h-4 w-4 mr-2" /> Add Test
                                                </Button>
                                            </div>
                                            {tests.map((test, index) => (
                                                <TabsContent key={index} value={index.toString()}>
                                                    <div className="space-y-2 p-4 bg-white rounded-md shadow-sm">
                                                        <div>
                                                            <label htmlFor={`input-${index}`} className="block text-xs font-medium text-gray-500">Input</label>
                                                            <Textarea
                                                                id={`input-${index}`}
                                                                value={test.input}
                                                                onChange={(e) => handleTestChange(index, 'input', e.target.value)}
                                                                className="mt-1"
                                                                placeholder="Enter test input"
                                                                rows={2}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor={`output-${index}`} className="block text-xs font-medium text-gray-500">Expected Output</label>
                                                            <Textarea
                                                                id={`output-${index}`}
                                                                value={test.expectedOutput}
                                                                onChange={(e) => handleTestChange(index, 'expectedOutput', e.target.value)}
                                                                className="mt-1"
                                                                placeholder="Enter expected output"
                                                                rows={2}
                                                            />
                                                        </div>
                                                        {tests.length > 1 && (
                                                            <Button variant="outline" size="sm" onClick={() => handleRemoveTest(index)} className="mt-2">
                                                                <Trash className="h-4 w-4 mr-2" /> Remove Test
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TabsContent>
                                            ))}
                                        </Tabs>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <Card className="p-6 shadow-neumorphic">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="relative z-10">
                                                <Select onValueChange={handleLanguageChange}
                                                        defaultValue={selectedLanguage}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select Language"/>
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
                                        </div>
                                        <Card className="flex-1 p-6 shadow-neumorphic">
                                            <div className="relative h-full">
                                                <CodeEditor value={code} onChange={setCode}
                                                            language={selectedLanguage}/>
                                            </div>
                                        </Card>
                                    </Card>
                                </div>
                            </div>
                            <Button onClick={handleCreateProblem}
                                    className="w-full bg-red-700 hover:bg-red-800 text-white mt-6">
                                Create Problem
                            </Button>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}