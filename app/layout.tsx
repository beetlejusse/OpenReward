import type React from "react";
import { Inter, Chathura } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { ToastProvider } from "@/components/toast-provider";
import "./globals.css";
import { Suspense } from "react";
import { Providers } from "@/components/Providers";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata = {
  title: "OpenReward - Decentralized Bounty Platform",
  description: "List bounties. Solve challenges. Earn crypto rewards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={`font-serif `}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <CustomCursor />
            <ToastProvider />
            <div className="flex min-h-screen">
              <div className="flex-1 overflow-hidden">
                <Providers>
                  <Suspense>{children}</Suspense>
                </Providers>
              </div>
            </div>
          </ThemeProvider>
          <Analytics />
        </body>
    </html>
  );
}
