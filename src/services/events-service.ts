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

export const fetchUsersTicket = async (token: string): Promise<any> => {
  try {
    const response = await apiClient.get("/manager/validators/usersTicket", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.usersTicket
  } catch (error) {
    if (error) {
      return error as ErrorResponse
    } else {
      return { message: "An error occurred while retrieving user information." }
    }
  }
}
