import { FiHome, FiBook, FiBarChart2, FiSettings, FiPlay, FiEdit3 } from 'react-icons/fi'
import type { IconType } from 'react-icons'

export interface NavItem {
  path: string
  labelKey: 'home' | 'learn' | 'games' | 'practice' | 'progress' | 'settings'
  icon: IconType
}

export const navItems: NavItem[] = [
  { path: '/', labelKey: 'home', icon: FiHome },
  { path: '/learn', labelKey: 'learn', icon: FiBook },
  { path: '/games', labelKey: 'games', icon: FiPlay },
  { path: '/practice', labelKey: 'practice', icon: FiEdit3 },
  { path: '/progress', labelKey: 'progress', icon: FiBarChart2 },
  { path: '/settings', labelKey: 'settings', icon: FiSettings },
]
