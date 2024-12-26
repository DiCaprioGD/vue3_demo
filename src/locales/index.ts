import { useLocalStorage, usePreferredLanguages } from '@vueuse/core'
import { computed } from 'vue'
import { createI18n } from 'vue-i18n'
import type { Composer } from 'vue-i18n'

const langModules: Recordable = import.meta.glob('./lang/*/index.ts', { eager: true })

const langModuleMap = new Map<string, Object>()

export const langCode: Array<string> = []

export const localeConfigKey = 'locale-config'

const languages = usePreferredLanguages()

const generateLangModuleMap = () => {
  const fullPaths = Object.keys(langModules)
  fullPaths.forEach((fullPath) => {
    const k = fullPath.replace('./lang', '')
    const startIndex = 1
    const lastIndex = k.lastIndexOf('/')
    const code = k.substring(startIndex, lastIndex)
    langCode.push(code)
    langModuleMap.set(code, langModules[fullPath])
  })
}

const importMessages = computed(() => {
  generateLangModuleMap()

  const message: Recordable = {}
  langModuleMap.forEach((value: any, key) => {
    message[key] = value.default
  })
  return message
})

export const i18n = createI18n({
  legacy: false,
  locale: useLocalStorage(localeConfigKey, 'zh_CN').value || languages.value[0] || 'zh_CN',
  fallbackLocale: 'zh_CN',
  messages: importMessages.value,
  globalInjection: true
})

export const langList = computed(() => {
  if (langModuleMap.size === 0) generateLangModuleMap()

  const list: any[] = []
  langModuleMap.forEach((value: any, key) => {
    list.push({
      content: value.default.lang,
      value: key
    })
  })

  return list
})

export const { t } = i18n.global as Composer

export default i18n
