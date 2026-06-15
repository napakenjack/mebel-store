export type UserRole = 'client' | 'manager' | 'admin'

export type UserSession = {
  role: UserRole
  name: string
  label: string
}
