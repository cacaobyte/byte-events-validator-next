import axios, { AxiosInstance } from "axios"

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://events.cacaobyte.com/api/v1",
  timeout: 10000,
})

// Manejar respuestas y errores de manera uniforme
apiClient.interceptors.response.use(
  (response) => {
    // Verificar que la respuesta tenga datos
    if (response.data) {
      return response.data // Retornar solo los datos
    } else {
      // console.error("Viewer: No hay datos en la respuesta:", response)
      return Promise.reject(new Error("Viewer: No hay datos en la respuesta"))
    }
  },
  (error) => {
    // Manejo de errores
    if (error.response) {
      //   console.error("Viewer: Error de respuesta:", error.response.data)
      //   console.error("Viewer: Estado:", error.response.status)
      //   console.error("Viewer: Encabezados:", error.response.headers)
      return Promise.reject(error.response.data)
    }
    return Promise.reject() // No pasar el error para evitar que la aplicación se bloquee
  }
)

export default apiClient
