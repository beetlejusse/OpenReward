"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Users, Award, Code, Coins } from "lucide-react"
import CountUp from "react-countup"

interface StatCardProps {
  icon: React.ReactNode
  value: number
  label: string
  prefix?: string
  suffix?: string
  delay?: number
}

function StatCard({ icon, value, label, prefix = "", suffix = "", delay = 0 }: StatCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <Card className="p-6 border border-primary/20 bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-primary/10 p-3">{icon}</div>
          <div>
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              {prefix}
              {isInView ? <CountUp end={value} duration={2.5} separator="," /> : 0}
              {suffix}
            </h3>
            <p className="text-muted-foreground">{label}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export function StatsSection() {
  return (
    <section className="w-full py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/0 via-primary/5 to-background/0" />
        <div className="noise" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Growing Ecosystem
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Join thousands of developers and organizations building the future of open source collaboration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Users className="h-6 w-6 text-primary" />} value={15420} label="Active Users" delay={0.1} />
          <StatCard
            icon={<Award className="h-6 w-6 text-primary" />}
            value={2845}
            label="Bounties Completed"
            delay={0.2}
          />
          <StatCard icon={<Code className="h-6 w-6 text-primary" />} value={4328} label="Open Bounties" delay={0.3} />
          <StatCard
            icon={<Coins className="h-6 w-6 text-primary" />}
            value={1250}
            label="ETH Distributed"
            prefix="$"
            suffix="K"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  )
}
