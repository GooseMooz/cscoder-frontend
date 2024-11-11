import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { SparklesCore } from '@/components/ui/sparkles'

export default function MainPage() {
  return (
    <div 
      className="min-h-screen w-full bg-gray-100 flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
        backgroundSize: '100% 100%',
        transition: 'background-position 0.3s ease-out'
      }}
    >
          <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-red-700 relative z-20">
            CS-CODER
          </h1>
          <div className="w-[40rem] h-10 relative">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-red-600 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-300 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-400 to-transparent h-px w-1/4" />
            {/*<div className="absolute inset-0 w-full h-full bg-gray-100 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>*/}
          </div>
      <p className="text-xl text-gray-700 mb-12 text-center max-w-2xl">
        Your ultimate platform for coding contests and challenges. Sharpen your skills, compete with others, and become a coding master!
      </p>
      <div className="space-y-6 flex flex-col items-center">
        <Button asChild className="bg-red-700 hover:bg-red-800 text-white px-12 py-6 rounded-lg text-2xl font-semibold transition-colors duration-300">
          <Link href="/user">Log In with SFU</Link>
        </Button>
        <Button asChild variant="outline" className="bg-white hover:bg-gray-200 text-red-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300">
          <Link href="/contests">Continue as Guest</Link>
        </Button>
      </div>
    </div>
  )
}
