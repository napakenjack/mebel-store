import type { ReactNode } from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { AdminSidebar } from './AdminSidebar'
import { ClientSidebar } from './ClientSidebar'
import { Topbar } from './Topbar'

type AppShellProps = {
  children: ReactNode
  title: string
  variant: 'admin' | 'client'
}

export function AppShell({ children, title, variant }: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const session = useAuthStore((state) => state.session)

  if (!session) {
    return <Navigate replace to="/login" />
  }

  if (variant === 'client' && session.role !== 'client') {
    return <Navigate replace to="/admin" />
  }

  if (variant === 'admin' && session.role === 'client') {
    return <Navigate replace to="/client" />
  }

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <div className={drawerOpen ? 'app-shell drawer-open' : 'app-shell'}>
      <div className="drawer-scrim" onClick={closeDrawer} />
      {variant === 'admin' ? <AdminSidebar onNavigate={closeDrawer} /> : <ClientSidebar onNavigate={closeDrawer} />}
      <main className="workspace">
        <Topbar onMenuClick={() => setDrawerOpen(true)} title={title} />
        <div className="workspace-content">{children}</div>
      </main>
    </div>
  )
}
