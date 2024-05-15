import { defu } from 'defu'

export const useAPI = (api: string, options: object): Promise<unknown> => {
  return $fetch(api, defu(options, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('siteToken') || ''}`,
    },
  }))
}
