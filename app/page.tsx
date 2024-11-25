'use client'

import { Header } from '@/app/components/Header'
import { SearchBar } from '@/app/components/SearchBar'

export default function TextToSQLPage() {
  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    // Handle the search query here
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <section className="flex-1 flex flex-col items-center justify-start w-full px-4 sm:px-6 py-8 sm:py-12 gap-8 sm:gap-12 mt-16 sm:mt-20">
        <div className="w-full max-w-4xl space-y-4">
          <div className="flex justify-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border border-primary bg-primary text-white shadow-sm hover:bg-primary/90 transition-colors relative overflow-hidden">
              <span className="relative z-10">✨ AI Powered</span>
              <div className="absolute inset-0 shimmer" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-primary">
            Skyworks Text to SQL Converter
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-center opacity-90">
            Convert natural language queries into SQL statements for Skyworks database
          </p>
        </div>

        <div className="w-full max-w-3xl px-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="w-full max-w-4xl px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
            Example Queries
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-surface p-4 sm:p-6 rounded-lg shadow-md">
              <p className="font-medium mb-2">Natural Language:</p>
              <p className="text-text-light mb-4">"Show all products released in the last month"</p>
              <p className="font-medium mb-2">SQL:</p>
              <code className="block bg-background/50 p-3 rounded text-sm">
                {`SELECT product_name, release_date, category 
                FROM products 
                WHERE release_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH)
                ORDER BY release_date DESC;`}
              </code>
            </div>
            <div className="bg-surface p-4 sm:p-6 rounded-lg shadow-md">
              <p className="font-medium mb-2">Natural Language:</p>
              <p className="text-text-light mb-4">"Find top 5 selling products this year"</p>
              <p className="font-medium mb-2">SQL:</p>
              <code className="block bg-background/50 p-3 rounded text-sm">
                {`SELECT p.product_name, 
                       SUM(s.quantity) as total_sales 
                FROM products p
                JOIN sales s ON p.product_id = s.product_id 
                WHERE YEAR(s.sale_date) = YEAR(CURRENT_DATE) 
                GROUP BY p.product_name 
                ORDER BY total_sales DESC 
                LIMIT 5;`}
              </code>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
