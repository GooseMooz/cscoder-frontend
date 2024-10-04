"use client";
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from 'next/link';

interface Contest {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Normal' | 'Hard';
  startingSoon: boolean;
  category: string;
  location: string;
}

const contests: Contest[] = [
  { id: 1, title: "A Strange contest 2023", difficulty: "Hard", startingSoon: true, category: "Algorithms", location: "Remote" },
  { id: 2, title: "Dynamic Programming Challenge", difficulty: "Easy", startingSoon: false, category: "Dynamic Programming", location: "Burnaby" },
  { id: 3, title: "Data Structures Showdown", difficulty: "Normal", startingSoon: true, category: "Data Structures", location: "Surrey" },
  { id: 4, title: "Algorithm Marathon", difficulty: "Hard", startingSoon: false, category: "Algorithms", location: "Vancouver" },
  { id: 5, title: "Coding Sprint 2023", difficulty: "Easy", startingSoon: true, category: "Algorithms", location: "Remote" },
]

interface Filters {
  category: string;
  difficulty: string;
  location: string;
}

export default function Component() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filters, setFilters] = useState<Filters>({
    category: "All",
    difficulty: "All",
    location: "All"
  })

  const filteredContests = contests.filter(contest =>
      contest.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.category === "All" || contest.category === filters.category) &&
      (filters.difficulty === "All" || contest.difficulty === filters.difficulty) &&
      (filters.location === "All" || contest.location === filters.location)
  )

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }

  return (
      <div className="min-h-screen bg-gray-100 p-4">
        <header className="flex justify-between items-center mb-8">
          <div className="text-3xl font-bold text-red-700">CS-CODER</div>
          <Button className="bg-white text-red-700 shadow-neumorphic hover:shadow-neumorphic-inset transition-shadow">
            Login
          </Button>
        </header>

        <div className="flex gap-8">
          <aside className="w-64 bg-white p-4 rounded-lg shadow-neumorphic">
            <h2 className="text-xl font-semibold mb-4 text-red-700">Filters</h2>
            <div className="space-y-4">
              <FilterSection
                  title="Category"
                  options={["All", "Algorithms", "Dynamic Programming", "Data Structures"]}
                  currentFilter={filters.category}
                  onFilterChange={(value) => handleFilterChange("category", value)}
              />
              <FilterSection
                  title="Difficulty"
                  options={["All", "Easy", "Normal", "Hard"]}
                  currentFilter={filters.difficulty}
                  onFilterChange={(value) => handleFilterChange("difficulty", value)}
              />
              <FilterSection
                  title="Location"
                  options={["All", "Remote", "Burnaby", "Surrey", "Vancouver"]}
                  currentFilter={filters.location}
                  onFilterChange={(value) => handleFilterChange("location", value)}
              />
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex gap-4 mb-8">
              <Input
                  className="flex-1 bg-white shadow-neumorphic focus:shadow-neumorphic-inset transition-shadow"
                  placeholder="Search for ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="bg-white text-red-700 shadow-neumorphic hover:shadow-neumorphic-inset transition-shadow">
                Create
              </Button>
            </div>

            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredContests.map((contest) => (
                    <motion.div
                        key={contest.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        layout
                    >
                      <ContestCard contest={contest} />
                    </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </main>
        </div>
      </div>
  )
}

interface FilterSectionProps {
  title: string;
  options: string[];
  currentFilter: string;
  onFilterChange: (value: string) => void;
}

function FilterSection({ title, options, currentFilter, onFilterChange }: FilterSectionProps) {
  return (
      <div>
        <h3 className="font-medium text-red-700">{title}</h3>
        <ul className="mt-2 space-y-2">
          {options.map((option) => (
              <li
                  key={option}
                  className={`cursor-pointer ${currentFilter === option ? 'text-green-600' : 'text-gray-600'}`}
                  onClick={() => onFilterChange(option)}
              >
                {option}
              </li>
          ))}
        </ul>
      </div>
  )
}

interface ContestCardProps {
  contest: Contest;
}

function ContestCard({ contest }: ContestCardProps) {
  return (
      <Link href={`/contest.tsx`}>
        <Card className="bg-white p-4 rounded-lg shadow-neumorphic hover:shadow-neumorphic-hover transition-shadow cursor-pointer">
          <h3 className="font-semibold text-lg mb-2">{contest.title}</h3>
          <p className={`text-sm ${getDifficultyColor(contest.difficulty)}`}>
            {contest.difficulty}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {contest.startingSoon ? "Starting: soon..." : "Starting: later"}
          </p>
        </Card>
      </Link>
  )
}

function getDifficultyColor(difficulty: Contest['difficulty']): string {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-600'
    case 'Normal':
      return 'text-yellow-600'
    case 'Hard':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}