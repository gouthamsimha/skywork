'use client'

import React, { useState } from 'react'
import { Search, TrendingUp, History } from 'lucide-react'
import { motion } from 'framer-motion'
import { SearchBar } from '@/app/components/SearchBar'
import { Header } from '@/app/components/Header'

// Add example queries arrays
const frequentQueries = [
  "Show all products from last month",
  "Top 5 selling products",
  "Products with low inventory",
  "Most popular categories"
]

const trendingQueries = [
  "Revenue this quarter",
  "Best performing products",
  "Sales by region",
  "Inventory alerts"
]

const taglines = [
  "Convert natural language to SQL with ease",
  "Your SQL assistant for DAS Operations",
  "Get instant SQL queries from plain English",
  "Simplify database operations with AI"
]

export default function TextToSQLPage() {
  const [currentTagline] = useState(() => taglines[Math.floor(Math.random() * taglines.length)])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const shineVariants = {
    initial: {
      backgroundPosition: "200% 0",
    },
    animate: {
      backgroundPosition: "-200% 0",
    },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Header />
      </div>
      
      <motion.div className="flex-1 bg-background text-foreground relative overflow-hidden pt-[64px]">
        <section className="container mx-auto px-4 py-8 md:py-32">
          <motion.div 
            variants={itemVariants}
            className="text-center mb-6 md:mb-16"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-block mb-2"
            >
              <span className="relative inline-flex items-center px-3 py-1 text-sm md:text-base rounded-full bg-primary/10 font-bold border-2 border-primary/30">
                <motion.span
                  className="ml-1"
                  style={{
                    background: `linear-gradient(
                      90deg,
                      hsl(var(--primary)) 0%,
                      hsl(var(--primary-foreground)) 20%,
                      hsl(var(--primary)) 30%,
                      hsl(var(--primary)) 40%,
                      hsl(var(--primary-foreground)) 50%,
                      hsl(var(--primary)) 60%,
                      hsl(var(--primary)) 100%
                    )`,
                    backgroundSize: "200% 100%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                  variants={shineVariants}
                  initial="initial"
                  animate="animate"
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  ✨ AI Powered
                </motion.span>
              </span>
            </motion.div>
            <h1 className="text-3xl md:text-6xl font-bold mb-2 md:mb-4 tracking-tight">
              DAS_Ops
              <span className="block mt-1 md:mt-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                SQL Assistant
              </span>
            </h1>
            <motion.p 
              variants={itemVariants}
              className="text-base md:text-xl text-muted-foreground mb-6 md:mb-12"
            >
              {currentTagline}
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="max-w-3xl mx-auto relative glow-effect-search rounded-full z-10"
            >
              <SearchBar placeholder="Enter your query in plain English..." />
            </motion.div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="max-w-4xl mx-auto mt-8 md:mt-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
              {/* Frequently Searched */}
              <motion.div 
                variants={itemVariants}
                className="space-y-4 md:space-y-6 bg-card/30 p-4 md:p-6 rounded-xl md:rounded-2xl"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <History className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  <h2 className="text-lg md:text-xl font-semibold">Frequently Searched</h2>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {frequentQueries.map((query, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="cursor-pointer text-sm text-muted-foreground hover:text-primary transition-colors">
                        {query}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Queries */}
              <motion.div 
                variants={itemVariants}
                className="space-y-4 md:space-y-6 bg-card/30 p-4 md:p-6 rounded-xl md:rounded-2xl"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  <h2 className="text-lg md:text-xl font-semibold">Recent Queries</h2>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {trendingQueries.map((query, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="cursor-pointer text-sm text-muted-foreground hover:text-primary transition-colors">
                        {query}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </motion.div>
    </div>
  )
}
