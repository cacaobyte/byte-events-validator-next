import React from "react"
import { useRouter } from "next/navigation"
import { CalendarCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function FutureEventsList() {
  const router = useRouter()

  const handleRedirect = () => {
    router.push("/my-events")
  }

  return (
    <div className="mt-4 space-y-4">
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <CalendarCheck className="text-primary mb-4 size-12" />
          <p className="text-muted-foreground mb-4 text-center">
            Para ver tus próximos eventos, visita la página de &quot;Mis
            Eventos&quot;.
          </p>
          <Button onClick={handleRedirect} className="w-full sm:w-auto">
            Ver Mis Eventos
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
