import { defu } from 'defu'
import { toast } from 'vue-sonner'

export function useAPI(api: string, options?: object): Promise<unknown> {
  return $fetch(api, defu(options || {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('SinkSiteToken') || ''}`,
    },
  })).catch((error) => {
    if (error?.data?.statusMessage) {
      toast(error?.data?.statusMessage)
    }
    return Promise.reject(error)
  })
}
