"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import { BountyCard } from "@/components/bountycard";
import Link from "next/link";

const recentBounties = [
  {
    id: "1",
    title: "Implement EIP-4337 Account Abstraction",
    reward: "250 USDC",
    tags: ["Smart Contract", "Solidity", "EIP"],
    timeLeft: "3 days",
    difficulty: "Hard",
  },
  {
    id: "2",
    title: "Fix React Performance Issue in NFT Gallery",
    reward: "780 USDC",
    tags: ["Frontend", "React", "Performance"],
    timeLeft: "5 days",
    difficulty: "Medium",
  },
  {
    id: "3",
    title: "Create Subgraph for Token Transfers",
    reward: "160 USDC",
    tags: ["TheGraph", "GraphQL", "Indexing"],
    timeLeft: "7 days",
    difficulty: "Medium",
  },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = e;
      const { width, height, left, top } =
        containerRef.current.getBoundingClientRect();

      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      const elements = containerRef.current.querySelectorAll(".parallax");
      elements.forEach((el) => {
        const speed = Number.parseFloat(el.getAttribute("data-speed") || "0.1");
        const rotateX = y * 10 * speed;
        const rotateY = -x * 10 * speed;
        const translateX = -x * 20 * speed;
        const translateY = -y * 20 * speed;

        el.setAttribute(
          "style",
          `transform: translateX(${translateX}px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        );
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="noise" />
      </div>

      <div className="container mx-auto max-w-7xl mt-11">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-6 max-w-3xl"
          >
            <motion.h1
              className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              OpenReward
            </motion.h1>
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Revolutionize Open Source Collaboration
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              List bounties. Solve challenges. Earn crypto rewards. Join the
              decentralized ecosystem where contribution meets compensation.
            </motion.p>

            <motion.div
              className="flex gap-4 pt-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href={"/bounty"} passHref>
                <Button
                  size="lg"
                  className="group bg-primary hover:bg-primary/90 rounded-full px-6"
                >
                  <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                  List a Bounty
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href={"/bounty"}>
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90 rounded-full px-6"
              >
                <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                Solve Bounty
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Recent Bounties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBounties.map((bounty, index) => (
              <motion.div
                key={bounty.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="parallax"
                data-speed={0.05 + index * 0.02}
              >
                <BountyCard bounty={bounty} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
