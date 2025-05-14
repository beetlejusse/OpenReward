"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { AuthHeader } from "@/components/AuthHeader"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "explore", label: "Explore", href: "#bounties" },
    { id: "dashboard", label: "Dashboard", href: "#" },
    { id: "about", label: "About", href: "#how-it-works" },
  ]

  return (
    <>
      <div className="fixed top-3 right-4 z-50">
        <AuthHeader />
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-3 left-0 right-0 z-40 bg-transparent transition-all duration-300 h-20`}
      >
        <div className="container mx-auto max-w-7xl h-full px-4  flex justify-center items-center ">
          <nav className="hidden md:flex items-center h-full">
            <div className="bg-black/40 backdrop-blur-md rounded-full p-2 border border-white/10 flex items-center">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveItem(item.id)}
                  className={`relative px-6 py-2 text-sm font-medium transition-colors rounded-full ${
                    activeItem === item.id ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {activeItem === item.id && (
                    <motion.span
                      layoutId="bubble"
                      className="absolute inset-0 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30"
                      style={{ borderRadius: 9999 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Hamburger menu for mobile */}
          <div className="flex items-center gap-3 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu (from top) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 bg-black/60 backdrop-blur-lg border-b border-white/10"
          >
            <div className="container mx-auto py-4 flex flex-col space-y-2 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`px-4 py-3 rounded-md transition-colors ${
                    activeItem === item.id
                      ? "bg-primary/20 text-white"
                      : "text-white/70 hover:bg-primary/10 hover:text-white"
                  }`}
                  onClick={() => {
                    setActiveItem(item.id)
                    setMobileMenuOpen(false)
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
