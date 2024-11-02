"use client"

import { useEffect, useState } from "react"
import {
  fetchActiveEvent,
  fetchFutureEvents,
  fetchPastEvents,
} from "@/services/events-service"
import { useTokenStore } from "@/store/token-store"
import {
  Calendar,
  CalendarCheck,
  CalendarClock,
  CalendarX,
  Clock,
  MapPin,
  Navigation,
  Search,
  Share2,
  Users,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export default function EventsScreen() {
  const [activeEvents, setActiveEvents] = useState<EventInfo[]>([])
  const [futureEvents, setFutureEvents] = useState<EventInfo[]>([])
  const [pastEvents, setPastEvents] = useState<EventInfo[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("today")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { token } = useTokenStore()

  useEffect(() => {
    const fetchEvents = async () => {
      if (token) {
        setIsLoading(true)
        setError(null)
        try {
          const [active, future, past] = await Promise.all([
            fetchActiveEvent(token),
            fetchFutureEvents(token),
            fetchPastEvents(token),
          ])
          setActiveEvents(Array.isArray(active) ? active : [])
          setFutureEvents(Array.isArray(future) ? future : [])
          setPastEvents(Array.isArray(past) ? past : [])
        } catch (err) {
          setError(
            "Error al cargar los eventos. Por favor, intente de nuevo más tarde."
          )
          console.error("Error fetching events:", err)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchEvents()
  }, [token])

  const filterEvents = (events: EventInfo[]) => {
    if (!Array.isArray(events)) return []
    return events.filter(
      (event) =>
        event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.event_description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const renderEvents = (events: EventInfo[]) => {
    const filteredEvents = filterEvents(events)
    if (filteredEvents.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted mb-4 rounded-full p-6">
            {activeTab === "today" && (
              <CalendarCheck className="text-muted-foreground size-12" />
            )}
            {activeTab === "future" && (
              <CalendarClock className="text-muted-foreground size-12" />
            )}
            {activeTab === "past" && (
              <CalendarX className="text-muted-foreground size-12" />
            )}
          </div>
          <h3 className="mb-2 text-xl font-semibold">
            No se encontraron eventos
          </h3>
          <p className="text-muted-foreground max-w-sm">
            No hay eventos que coincidan con tu búsqueda en este momento.
          </p>
        </div>
      )
    }
    return filteredEvents.map((event) => {
      const [lat, lng] = event.location[0]?.position
        .split(", ")
        .map(Number) || [0, 0]
      const wazeUrl = getWazeUrl(lat, lng)

      return (
        <Card key={event.id_event} className="group mb-6 overflow-hidden">
          {event.img_url[0]?.principal && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.img_url[0].principal}
                alt={event.event_name}
                className="size-full object-cover transition-transform group-hover:scale-105"
              />
              {event.is_free && (
                <Badge className="bg-primary absolute right-4 top-4">
                  Gratis
                </Badge>
              )}
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-2xl">{event.event_name}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="size-4" />
              {new Date(event.start_time).toLocaleDateString()}
              <Clock className="ml-2 size-4" />
              {new Date(event.start_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {event.event_description}
            </p>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <MapPin className="size-4" />
              <span>{event.location[0]?.address}</span>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 flex justify-between border-t p-4">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Users className="size-4" />
              <span>Evento {event.is_public ? "público" : "privado"}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" asChild>
                <a href={wazeUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="mr-2 size-4" />
                  Waze
                </a>
              </Button>
            </div>
          </CardFooter>
        </Card>
      )
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto space-y-6 p-4">
        {[1, 2].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-4 h-20 w-full" />
              <Skeleton className="h-4 w-1/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="relative mb-6">
        <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
        <Input
          type="search"
          placeholder="Buscar eventos..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today" className="space-x-2">
            <CalendarCheck className="size-4" />
            <span>Hoy</span>
          </TabsTrigger>
          <TabsTrigger value="future" className="space-x-2">
            <CalendarClock className="size-4" />
            <span>Futuros</span>
          </TabsTrigger>
          <TabsTrigger value="past" className="space-x-2">
            <CalendarX className="size-4" />
            <span>Pasados</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="today">{renderEvents(activeEvents)}</TabsContent>
        <TabsContent value="future">{renderEvents(futureEvents)}</TabsContent>
        <TabsContent value="past">{renderEvents(pastEvents)}</TabsContent>
      </Tabs>
    </div>
  )
}
