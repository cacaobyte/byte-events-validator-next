"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTokenStore } from "@/store/token-store"
import { Loader } from "lucide-react"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const { token } = useTokenStore()

  useEffect(() => {
    try {
    } catch (error) {}
  }, [token])

  if (isLoading) {
    return (
      <div className="flex size-full items-center justify-center">
        <Loader className="text-muted-foreground size-20 animate-spin [animation-duration:1.5s]" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
