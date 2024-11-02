import apiClient from "@/lib/api-client"

export interface LoginCredentials {
  identifier: string
  password: string
}

export interface SuccessResponse {
  token: string
  username: string
}

export interface ErrorResponse {
  message: string
}

export interface User {
  id_user: number
  is_host: boolean
  is_validator: boolean
  is_admin: boolean
  username: string
  email: string
  created_at: string
  updated_at: string
  status: string
  reactivated_at: string | null
  last_password_change: string
  profile_picture: string
  phone_number: string
  address: string
  last_login: string | null
  main_company: string
  first_name: string | null
  gender: string | null
  last_name: string | null
  companies_users: Array<{
    id_companie_user: number
    id_company: number
    id_user: number
    puesto: string | null
    departamento: string | null
    code_used: string | null
    salary: string | null
    assigned_at: string
    status: boolean
    exit_date: string | null
    reintegrated_at: string | null
    reintegration_count: number
    notes: string | null
    companies: {
      id_company: number
      company_name: string
      legal_name: string
      company_type: string
      tax_id: string
      email: string
      phone_number: string
      address: string
      website: string
      logo_url: string
      status: boolean
      created_at: string
      updated_at: string
    }
  }>
}

export type LoginResponse = SuccessResponse | ErrorResponse

/**
 * Logs in a user with the provided credentials.
 *
 * @param credentials - The login credentials of the user.
 * @returns A promise that resolves to the login response or an error response.
 */
export const executeLogin = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>(
      "/users/login",
      credentials
    )
    return response.data
  } catch (error) {
    if (error) {
      return error as ErrorResponse
    } else {
      return { message: "An error occurred while logging in." }
    }
  }
}

export const executeInfoUser = async (
  token: string
): Promise<User | ErrorResponse> => {
  try {
    const response = await apiClient.get<User>("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.user
  } catch (error) {
    if (error) {
      return error as ErrorResponse
    } else {
      return { message: "An error occurred while retrieving user information." }
    }
  }
}
