"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, {useEffect, useRef} from "react";
import { io, Socket } from "socket.io-client";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
            socketRef.current = io("https://coder.cmpt.sfu.ca/");

            socketRef.current.on("connect", () => {
                console.log("Connected to server with ID:", socketRef.current?.id);
            });

            socketRef.current.on('heartbeat', () => {
                // @ts-ignore
                socketRef.current.emit('heartbeat');
            });

            socketRef.current.on("disconnect", () => {
                console.log("Disconnected from server");
            });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

  return (
      <html lang="en">
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 p-4`}
      >
      <header className="flex justify-between items-center mb-8">
        <Link href="/">
          <div className="text-3xl font-bold text-red-700 cursor-pointer">CS-CODER</div>
        </Link>
        <Link href="/user">
          <Button className="bg-white text-red-700 shadow-neumorphic transition-shadow">
            Login
          </Button>
        </Link>
      </header>
      {children}
      </body>
      </html>
  );
}
