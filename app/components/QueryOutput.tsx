'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { XCircle, Table as TableIcon, Download, ChevronUp, ChevronDown } from 'lucide-react'
import type { QueryResult } from '@/app/lib/database'
import { useRef, useEffect, useState, useMemo } from 'react'

interface QueryOutputProps {
  results: QueryResult[]
  error: string
  onClose: () => void
}

export function QueryOutput({ results, error, onClose }: QueryOutputProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [sortConfig, setSortConfig] = useState<{
    column: string;
    direction: 'asc' | 'desc' | null;
  }>({ column: '', direction: null });

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

  const handleDownloadCSV = () => {
    if (!results.length) return;
    
    const headers = results[0].columns;
    const rows = results[0].values;
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'query_results.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const sortedResults = useMemo(() => {
    if (!results.length || !sortConfig.direction) return results;

    const sorted = [...results[0].values];
    const columnIndex = results[0].columns.indexOf(sortConfig.column);

    return [{
      ...results[0],
      values: sorted.sort((a, b) => {
        if (a[columnIndex] === b[columnIndex]) return 0;
        
        // Handle numeric sorting
        if (!isNaN(a[columnIndex]) && !isNaN(b[columnIndex])) {
          return sortConfig.direction === 'asc' 
            ? Number(a[columnIndex]) - Number(b[columnIndex])
            : Number(b[columnIndex]) - Number(a[columnIndex]);
        }
        
        // String sorting
        return sortConfig.direction === 'asc'
          ? String(a[columnIndex]).localeCompare(String(b[columnIndex]))
          : String(b[columnIndex]).localeCompare(String(a[columnIndex]));
      })
    }];
  }, [results, sortConfig]);

  const handleSort = (column: string) => {
    setSortConfig(current => ({
      column,
      direction: 
        current.column === column && current.direction === 'asc'
          ? 'desc'
          : current.column === column && current.direction === 'desc'
          ? null
          : 'asc'
    }));
  };

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
                {!error && <TableIcon className="w-5 h-5 text-primary" />}
                <h3 className="font-semibold">
                  {error ? 'Error' : 'Query Results'}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {!error && (
                  <button
                    onClick={handleDownloadCSV}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    title="Download CSV"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {error ? (
                <div className="space-y-2">
                  <div className="text-destructive font-semibold text-lg">
                    SQL Syntax Error
                  </div>
                  <div className="text-muted-foreground text-sm">
                    We found an issue with your SQL query near <code className="px-1.5 py-0.5 bg-destructive/10 text-destructive rounded">{error.split("near")[1].split(":")[0].replace(/['"]/g, '').trim()}</code>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    This might be due to:
                    <ul className="list-disc ml-5 mt-1 space-y-1">
                      <li>A misspelled keyword or table name</li>
                      <li>Missing or extra punctuation</li>
                      <li>Incorrect SQL syntax structure</li>
                    </ul>
                  </div>
                  <div className="text-sm mt-4 p-3 bg-muted/50 rounded-md">
                    <span className="font-medium">Full error: </span>
                    {error}
                  </div>
                </div>
              ) : (
                <div className="max-h-[500px] overflow-auto border border-border/40 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <table className="w-full [box-shadow:0_2px_10px_rgba(0,0,0,0.2)]">
                    <thead>
                      <tr>
                        {results[0].columns.map((column, i) => (
                          <th 
                            key={i} 
                            className="sticky top-0 px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-white bg-primary group cursor-pointer"
                            onClick={() => handleSort(column)}
                          >
                            <div className="flex items-center gap-2">
                              {column}
                              <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronUp 
                                  className={`h-3 w-3 ${
                                    sortConfig.column === column && sortConfig.direction === 'asc'
                                      ? 'text-white opacity-100'
                                      : 'text-white/50'
                                  }`}
                                />
                                <ChevronDown 
                                  className={`h-3 w-3 -mt-1 ${
                                    sortConfig.column === column && sortConfig.direction === 'desc'
                                      ? 'text-white opacity-100'
                                      : 'text-white/50'
                                  }`}
                                />
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sortedResults[0].values.map((row, i) => (
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