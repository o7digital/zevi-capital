"use client"

import { Provider } from "react-redux"
import store from "@/redux/store"
import { TranslationProvider } from "@/contexts/TranslationContext"

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <TranslationProvider>{children}</TranslationProvider>
    </Provider>
  )
}
