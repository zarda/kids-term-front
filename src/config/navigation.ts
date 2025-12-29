import { FiHome, FiBook, FiBarChart2, FiSettings, FiPlay } from 'react-icons/fi'
import type { IconType } from 'react-icons'

export interface NavItem {
  path: string
  labelKey: 'home' | 'games' | 'practice' | 'progress' | 'settings'
  icon: IconType
}

export const navItems: NavItem[] = [
  { path: '/', labelKey: 'home', icon: FiHome },
  { path: '/games', labelKey: 'games', icon: FiPlay },
  { path: '/practice', labelKey: 'practice', icon: FiBook },
  { path: '/progress', labelKey: 'progress', icon: FiBarChart2 },
  { path: '/settings', labelKey: 'settings', icon: FiSettings },
]
