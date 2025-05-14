// "use client"

// import { useRef } from "react"
// import { motion, useInView } from "framer-motion"
// import { Card, CardContent } from "@/components/ui/card"
// import { FileEdit, Search, Award, Wallet } from "lucide-react"

// const steps = [
//   {
//     icon: <FileEdit className="h-10 w-10 text-primary" />,
//     title: "Create a Bounty",
//     description: "List your issue with clear requirements and set a reward amount in cryptocurrency.",
//   },
//   {
//     icon: <Search className="h-10 w-10 text-primary" />,
//     title: "Find Contributors",
//     description: "Developers discover your bounty and submit solutions through pull requests.",
//   },
//   {
//     icon: <Award className="h-10 w-10 text-primary" />,
//     title: "Review & Accept",
//     description: "Review submissions and accept the best solution that meets your requirements.",
//   },
//   {
//     icon: <Wallet className="h-10 w-10 text-primary" />,
//     title: "Automatic Payout",
//     description: "Smart contracts automatically transfer the reward to the contributor's wallet.",
//   },
// ]

// export function HowItWorks() {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true, amount: 0.2 })

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   }

//   return (
//     <section id="how-it-works" className="w-full py-20 px-4 relative overflow-hidden">
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/0 via-primary/5 to-background/0" />
//         <div className="noise" />
//       </div>

//       <div className="container mx-auto max-w-7xl">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
//             How It Works
//           </h2>
//           <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
//             OpenReward simplifies the process of funding and contributing to open source projects through a transparent,
//             decentralized workflow.
//           </p>
//         </motion.div>

//         <motion.div
//           ref={ref}
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
//         >
//           {steps.map((step, index) => (
//             <motion.div key={index} variants={itemVariants} className="relative">
//               <Card className="h-full border border-primary/20 bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
//                 <CardContent className="pt-6">
//                   <div className="mb-4 rounded-full bg-primary/10 p-4 w-fit">{step.icon}</div>
//                   <h3 className="text-xl font-bold mb-2">{step.title}</h3>
//                   <p className="text-muted-foreground">{step.description}</p>
//                 </CardContent>
//               </Card>

//               {index < steps.length - 1 && (
//                 <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
//                   <motion.div
//                     initial={{ width: 0 }}
//                     animate={isInView ? { width: 40 } : { width: 0 }}
//                     transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
//                     className="h-0.5 bg-primary"
//                   />
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   )
// }


"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { FileEdit, Search, Award, Wallet } from "lucide-react"

const steps = [
  {
    icon: <FileEdit className="h-10 w-10 text-primary" />,
    title: "Create a Bounty",
    description: "List your issue with clear requirements and set a reward amount in cryptocurrency.",
  },
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: "Find Contributors",
    description: "Developers discover your bounty and submit solutions through pull requests.",
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Review & Accept",
    description: "Review submissions and accept the best solution that meets your requirements.",
  },
  {
    icon: <Wallet className="h-10 w-10 text-primary" />,
    title: "Automatic Payout",
    description: "Smart contracts automatically transfer the reward to the contributor's wallet.",
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="how-it-works" className="w-full py-20 px-4 relative overflow-hidden">
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            OpenReward simplifies the process of funding and contributing to open source projects through a transparent,
            decentralized workflow.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="relative">
              <Card className="h-full border border-primary/30 bg-black/40 backdrop-blur-xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all duration-300 shimmer">
                <CardContent className="pt-6">
                  <div className="mb-4 rounded-full bg-primary/10 p-4 w-fit">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 40 } : { width: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                    className="h-0.5 bg-primary"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
