'use client'

import { useState } from 'react'
import { executeQuery, QueryResult } from '@/app/lib/database'

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<QueryResult[]>([])
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      const queryResults = await executeQuery(query)
      setResults(queryResults)
      onSearch(query)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit} className="w-full">
        <textarea
          className="w-full p-4 h-32 text-lg border rounded-lg"
          placeholder="Enter your SQL query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          type="submit" 
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Execute Query
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                {results[0].columns.map((column, i) => (
                  <th key={i} className="border border-gray-200 p-2 bg-gray-50">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results[0].values.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-200 p-2">
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
  )
}

