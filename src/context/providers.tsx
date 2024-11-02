import * as React from "react"
import { AuthProvider } from "@/context/auth-provider"
import { I18nProvider } from "@/context/i18n-provider"

import { ProtectedRoute } from "@/components/protected-route"

import { TooltipProvider } from "../components/ui/tooltip"
import { ThemeProvider } from "./theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <I18nProvider>
            <AuthProvider>
              <>{children}</>
            </AuthProvider>
          </I18nProvider>
        </TooltipProvider>
      </ThemeProvider>
    </>
  )
}
