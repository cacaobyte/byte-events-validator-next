import React from "react"
import { UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type TicketInfo = {
  id: string
  owner: {
    name: string
    email: string
  }
  status: string
  validationCount: number
  purchaseDate: string
}

export function TicketInfoCard({
  ticket,
  onValidate,
}: {
  ticket: TicketInfo
  onValidate: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <UserIcon className="mr-2 size-4 shrink-0" />

        <Tooltip>
          <TooltipTrigger asChild>
            <h3 className="truncate font-semibold">{ticket.owner.name}</h3>
          </TooltipTrigger>
          <TooltipContent>
            <p>{ticket.owner.name}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="truncate text-sm text-gray-500">{ticket.owner.email}</p>
        </TooltipTrigger>
        <TooltipContent>
          <p>{ticket.owner.email}</p>
        </TooltipContent>
      </Tooltip>
      <p className="text-sm">
        Estado:{" "}
        <span
          className={`font-semibold ${ticket.status === "válido" || ticket.status === "no validado" ? "text-green-600" : "text-red-600"}`}
        >
          {ticket.status}
        </span>
      </p>
      <p className="text-sm">Validaciones previas: {ticket.validationCount}</p>
      <p className="text-sm">Fecha de compra: {ticket.purchaseDate}</p>
      {ticket.status === "no validado" && (
        <Button onClick={onValidate} className="w-full">
          Validar Boleto
        </Button>
      )}
    </div>
  )
}
