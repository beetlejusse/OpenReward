"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Clock, Award, ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface BountyCardProps {
  bounty: {
    id: string
    title: string
    reward: string
    tags: string[]
    timeLeft: string
    difficulty: string
  }
}

export function BountyCard({ bounty }: BountyCardProps) {
  const difficultyColor =
    {
      Easy: "bg-green-500/20 text-green-500 border-green-500/30",
      Medium: "bg-primary/20 text-primary border-primary/30",
      Hard: "bg-red-500/20 text-red-500 border-red-500/30",
    }[bounty.difficulty] || "bg-blue-500/20 text-blue-500 border-blue-500/30"

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden group border border-primary/20 bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {bounty.title}
            </h3>
            <motion.div whileHover={{ rotate: 45 }} className="text-muted-foreground hover:text-primary cursor-pointer">
              <ArrowUpRight size={18} />
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {bounty.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-background/50 border-primary/20 text-xs px-2 py-0.5 rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span className="font-bold text-primary">{bounty.reward}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{bounty.timeLeft}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
