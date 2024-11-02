"use client"

import { useEffect, useState } from "react"
import { fetchActiveEvent, fetchUsersTicket } from "@/services/events-service"
import { useTokenStore } from "@/store/token-store"
import { Scanner } from "@yudiel/react-qr-scanner"
import {
  AlertCircle,
  Camera,
  CameraOff,
  CheckCircle,
  Info,
  XCircle,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { EventInfoCard } from "./components/event-info-card"
import { FutureEventsList } from "./components/future-events-list"
import { InfoDisplay } from "./components/info-display"
import { TicketInfoCard } from "./components/ticket-info-card"

export type EventInfo = {
  id_event: number
  id_host: number
  status_event: string
  is_public: boolean
  is_free: boolean
  start_time: string
  end_time: string
  cancellation_limit_date: string
  cancellation_limit_time: number
  creation_date: string
  reservation_time: number
  event_name: string
  event_description: string
  img_url: { principal: string }[]
  location: { address: string; position: string }[]
}

type TicketInfo = {
  id_event_ticket: number
  status_event_ticket: string
  reserved_at: string
  event_ticket_categories: {
    name_category: string
    price_ticket: number
    events: EventInfo
  }
  participants: {
    users: {
      username: string
      email: string
      profile_picture: string
    }
  }
}

type ValidationResult = {
  success: boolean
  message: string
}

export default function MainPage() {
  const [scanResult, setScanResult] = useState<ValidationResult | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeEvent, setActiveEvent] = useState<EventInfo | null>(null)
  const [ticketInfo, setTicketInfo] = useState<TicketInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isTicketInfoOpen, setIsTicketInfoOpen] = useState(false)
  const [isEventInfoOpen, setIsEventInfoOpen] = useState(false)
  const { token } = useTokenStore()

  useEffect(() => {
    checkCameraPermission()
    loadEventData()
  }, [])

  const loadEventData = async () => {
    setIsLoading(true)
    try {
      const event = await fetchActiveEvent(token || "")
      setActiveEvent(event[0])
    } catch (err) {
      setError("No se pudo cargar la información del evento.")
    } finally {
      setIsLoading(false)
    }
  }

  const checkCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach((track) => track.stop())
      setHasPermission(true)
    } catch (err) {
      setHasPermission(false)
      setError(
        "No se pudo acceder a la cámara. Por favor, concede los permisos necesarios."
      )
    }
  }

  const handleScan = async (result: string) => {
    if (result) {
      try {
        const ticketData = await fetchUsersTicket(result)
        console.log("handleScan", ticketData)

        setTicketInfo(ticketData)
        setIsTicketInfoOpen(true)
        setIsScanning(false)
      } catch (err) {
        setError("Error al obtener la información del boleto")
        setIsScanning(false)
      }
    }
  }

  const handleValidate = () => {
    if (ticketInfo) {
      const validationResult = validateTicket(ticketInfo)
      setScanResult(validationResult)
      setTicketInfo({
        ...ticketInfo,
        status_event_ticket: validationResult.success
          ? "INACTIVE"
          : ticketInfo.status_event_ticket,
      })
    }
  }

  const validateTicket = (ticket: TicketInfo): ValidationResult => {
    if (ticket.status_event_ticket === "ACTIVE") {
      return { success: true, message: "Boleto validado exitosamente" }
    } else {
      return {
        success: false,
        message: `Boleto no válido. Estado: ${ticket.status_event_ticket}`,
      }
    }
  }

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      console.error(error)
      setError("Error al escanear el código QR: " + error.message)
    } else {
      console.error("Unknown error", error)
      setError("Error desconocido al escanear el código QR")
    }
    setIsScanning(false)
  }

  const toggleScanner = () => {
    if (isScanning) {
      setIsScanning(false)
    } else {
      setScanResult(null)
      setError(null)
      setTicketInfo(null)
      setIsScanning(true)
    }
  }

  if (isLoading) {
    return (
      <div className="flex size-full items-center justify-center">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader>
            <Skeleton className="mx-auto h-16 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-2 h-8 w-full" />
            <Skeleton className="mb-2 h-8 w-5/6" />
            <Skeleton className="h-8 w-4/6" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex size-full items-center justify-center p-4">
      <Card className="bg mx-auto w-full md:max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            {activeEvent ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="block truncate">
                      Validador: {activeEvent.event_name}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{activeEvent.event_name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              "Validador de Boletos"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasPermission === false && (
            <Alert variant="destructive" className="mb-4">
              <XCircle className="size-4" />
              <AlertTitle>Error de permisos</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {hasPermission && activeEvent && (
            <>
              <div className="mb-4 flex w-full flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEventInfoOpen(true)}
                  className="min-w-0 flex-1"
                >
                  <Info className="mr-2 size-4 shrink-0" />
                  <span className="truncate">Información del Evento</span>
                </Button>
              </div>

              <Button
                onClick={toggleScanner}
                className="mb-4 w-full"
                variant={isScanning ? "destructive" : "default"}
              >
                {isScanning ? (
                  <>
                    <CameraOff className="mr-2 size-4" /> Detener
                  </>
                ) : (
                  <>
                    <Camera className="mr-2 size-4" /> Escanear
                  </>
                )}
              </Button>
              {isScanning && (
                <div className="mb-4 aspect-square overflow-hidden rounded-lg">
                  <Scanner
                    onScan={(detectedCodes) => {
                      if (detectedCodes.length > 0) {
                        handleScan(detectedCodes[0].rawValue)
                      }
                    }}
                    onError={handleError}
                  />
                </div>
              )}
              {!isScanning && !ticketInfo && !error && (
                <Alert>
                  <AlertDescription>
                    Presiona &quot;Escanear&quot; para validar boletos de{" "}
                    {activeEvent.event_name}.
                  </AlertDescription>
                </Alert>
              )}
              <InfoDisplay
                isOpen={isEventInfoOpen}
                onOpenChange={setIsEventInfoOpen}
                title="Información del Evento"
                description="Detalles del evento actual"
              >
                <EventInfoCard event={activeEvent} />
              </InfoDisplay>
              <InfoDisplay
                isOpen={isTicketInfoOpen}
                onOpenChange={setIsTicketInfoOpen}
                title="Información del Boleto"
                description="Detalles del boleto escaneado y opción de validación"
              >
                {ticketInfo && (
                  <TicketInfoCard
                    ticket={ticketInfo}
                    onValidate={handleValidate}
                  />
                )}
                {scanResult && (
                  <Alert
                    variant={scanResult.success ? "default" : "destructive"}
                    className="mt-4"
                  >
                    {scanResult.success ? (
                      <CheckCircle className="size-4" />
                    ) : (
                      <XCircle className="size-4" />
                    )}
                    <AlertTitle>
                      {scanResult.success ? "Éxito" : "Error"}
                    </AlertTitle>
                    <AlertDescription>{scanResult.message}</AlertDescription>
                  </Alert>
                )}
              </InfoDisplay>
              {error && (
                <Alert variant="destructive">
                  <XCircle className="size-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </>
          )}

          {!activeEvent && !error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="size-4" />
              <AlertTitle>No hay eventos activos</AlertTitle>
              <AlertDescription>
                No hay eventos activos en este momento. Consulta la lista de
                próximos eventos.
              </AlertDescription>
            </Alert>
          )}

          {!activeEvent && <FutureEventsList />}
        </CardContent>
      </Card>
    </div>
  )
}
