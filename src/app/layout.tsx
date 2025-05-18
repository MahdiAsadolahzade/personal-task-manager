"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useScreenSizeDetector } from "@/hooks/useScreenSizeDetector";
import Header from "@/components/layout/Header";
import { useAppStore } from "@/stores/app.store";
import { Dialog } from "@/components/dialog/Dialog";
import clsx from "clsx";
import { useAppVersionControl } from "@/hooks/useAppVersionControl";

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
  useAppVersionControl();

  const { theme, isMobile } = useAppStore();
 


  
  return (
    <html lang="en" data-theme={theme}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#009688" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="description" content="A simple personal task manager" />
        <title>Personal Task Manager</title>
      </head>

      <body
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          "antialiased relative h-screen overflow-hidden flex flex-col"
        )}
      >
        {/* Header for desktop */}
        {!isMobile && <Header />}

        {/* Main content area */}
        <main
          className={clsx(
            "flex-1 overflow-y-auto",
            "p-4 md:p-8 lg:p-12 xl:p-16 2xl:p-20",
            isMobile ? "pb-16" : ""
          )}
          style={{
            maxHeight: isMobile ? "calc(100vh - 56px)" : "auto",
          }}
        >
          {children}
        </main>

        {/* Header for mobile at bottom */}
        {isMobile && (
          <div className="fixed bottom-0 w-full z-50">
            <Header />
          </div>
        )}

        <Dialog />
      </body>
    </html>
  );
}
