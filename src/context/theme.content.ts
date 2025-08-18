import { createContext } from 'react'

export type Theme = 'dark' | 'light'

export type ThemeProviderProps = {
	children: React.ReactNode
	defaultTheme?: Theme
	storageKey?: string
}

type ThemeProviderState = {
	theme: Theme
	setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
	theme: 'dark',
	setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)
export default ThemeProviderContext
