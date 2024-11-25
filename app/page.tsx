'use client'

import React, { useState } from 'react'
import { Search, TrendingUp, History, Table as TableIcon, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchBar } from '@/app/components/SearchBar'
import { Header } from '@/app/components/Header'
import type { QueryResult } from '@/app/lib/database'
import { QueryOutput } from '@/app/components/QueryOutput'

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
  const [results, setResults] = useState<QueryResult[]>([])
  const [error, setError] = useState<string>('')

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

  const hasOutput = results.length > 0 || error !== ''

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Header />
      </div>
      
      <motion.div className="flex-1 bg-background text-foreground relative overflow-hidden pt-[64px]">
        <section className={`container mx-auto px-4 ${
          hasOutput ? 'pt-12' : 'py-8 md:py-32'
        }`}>
          <motion.div 
            variants={itemVariants}
            className={`text-center ${
              hasOutput ? 'mb-6' : 'mb-6 md:mb-16'
            }`}
          >
            <AnimatePresence>
              {!hasOutput && (
                <>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="shimmer inline-block px-4 py-1 mb-4 text-sm md:text-base font-medium tracking-wider border-[3px] border-primary/20 rounded-full bg-primary/5 shadow-glow"
                  >
                    ✨ AI Powered
                  </motion.span>
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-3xl md:text-6xl font-bold mb-2 md:mb-4 tracking-tight"
                  >
                    DAS_Ops
                    <span className="block mt-1 md:mt-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      SQL Assistant
                    </span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    variants={itemVariants}
                    className="text-base md:text-xl text-muted-foreground mb-6 md:mb-12"
                  >
                    {currentTagline}
                  </motion.p>
                </>
              )}
            </AnimatePresence>

            <motion.div 
              variants={itemVariants}
              className="max-w-3xl mx-auto relative glow-effect-search rounded-full z-10"
            >
              <SearchBar 
                placeholder="Enter your query in plain English..." 
                onResults={setResults}
                onError={setError}
              />
            </motion.div>

            <QueryOutput 
              results={results}
              error={error}
              onClose={() => {
                setError('')
                setResults([])
              }}
            />
          </motion.div>

          <AnimatePresence>
            {!hasOutput && (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="max-w-4xl mx-auto mt-8 md:mt-20"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                  {/* Frequently Searched */}
                  <motion.div variants={itemVariants}>
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
                  <motion.div variants={itemVariants}>
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
            )}
          </AnimatePresence>
        </section>
      </motion.div>
    </div>
  )
}
