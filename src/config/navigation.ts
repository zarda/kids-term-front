import { FiHome, FiBook, FiBarChart2, FiSettings } from 'react-icons/fi'
import type { IconType } from 'react-icons'

export interface NavItem {
  path: string
  labelKey: 'home' | 'practice' | 'progress' | 'settings'
  icon: IconType
}

export const navItems: NavItem[] = [
  { path: '/', labelKey: 'home', icon: FiHome },
  { path: '/practice', labelKey: 'practice', icon: FiBook },
  { path: '/progress', labelKey: 'progress', icon: FiBarChart2 },
  { path: '/settings', labelKey: 'settings', icon: FiSettings },
]
