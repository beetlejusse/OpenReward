"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BountyCard } from "@/components/bountycard"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

// Sample bounty data
const bounties = [
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
    reward: "80 USDC",
    tags: ["Frontend", "React", "Performance"],
    timeLeft: "5 days",
    difficulty: "Medium",
  },
  {
    id: "3",
    title: "Create Subgraph for Token Transfers",
    reward: "1200 USDC",
    tags: ["TheGraph", "GraphQL", "Indexing"],
    timeLeft: "7 days",
    difficulty: "Medium",
  },
  {
    id: "4",
    title: "Optimize Gas Usage in Staking Contract",
    reward: "150 USDC",
    tags: ["Solidity", "Gas Optimization", "DeFi"],
    timeLeft: "4 days",
    difficulty: "Hard",
  },
  {
    id: "5",
    title: "Design UI for Wallet Connection Flow",
    reward: "400 USDC",
    tags: ["UI/UX", "Design", "Figma"],
    timeLeft: "6 days",
    difficulty: "Easy",
  },
  {
    id: "6",
    title: "Implement zkSNARK Proof Verification",
    reward: "360 USDC",
    tags: ["Zero Knowledge", "Cryptography", "Solidity"],
    timeLeft: "10 days",
    difficulty: "Hard",
  },
]

export function BountyExplorer() {
  return (
    <section id="bounties" className="w-full py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Bounty Explorer
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Discover open bounties across the ecosystem. Filter by technology, reward size, or difficulty level to find
            the perfect challenge.
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 w-full justify-start bg-background/20 p-1 rounded-full overflow-hidden">
            <TabsTrigger
              value="all"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              All Bounties
            </TabsTrigger>
            <TabsTrigger
              value="trending"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Trending
            </TabsTrigger>
            <TabsTrigger
              value="new"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Newly Added
            </TabsTrigger>
            <TabsTrigger
              value="ending"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Ending Soon
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bounties.map((bounty, index) => (
                <motion.div
                  key={bounty.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <BountyCard bounty={bounty} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bounties.slice(0, 3).map((bounty, index) => (
                <motion.div
                  key={bounty.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <BountyCard bounty={bounty} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bounties.slice(3, 6).map((bounty, index) => (
                <motion.div
                  key={bounty.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <BountyCard bounty={bounty} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ending" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bounties.slice(1, 4).map((bounty, index) => (
                <motion.div
                  key={bounty.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <BountyCard bounty={bounty} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <Button  size="lg" className="group bg-primary hover:bg-primary/90 rounded-full px-6">
            <Link href="/bounty">Load More Bounties</Link>
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
