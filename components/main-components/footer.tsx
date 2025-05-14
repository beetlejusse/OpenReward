"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, DiscIcon as Discord, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-background via-primary/5 to-background/0" />
        <div className="" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="flex md:flex-1 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                OpenReward
              </span>
            </Link>

            <p className="text-muted-foreground">
              Revolutionizing open source collaboration through decentralized
              bounties and rewards.
            </p>

            <div className="flex space-x-4">
            <Link
                href="https://github.com/SOGeKING-NUL/OpenReward.git"
                target="_blank"
                className="flex items-center gap-2 bg-black/60 hover:bg-black/80 text-white px-4 py-2 rounded-full border border-white/20 transition-all duration-300 shadow-lg"
              >
                <Github className="h-4 w-4" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-star"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>Star on Github</span>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold">Subscribe</h3>
            <p className="text-muted-foreground">
              Stay updated with the latest bounties and platform news.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background/50 rounded-full border-primary/20"
              />
              <Button
                size="icon"
                className="rounded-full bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} OpenReward. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-muted-foreground">
            Made with ❤️ by team
            <a className="ml-1 font-bold" href="https://github.com/SOGeKING-NUL/OpenReward.git">
              {" "}OpenReward
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
