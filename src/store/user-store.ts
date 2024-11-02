import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

/** ----------------------------------------------------------------------------------------------
 *  useUserStore
 * ----------------------------------------------------------------------------------------------- */

type UserState = {
  user: {
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
  } | null
  rehydrated: boolean
  loading: boolean
}

type UserActions = {
  setUser: (user: UserState["user"]) => void
  clearUser: () => void
  setUserState: (partialState: Partial<UserState>) => void
}

type UserStore = UserState & UserActions

export const useUserStore = create<UserStore>()(
  persist<UserStore>(
    (set) => ({
      user: null,
      rehydrated: false,
      loading: false,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setUserState: (partialState) => set(partialState),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state.setUserState({ rehydrated: true })
          }
        }
      },
    }
  )
)
