import { defu } from 'defu'

export const useAPI = (api: string, options: object = {}) => {
  return useFetch(api, defu(options, {
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    server: false,
    transform: (value: { data: unknown }) => {
      return value?.data
    },
  }))
}
