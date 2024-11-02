import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

/** ----------------------------------------------------------------------------------------------
 *  useTokenStore
 * ----------------------------------------------------------------------------------------------- */

type TokenState = {
  token: string | null
  rehydrated: boolean
}

type TokenActions = {
  addToken: (token: string) => void
  setTokenState: (partialState: Partial<TokenState>) => void
}

type TokenStore = TokenState & TokenActions

export const useTokenStore = create<TokenStore>()(
  persist<TokenStore>(
    (set) => ({
      token: null,
      rehydrated: false,
      addToken: (token) => set({ token }),
      setTokenState: (partialState) =>
        set((state) => ({ ...state, ...partialState })),
    }),
    {
      name: "token-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state.setTokenState({ rehydrated: true })
          }
        }
      },
    }
  )
)
