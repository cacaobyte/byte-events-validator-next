import * as React from "react"

import apiClient from "@/lib/api-client"

interface UseFetchResponse<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

const useFetch = <T>(endpoint: string): UseFetchResponse<T> => {
  const [data, setData] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get<T>(endpoint)
        setData(response.data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint])

  return { data, loading, error }
}

export default useFetch
