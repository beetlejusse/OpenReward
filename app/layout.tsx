import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "OpenReward",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
         <main className="via-cyan-indigo-50 relative h-screen w-screen">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
