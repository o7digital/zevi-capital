"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Locale = 'en' | 'fr' | 'es'

interface TranslationContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es')
  const [messages, setMessages] = useState<any>({})

  const isValidLocale = (value: string): value is Locale => {
    return value === 'en' || value === 'fr' || value === 'es'
  }

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale && isValidLocale(savedLocale)) {
      setLocaleState(savedLocale)
    } else {
      // Par défaut en espagnol si aucune langue sauvegardée
      setLocaleState('es')
      localStorage.setItem('locale', 'es')
    }
  }, [])

  useEffect(() => {
    // Load translation file
    import(`@/locales/${locale}.json`).then((module) => {
      setMessages(module.default)
    })
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value = messages
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider')
  }
  return context
}
