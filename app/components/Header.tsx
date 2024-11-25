import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="w-full flex items-center justify-center">
      <div className="relative flex items-center glow-effect-header">
        <img 
          src="/img/Skyworks.png"
          alt="Skyworks Logo"
          className="h-[90px] w-auto absolute right-full mr-4"
        />
        <div className="flex h-14 items-center bg-primary 
          border border-primary/10 rounded-full px-6 mt-8 mx-4 shadow-sm">
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
      </div>
    </header>
  )
} 