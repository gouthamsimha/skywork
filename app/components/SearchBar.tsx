'use client'

import { useState } from 'react'
import { Search, Loader2, Command } from 'lucide-react'
import { executeQuery, QueryResult } from '@/app/lib/database'

interface SearchBarProps {
  placeholder: string;
  onResults: (results: QueryResult[]) => void;
  onError: (error: string) => void;
}

export function SearchBar({ placeholder, onResults, onError }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const queryResults = await executeQuery(query)
      onResults(queryResults)
    } catch (err) {
      onError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.shiftKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-md group-hover:blur-lg transition-all" />
        <div className="relative bg-background rounded-lg border border-primary/20 shadow-lg">
          <div className="flex items-center px-4 py-2 gap-3">
            <Command className="w-5 h-5 text-muted-foreground" />
            <textarea
              className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-lg placeholder:text-muted-foreground resize-none h-[56px] py-4"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Execute
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

