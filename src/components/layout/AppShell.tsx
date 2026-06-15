import type { ReactNode } from 'react'
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

  return (
    <div className="app-shell">
      {variant === 'admin' ? <AdminSidebar /> : <ClientSidebar />}
      <main className="workspace">
        <Topbar title={title} />
        <div className="workspace-content">{children}</div>
      </main>
    </div>
  )
}
