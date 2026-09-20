import { Link, Outlet, useLocation } from 'react-router-dom'

const ROUTE_LABELS = {
  '/': '~/home',
  '/quiz': '~/quiz',
  '/resultado': '~/resultado',
  '/ranking': '~/ranking',
}

function Layout() {
  const location = useLocation()
  const routeLabel = ROUTE_LABELS[location.pathname] ?? location.pathname

  return (
    <div className="flex min-h-svh flex-col items-center bg-ink px-4 py-6 text-paper sm:py-10">
      <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-lg border border-line bg-panel shadow-2xl shadow-black/40">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-err/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-cursor/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-ok/70" />
          </div>
          <p className="truncate text-xs text-mute">
            <Link to="/" className="hover:text-paper">
              quiz-claude-code
            </Link>
            :{routeLabel}
            <span className="caret ml-0.5" aria-hidden="true" />
          </p>
          <nav className="ml-auto shrink-0">
            <Link to="/ranking" className="text-xs text-mute hover:text-cursor">
              ranking
            </Link>
          </nav>
        </div>

        <main className="flex-1 px-5 py-6">
          <Outlet />
        </main>
      </div>

      <p className="mt-4 text-xs text-mute">
        # quiz verdadeiro ou falso sobre claude code. projeto de portfólio.
      </p>
    </div>
  )
}

export default Layout
