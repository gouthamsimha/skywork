import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full flex justify-center">
      <div className="flex h-14 items-center bg-primary 
        border border-primary/10 rounded-full px-6 mt-4 mx-4 shadow-sm">
        <div className="mr-4 flex lg:hidden">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-surface">Skyworks SQL</span>
          </a>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" className="text-surface hover:text-surface/80">Documentation</Button>
            <Button variant="ghost" className="text-surface hover:text-surface/80">Examples</Button>
            <Button variant="ghost" className="text-surface hover:text-surface/80">About</Button>
          </nav>
          
          <div className="lg:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
} 