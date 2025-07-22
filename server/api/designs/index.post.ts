export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<Design>>(event)

  if (!body.id || !body.name || !body.url || !body.images?.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  const storage = useStorage<Design[]>('data')
  const current = (await storage.getItem('designs')) || []

  const existing = current.find(d => d.id === body.id)
  if (existing) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Design with this ID already exists',
    })
  }

  for (const image of body.images) {
    if (typeof image !== 'string' || !/^data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/=]+$/.test(image)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid image format. Images must be base64-encoded strings.',
      })
    }
  }

  const newDesign: Design = {
    id: body.id,
    name: body.name,
    url: body.url,
    images: body.images,
    published: body.published ?? false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  await storage.setItem('designs', [...current, newDesign])

  return newDesign
})
