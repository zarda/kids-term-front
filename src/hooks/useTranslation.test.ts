import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTranslation } from './useTranslation'
import { useLanguagePackStore } from '../store/useLanguagePackStore'

describe('useTranslation', () => {
  beforeEach(() => {
    // Reset store state before each test
    useLanguagePackStore.setState({
      availablePacks: [
        {
          id: 'tc-en',
          sourceLanguage: 'tc',
          targetLanguage: 'en',
          name: 'English',
          nativeName: 'English',
          flag: '🇺🇸',
          wordCount: 40,
          isDownloaded: true,
          version: '1.0.0',
        },
        {
          id: 'en-es',
          sourceLanguage: 'en',
          targetLanguage: 'es',
          name: 'Spanish',
          nativeName: 'Español',
          flag: '🇪🇸',
          wordCount: 35,
          isDownloaded: true,
          version: '1.0.0',
        },
      ],
      downloadedData: {},
      activePackId: 'tc-en',
      downloadingPackId: null,
      isRefreshing: false,
      error: null,
    })
  })

  it('should return translations object and locale', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t).toBeDefined()
    expect(result.current.locale).toBeDefined()
  })

  it('should return Traditional Chinese (tc) locale when active pack source is tc', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.locale).toBe('tc')
  })

  it('should return English (en) locale when active pack source is en', () => {
    useLanguagePackStore.setState({ activePackId: 'en-es' })

    const { result } = renderHook(() => useTranslation())

    expect(result.current.locale).toBe('en')
  })

  it('should have common translations', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t.common).toBeDefined()
    expect(result.current.t.common.done).toBeDefined()
    expect(result.current.t.common.cancel).toBeDefined()
  })

  it('should have nav translations', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t.nav).toBeDefined()
    expect(result.current.t.nav.home).toBeDefined()
    expect(result.current.t.nav.practice).toBeDefined()
    expect(result.current.t.nav.progress).toBeDefined()
    expect(result.current.t.nav.settings).toBeDefined()
  })

  it('should have home translations', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t.home).toBeDefined()
    expect(result.current.t.home.welcome).toBeDefined()
    expect(result.current.t.home.dailyGoal).toBeDefined()
  })

  it('should have settings translations', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t.settings).toBeDefined()
    expect(result.current.t.settings.title).toBeDefined()
    expect(result.current.t.settings.dangerZone).toBeDefined()
  })

  it('should have practice translations', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t.practice).toBeDefined()
    expect(result.current.t.practice.title).toBeDefined()
  })

  it('should have learn translations', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t.learn).toBeDefined()
    expect(result.current.t.learn.tapToFlip).toBeDefined()
  })

  it('should have progress translations', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t.progress).toBeDefined()
    expect(result.current.t.progress.achievements).toBeDefined()
  })

  it('should default to English when pack not found', () => {
    useLanguagePackStore.setState({ activePackId: 'non-existent' })

    const { result } = renderHook(() => useTranslation())

    expect(result.current.locale).toBe('en')
  })

  it('should update translations when active pack changes', () => {
    const { result, rerender } = renderHook(() => useTranslation())

    expect(result.current.locale).toBe('tc')

    // Change active pack to English source
    act(() => {
      useLanguagePackStore.setState({ activePackId: 'en-es' })
    })
    rerender()

    expect(result.current.locale).toBe('en')
  })
})
