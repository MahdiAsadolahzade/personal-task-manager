"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useScreenSizeDetector } from "@/hooks/useScreenSizeDetector";
import Header from "@/components/layout/Header";
import { useAppStore } from "@/stores/app.store";
import { useEffect } from "react";

import { checkForAppUpdate } from "@/lib/checkForAppUpdate";
import { useDialogStore } from "@/stores/dialog.store";
import { Dialog } from "@/components/dialog/Dialog";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useScreenSizeDetector();
  const { theme } = useAppStore();

  useEffect(() => {
    checkForAppUpdate();
  }, []);

  return (
    <html
      lang="en"
      data-theme={
        theme
      }
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="description" content="A simple personal task manager" />
        <title>Personal Task Manager</title>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <Header />

        <div className="p-4 md:p-8 lg:p-12 xl:p-16 2xl:p-20">{children}
          <Dialog/>
        </div>
      </body>
    </html>
  );
}
