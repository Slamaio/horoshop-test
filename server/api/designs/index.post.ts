export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<Design>>(event)

  if (!body.id || !body.name || !body.url || !body.images?.length) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const storage = useStorage<Design[]>('data')
  const current = (await storage.getItem('designs')) || []

  const existing = current.find((d) => d.id === body.id)
  if (existing) {
    throw createError({ statusCode: 400, statusMessage: 'Design with this ID already exists' })
  }

  const newDesign: Design = {
    id: body.id,
    name: body.name,
    url: body.url,
    images: body.images,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  await storage.setItem('designs', [...current, newDesign])

  return newDesign
})
