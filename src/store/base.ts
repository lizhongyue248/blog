import { Options } from 'sal.js'
import { atom, DefaultValue, AtomEffect } from 'recoil'
import { isBrowser } from '../util/constant'
import { ImgPreview } from '../interface/site'

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

export const salState = atom<Options>({
  key: 'sal',
  default: {
    root: null,
    threshold: 0.00000000000000000001,
    once: true,
    disabled: true
  }
})

export const imgPreviewState = atom<ImgPreview>({
  key: 'img-preview',
  default: {
    open: false,
    src: '',
    alt: ''
  }
})
