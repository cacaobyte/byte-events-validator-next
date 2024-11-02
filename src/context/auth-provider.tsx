"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  executeInfoUser,
  executeLogin,
  LoginCredentials,
  User,
} from "@/services/user-service"
import { useTokenStore } from "@/store/token-store"
import { useUserStore } from "@/store/user-store"

interface AuthContextType {
  user: any | null
  loading: boolean
  signIn: (credentials: LoginCredentials) => Promise<void>
  signOut: () => void
}

export const AuthContext = React.createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { token, rehydrated, addToken, setTokenState } = useTokenStore()
  const { user, setUser, clearUser } = useUserStore()
  const [loading, setLoading] = React.useState(true)
  const router = useRouter()
  const pathname = usePathname()

  React.useEffect(() => {
    if (!rehydrated) return // Espera a la hidratación

    // Redirigir a la raíz si el usuario ya está autenticado y está en "/sign-in"
    if (token && pathname === "/sign-in") {
      router.push("/")
      setLoading(false)
      return
    }

    // Redirigir a "sign-in" si no hay token
    if (!token) {
      if (pathname !== "/sign-in") {
        router.push("/sign-in")
      }
      setLoading(false)
      return
    }

    const fetchUser = async () => {
      try {
        const userResponse = await executeInfoUser(token)

        if (userResponse.id_user) {
          setUser(userResponse as unknown as User)
        }
      } catch (error) {
        console.error("User fetch failed", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [token, rehydrated, pathname])

  const signIn = async (credentials: LoginCredentials) => {
    setLoading(true)
    try {
      const loginResponse = await executeLogin(credentials)
      if ("token" in loginResponse) {
        addToken(loginResponse.token)
        setUser(loginResponse as unknown as User)
        router.push("/")
      } else {
        console.error("Login failed: ", loginResponse.message)
      }
    } catch (error) {
      console.error("Login failed", error)
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    clearUser()
    setTokenState({ token: null })
    router.push("/sign-in")
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}
