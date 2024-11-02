import apiClient from "@/lib/api-client"

interface ErrorResponse {
  message: string
}

// Eventos Hoy
export const fetchActiveEvent = async (token: string): Promise<any> => {
  try {
    const response = await apiClient.get("/manager/validators/todayEvents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.todayEvents
  } catch (error) {
    if (error) {
      return error as ErrorResponse
    } else {
      return { message: "An error occurred while retrieving user information." }
    }
  }
}

export const fetchFutureEvents = async (token: string): Promise<any> => {
  try {
    const response = await apiClient.get("/manager/validators/futureEvents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.futureEvents
  } catch (error) {
    if (error) {
      return error as ErrorResponse
    } else {
      return { message: "An error occurred while retrieving user information." }
    }
  }
}

export const fetchPastEvents = async (token: string): Promise<any> => {
  try {
    const response = await apiClient.get("/manager/validators/pastEvents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.pastEvents
  } catch (error) {
    if (error) {
      return error as ErrorResponse
    } else {
      return { message: "An error occurred while retrieving user information." }
    }
  }
}

export const fetchUsersTicket = async () // id_event_ticket: string
: Promise<any> => {
  try {
    const response = await apiClient.post("/manager/validators/usersTicket", {
      id_event_ticket: 2,
    })
    return response.reservationDetails
  } catch (error) {
    if (error) {
      return error as ErrorResponse
    } else {
      return { message: "An error occurred while retrieving user information." }
    }
  }
}
