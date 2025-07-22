export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody<Partial<Design>>(event)

  if (typeof body.id !== 'number') {
    const parsedId = Number(body.id)
    if (Number.isNaN(parsedId)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID must be a number',
      })
    }
    body.id = parsedId
  }

  if (!body.id || !body.name || !body.url || !body.images?.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  const storage = useStorage<Design[]>('data')
  const designs = (await storage.getItem('designs')) || []

  const existing = designs.find(d => d.id === body.id && d.id !== id)
  if (existing) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Design with this ID already exists',
    })
  }

  const index = designs.findIndex(d => d.id === id)
  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Design not found',
    })
  }

  const updated = {
    ...designs[index],
    ...body,
    updatedAt: new Date().toISOString(),
  }
  designs[index] = updated

  await storage.setItem('designs', designs)

  return updated
})
