import {
  AlertCircleIcon,
  BanknoteIcon,
  CalendarIcon,
  ClipboardIcon,
  ClockIcon,
  ImageIcon,
  MapPinIcon,
  TagIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { EventInfo } from "../page"

export function EventInfoCard({ event }: { event: EventInfo }) {
  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{event.event_name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-muted-foreground text-sm">
          {event.event_description}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <InfoItem icon={<CalendarIcon className="size-4" />} label="Inicio">
            {new Date(event.start_time).toLocaleString()}
          </InfoItem>
          <InfoItem icon={<CalendarIcon className="size-4" />} label="Fin">
            {new Date(event.end_time).toLocaleString()}
          </InfoItem>
          <InfoItem icon={<MapPinIcon className="size-4" />} label="Lugar">
            {event.location[0]?.address}
          </InfoItem>
          <InfoItem icon={<TagIcon className="size-4" />} label="Estado">
            <Badge
              variant={
                event.status_event === "ACTIVE" ? "success" : "secondary"
              }
            >
              {event.status_event}
            </Badge>
          </InfoItem>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant={event.is_public ? "default" : "outline"}>
            {event.is_public ? "Público" : "Privado"}
          </Badge>
          <Badge variant={event.is_free ? "default" : "outline"}>
            {event.is_free ? "Gratuito" : "De pago"}
          </Badge>
          {event.img_url[0] && (
            <Badge variant="outline">
              <ImageIcon className="mr-1 size-3" />
              Imagen disponible
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InfoItem
            icon={<AlertCircleIcon className="size-4" />}
            label="Límite de cancelación"
          >
            {new Date(event.cancellation_limit_date).toLocaleString()}
          </InfoItem>
          <InfoItem
            icon={<ClockIcon className="size-4" />}
            label="Tiempo límite de cancelación"
          >
            {event.cancellation_limit_time} horas
          </InfoItem>
          <InfoItem
            icon={<ClockIcon className="size-4" />}
            label="Tiempo de reserva"
          >
            {event.reservation_time} minutos
          </InfoItem>
          <InfoItem
            icon={<ClipboardIcon className="size-4" />}
            label="Fecha de creación"
          >
            {new Date(event.creation_date).toLocaleString()}
          </InfoItem>
        </div>
      </CardContent>
    </Card>
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
