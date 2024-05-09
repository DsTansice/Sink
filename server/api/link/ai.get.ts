import { z } from 'zod'

export default eventHandler(async (event) => {
  const url = (await getValidatedQuery(event, z.object({
    url: z.string().url(),
  }).parse)).url
  const { cloudflare } = event.context
  const { AI } = cloudflare.env

  if (AI) {
    const { aiPrompt, aiModel } = useRuntimeConfig(event)
    const { slugRegex } = useAppConfig(event)
    const response = await AI.run(aiModel, {
      stream: false,
      prompt: aiPrompt.replace('{url}', url).replace('{slugRegex}', slugRegex.toString()),
    })

    return response
  }
  else {
    return createError({ status: 501, statusText: 'AI not enabled' })
  }
})
