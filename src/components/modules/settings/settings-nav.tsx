import { cn } from "@/lib/utils"
import { useLocation,Link} from "react-router-dom"

const settingsLinks = [
  // { href: "/settings", label: "General" },
  { href: "/settings/taxes", label: "Taxes" },
]

export function SettingsNav() {
  const {pathname} = useLocation()
  
  return (
    <nav className="space-y-1">
      {settingsLinks.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className={cn(
            "flex items-center px-3 py-2 text-sm font-medium rounded-md",
            pathname === link.href 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

