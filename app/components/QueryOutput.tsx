'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { XCircle, Table as TableIcon } from 'lucide-react'
import type { QueryResult } from '@/app/lib/database'
import { useRef, useEffect } from 'react'

interface QueryOutputProps {
  results: QueryResult[]
  error: string
  onClose: () => void
}

export function QueryOutput({ results, error, onClose }: QueryOutputProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headerEl = headerRef.current;
    const bodyEl = bodyRef.current;

    if (headerEl && bodyEl) {
      const handleScroll = () => {
        headerEl.scrollLeft = bodyEl.scrollLeft;
      };

      bodyEl.addEventListener('scroll', handleScroll);
      return () => bodyEl.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (!error && !results.length) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="mt-6 overflow-hidden [box-shadow:0_8px_30px_rgba(0,0,0,0.12)]"
      >
        <div className="relative group [box-shadow:0_4px_24px_rgba(0,0,0,0.2)]">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-md group-hover:blur-lg transition-all" />
          <div className="relative bg-background rounded-lg border border-primary/20 shadow-[0_8px_28px_rgba(0,0,0,0.25)]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
              <div className="flex items-center gap-3">
                {error ? (
                  <XCircle className="w-5 h-5 text-destructive" />
                ) : (
                  <TableIcon className="w-5 h-5 text-primary" />
                )}
                <h3 className="font-semibold">
                  {error ? 'Error' : 'Query Results'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {error ? (
                <div className="text-destructive">{error}</div>
              ) : (
                <div className="max-h-[500px] overflow-auto border border-border/40 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <table className="w-full [box-shadow:0_2px_10px_rgba(0,0,0,0.2)]">
                    <thead>
                      <tr>
                        {results[0].columns.map((column, i) => (
                          <th 
                            key={i} 
                            className="sticky top-0 px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-white bg-primary"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {results[0].values.map((row, i) => (
                        <tr 
                          key={i}
                          className="border-t border-border hover:bg-muted/50 transition-colors"
                        >
                          {row.map((cell, j) => (
                            <td key={j} className="px-4 py-3 text-sm whitespace-nowrap">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 