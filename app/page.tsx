"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/main-components/hero";
import { BountyExplorer } from "@/components/main-components/explorebounty";
import { StatsSection } from "@/components/main-components/stats";
import { HowItWorks } from "@/components/main-components/working";
import { Footer } from "@/components/main-components/footer";
import { Navbar } from "@/components/main-components/navbar";
import Link from "next/link";
// import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  // const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  })

  if (!mounted) return null

  return (
    <div className="relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-background" />
      <div className="noise" />

      <Navbar />

      <AnimatePresence>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <HeroSection />
          <StatsSection />
          <BountyExplorer />
          <HowItWorks />
          <Footer />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
