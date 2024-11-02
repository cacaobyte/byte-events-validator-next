import React from "react"
import { CalendarIcon, TagIcon, TicketIcon, UserIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type TicketInfo = {
  id_event_ticket: number
  status_event_ticket: string
  reserved_at: string
  event_ticket_categories: {
    name_category: string
    price_ticket: number
  }
  participants?: {
    users?: {
      username?: string
      email?: string
      profile_picture?: string
    }
  }
}

export function TicketInfoCard({
  ticket,
  onValidate,
}: {
  ticket: TicketInfo
  onValidate: () => void
}) {
  const username = ticket.participants?.users?.username || "Usuario desconocido"
  const email = ticket.participants?.users?.email || "Email no disponible"

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <UserIcon className="mr-2 size-4 shrink-0" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="truncate font-semibold">{username}</h3>
            </TooltipTrigger>
            <TooltipContent>
              <p>{username}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="truncate text-sm text-gray-500">{email}</p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{email}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex items-center space-x-2">
        <TagIcon className="size-4" />
        <p className="text-sm">
          Estado:{" "}
          <Badge
            variant={
              ticket?.status_event_ticket === "ACTIVE"
                ? "success"
                : "destructive"
            }
          >
            {ticket.status_event_ticket}
          </Badge>
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <TicketIcon className="size-4" />
        <p className="text-sm">
          Categoría: {ticket?.event_ticket_categories?.name_category}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <CalendarIcon className="size-4" />
        <p className="text-sm">
          Fecha de reserva: {new Date(ticket.reserved_at).toLocaleString()}
        </p>
      </div>
      {ticket.status_event_ticket === "ACTIVE" && (
        <Button onClick={onValidate} className="w-full">
          Validar Boleto
        </Button>
      )}
    </div>
  )
}
