import { atom, DefaultValue, AtomEffect } from 'recoil'
import { isBrowser } from '../util/constant'

const darkStore = isBrowser() ? window.localStorage.getItem('dark') : false

const localStorageEffect: <T>(key: string) => AtomEffect<T> = (
  key: string
) => ({ setSelf, onSet }) => {
  const savedValue = isBrowser() ? window.localStorage.getItem(key) : 'false'
  savedValue != null && setSelf(JSON.parse(savedValue))

  onSet((newValue) => {
    if (newValue instanceof DefaultValue) {
      isBrowser() && window.localStorage.removeItem(key)
    } else {
      isBrowser() && window.localStorage.setItem(key, JSON.stringify(newValue))
    }
  })
}

export const darkState = atom<boolean>({
  key: 'dark',
  default: darkStore === null
    ? isBrowser()
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false
    : Boolean(darkStore),
  effects_UNSTABLE: [
    localStorageEffect<boolean>('dark')
  ]
})

export const searchState = atom<boolean>({
  key: 'search',
  default: false
})
