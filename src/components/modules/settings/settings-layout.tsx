import { SettingsNav } from "./settings-nav"
interface SettingsLayoutProps {
  children: React.ReactNode
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          <aside className="md:w-1/4">
            <SettingsNav />
          </aside>
          <main className="flex-1 space-y-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

