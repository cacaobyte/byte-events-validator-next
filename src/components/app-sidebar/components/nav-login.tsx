"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { useI18n } from "@/hooks/use-i18n"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function NavLogin() {
  const i18n = useI18n()
  return (
    <Card className="shadow-none">
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm">{i18n.t("nav-login.title")}</CardTitle>
        <CardDescription>{i18n.t("nav-login.description")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2.5 p-3">
        <Link
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "h-8"
          )}
          href="/sign-in"
        >
          {i18n.t("nav-login.sign-in")}
        </Link>
      </CardContent>
    </Card>
  )
}
