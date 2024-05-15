import { defu } from 'defu'

export const useAPI = (api: string, options: object = {}) => {
  return $fetch(api, defu(options, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('siteToken') || ''}`,
    },
    server: false,
    transform: (value: { data: unknown }) => {
      return value?.data
    },
  }))
}
