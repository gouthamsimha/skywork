interface QueryListProps {
  title: string
  queries: string[]
}

export default function QueryList({ title, queries }: QueryListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {queries.map((query, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
            {query}
          </li>
        ))}
      </ul>
    </div>
  )
}

