"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import CodeEditor from "@/components/CodeEditor";
import { useRouter } from 'next/router';

interface CodingChallenge {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
}

const programmingLanguages = ['C++', 'Python', 'Java', 'JavaScript'];

export default function Component() {
    const [code, setCode] = useState<string>('');
    const [consoleOutput, setConsoleOutput] = useState<string>('');
    const [selectedLanguage, setSelectedLanguage] = useState<string>('C++');
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const [problemData, setProblemData] = useState<CodingChallenge | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { cid, pid } = router.query;

    useEffect(() => {
        const fetchProblemData = async () => {
            try {
                if (!cid || !pid) return; // Wait until cid and pid are available

                setLoading(true);

                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

                // Fetch problem details
                const response = await fetch(`${API_URL}/problem/${cid}/${pid}`, {
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch problem data');
                }
                const data = await response.json();

                // Map data to your CodingChallenge interface
                const fetchedProblem: CodingChallenge = {
                    title: data.problem.name,
                    difficulty: mapDifficulty(data.problem.difficulty),
                    description: data.problem.description,
                };

                setProblemData(fetchedProblem);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProblemData();
    }, [cid, pid]);

    useEffect(() => {
        const savedCode = localStorage.getItem(`userCode_${pid}`);
        const savedLanguage = localStorage.getItem(`userLanguage_${pid}`);

        if (savedLanguage) {
            console.log(savedLanguage);
            handleLanguageChange(savedLanguage);
        }

        if (savedCode) {
            setCode(savedCode);
        }
        setIsInitialLoad(false);
        console.log('Set the code');
    }, [pid]);

    useEffect(() => {
        if (!isInitialLoad) {
            localStorage.setItem(`userCode_${pid}`, code);
            localStorage.setItem(`userLanguage_${pid}`, selectedLanguage);
            console.log('Saved the code');
        }
    }, [code, isInitialLoad, selectedLanguage, pid]);

    const handleLanguageChange = (value: string) => {
        setSelectedLanguage(value);
    };

    const handleRunCode = () => {
        setConsoleOutput(`Running ${selectedLanguage} code...\n\n// Output will appear here`);
    };

    const mapDifficulty = (difficulty: string): 'Easy' | 'Medium' | 'Hard' => {
        switch (difficulty) {
            case 'Easy':
            case 'Medium':
            case 'Hard':
                return difficulty;
            default:
                return 'Easy'; // Default to 'Easy' if difficulty is undefined
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
    }

    if (!problemData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                No problem data available
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <main className="max-w-7xl mx-auto">
                <Card className="p-4 mb-8 shadow-neumorphic">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <Menu className="mr-2 h-5 w-5 text-red-700" />
                            <h1 className="text-xl font-bold text-red-700">Contest {cid}</h1>
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
                        <h2 className="text-2xl font-bold text-red-700 mb-2">{problemData.title}</h2>
                        <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
              {problemData.difficulty}
            </span>
                        <p className="mt-4 whitespace-pre-wrap">{problemData.description}</p>
                    </Card>

                    <div className="flex-1 space-y-4">
                        <Card className="p-6 shadow-neumorphic">
                            <div className="flex justify-between items-center mb-4">
                                <div className="relative z-10">
                                    <Select onValueChange={handleLanguageChange} value={selectedLanguage}>
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
                                    <CodeEditor value={code} onChange={setCode} language={selectedLanguage} />
                                </div>
                            </Card>
                        </Card>

                        <Card className="p-6 shadow-neumorphic">
                            <h3 className="text-lg font-semibold mb-2">Console Output</h3>
                            <pre className="p-4 rounded-md overflow-x-auto border border-black">
                {consoleOutput || '// Run your code to see output'}
              </pre>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
