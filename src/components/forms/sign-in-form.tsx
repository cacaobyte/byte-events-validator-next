"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { executeLogin } from "@/services/user-service"
import { useTokenStore } from "@/store/token-store"
import { zodResolver } from "@hookform/resolvers/zod"
// import { SHA256 } from "crypto-js"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useI18n } from "@/hooks/use-i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

import { useToast } from "../ui/use-toast"

export function SignInForm() {
  const router = useRouter()
  const addToken = useTokenStore((state) => state.addToken)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const i18n = useI18n()

  const defaultValues = {
    identifier: "",
    password: "",
  }

  const formSchema = z.object({
    identifier: z
      .string()
      .min(1, { message: i18n.t("sign-in.identifierRequired") })
      .refine((val) => val.includes("@") || /^[a-zA-Z0-9_]+$/.test(val), {
        message: i18n.t("sign-in.identifierInvalid"),
      }),
    password: z
      .string()
      .min(6, { message: i18n.t("sign-in.passwordMinLength") }),
  })

  type UserFormValue = z.infer<typeof formSchema>

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true)
    try {
      // const hashedPassword = SHA256(data.password).toString()
      const loginData = {
        identifier: data.identifier,
        password: data.password,
        // password: hashedPassword,
      }

      const response = await executeLogin(loginData)

      if ("token" in response) {
        addToken(response.token)
        toast({
          description: "Inicio de sesión exitoso",
          variant: "success",
        })
        router.push("/")
      } else {
        toast({
          description: response.message,
          variant: "error",
        })
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error)
      toast({
        description:
          "Ocurrió un error inesperado. Por favor, intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="space-y-4 p-4 sm:w-[450px]">
      <CardHeader className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto size-6" />
        <h1 className="text-2xl font-semibold tracking-tight">
          {i18n.t("sign-in.title")}
        </h1>
        <p className="text-muted-foreground text-sm">
          {i18n.t("sign-in.description")}
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{i18n.t("sign-in.identifierLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={i18n.t("sign-in.identifierPlaceholder")}
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{i18n.t("sign-in.passwordLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={i18n.t("sign-in.passwordPlaceholder")}
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} className="ml-auto w-full" type="submit">
              {loading ? "Cargando..." : i18n.t("sign-in.submitButton")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
