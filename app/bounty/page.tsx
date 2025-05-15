"use client";

import { Dashboard } from "@/components/authentication";
import { AuthHeader } from "@/components/AuthHeader";
import { Navbar } from "@/components/main-components/navbar";
import { motion } from "framer-motion";

const Page = async () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="noise" />
      </div>

      <Navbar />

      <div className="z-10 flex h-screen min-h-screen flex-col p-4">
        <div className="container mx-auto max-w-7xl flex flex-1 flex-col items-center justify-center gap-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full flex-1 rounded-lg p-8 shadow-md"
          >
            <Dashboard />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Page;
