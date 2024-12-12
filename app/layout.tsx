"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import { io, Socket } from "socket.io-client";

// TODO: Figure out if this is the right way of making the socket connection
//  Maybe change to bringing the socket with cookies or something
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
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
            socketRef.current = io("https://coder.cmpt.sfu.ca/");

            socketRef.current.on("connect", () => {
                console.log("Connected to server with ID:", socketRef.current?.id);
            });

            socketRef.current.on('heartbeat', () => {
                // @ts-ignore
                socketRef.current.emit('heartbeat');
                console.log("Got a heartbeat!");
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
          // TODO: Change this ling to logging in or getting into your profile
        <Link href={`/user/${userLoggedIn ? userName : ""}`}>
            // TODO: Add SFU login AND change if the user is logged in
          <Button className="bg-white hover:bg-gray-200 text-red-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300">
            {userLoggedIn ? userName : "Log In"}
          </Button>
        </Link>
      </header>
      {children}
      </body>
      </html>
  );
}
