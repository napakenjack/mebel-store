import { create } from 'zustand'
import type { UserRole, UserSession } from '../types/auth'

type AuthState = {
  session: UserSession | null
  login: (role: UserRole) => void
  logout: () => void
}

const STORAGE_KEY = 'furniture-crm-auth'

const demoUsers: Record<UserRole, UserSession> = {
  client: { role: 'client', name: 'Айгуль С.', label: 'Клиент' },
  manager: { role: 'manager', name: 'Алия', label: 'Менеджер' },
  admin: { role: 'admin', name: 'Администратор', label: 'Администратор' },
}

const readSession = (): UserSession | null => {
  if (typeof localStorage === 'undefined') {
    return null
  }

  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? (JSON.parse(raw) as UserSession) : null
}

export const useAuthStore = create<AuthState>((set) => ({
  session: readSession(),
  login: (role) => {
    const session = demoUsers[role]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    set({ session })
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ session: null })
  },
}))
