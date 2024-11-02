import { Progress } from "@/components/ui/progress"

import { EventInfo } from "../page"

export function TicketStats({ event }: { event: EventInfo }) {
  return (
    <div className="space-y-2">
      <h3 className="mb-2 font-semibold">Estadísticas de Boletos</h3>
      <p className="text-sm">
        <span className="font-medium">Total de boletos:</span>{" "}
        {event?.totalTickets}
      </p>
      <p className="text-sm">
        <span className="font-medium">Boletos escaneados:</span>{" "}
        {event?.scannedTickets}
      </p>
      <p className="text-sm">
        <span className="font-medium">Boletos restantes:</span>{" "}
        {event?.totalTickets - event?.scannedTickets}
      </p>
      <div className="relative pt-1">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <span className="inline-block rounded-full bg-teal-200 px-2 py-1 text-xs font-semibold uppercase text-teal-600">
              Progreso
            </span>
          </div>
          <div className="text-right">
            <span className="inline-block text-xs font-semibold text-teal-600">
              {((event?.scannedTickets / event?.totalTickets) * 100).toFixed(1)}
              %
            </span>
          </div>
        </div>
        <Progress
          value={(event?.scannedTickets / event?.totalTickets) * 100}
          className="w-full"
        />
      </div>
    </div>
  )
}
