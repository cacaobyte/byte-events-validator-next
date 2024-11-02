import React from "react"
import { Calendar, Clock, MapPin, Navigation } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface EventInfo {
  id_event: number
  status_event: string
  is_public: boolean
  is_free: boolean
  start_time: string
  end_time: string
  event_name: string
  event_description: string
  img_url: { principal: string }[]
  location: { address: string; position: string }[]
}

const getWazeUrl = (lat: number, lng: number) => {
  return `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes`
}

export function EventInfoCard({ event }: { event: EventInfo }) {
  const [lat, lng] = event.location[0]?.position.split(", ").map(Number) || [
    0, 0,
  ]
  const wazeUrl = getWazeUrl(lat, lng)

  return (
    <>
      {event.img_url[0]?.principal && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={event.img_url[0].principal}
            alt={event.event_name}
            className="size-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{event.event_name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{event.event_description}</p>
        <div className="grid grid-cols-2 gap-2">
          <InfoItem icon={<Calendar className="size-4" />} label="Fecha">
            {new Date(event.start_time).toLocaleDateString()}
          </InfoItem>
          <InfoItem icon={<Clock className="size-4" />} label="Hora">
            {new Date(event.start_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </InfoItem>
          <InfoItem icon={<MapPin className="size-4" />} label="Lugar">
            {event.location[0]?.address}
          </InfoItem>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={event.status_event === "ACTIVE" ? "success" : "secondary"}
          >
            {event.status_event}
          </Badge>
          <Badge variant={event.is_public ? "default" : "outline"}>
            {event.is_public ? "Público" : "Privado"}
          </Badge>
          <Badge variant={event.is_free ? "secondary" : "default"}>
            {event.is_free ? "Gratuito" : "De pago"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <a href={wazeUrl} target="_blank" rel="noopener noreferrer">
            <Navigation className="mr-2 size-4" />
            Abrir en Waze
          </a>
        </Button>
      </CardFooter>
    </>
  )
}

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <div className="space-y-0.5">
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="text-sm font-medium">{children}</p>
      </div>
    </div>
  )
}
