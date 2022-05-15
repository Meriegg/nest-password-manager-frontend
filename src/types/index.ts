export interface AuthFormData {
  email: string
  password: string
}

export interface User {
  email: string
  id: string
  password: string
  passwords: Array<Password>
}

export interface Password {
  content: string
  platform?: string
  platformUsername?: string
  ownerId: string
  owner: User
}
