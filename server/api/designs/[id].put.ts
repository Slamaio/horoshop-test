export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody<Partial<Design>>(event)

  if (typeof body.id !== 'number') {
    const parsedId = Number(body.id)
    if (Number.isNaN(parsedId) || body.id === '') {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID must be a number',
        data: {
          id: 'Має бути числом',
        },
      })
    }
    body.id = parsedId
  }

  if (!body.id || !body.name || !body.url || !body.images?.length) {
    const errors: Record<string, string> = {}
    if (!body.id)
      errors.id = 'ID є обов’язковим'
    if (!body.name)
      errors.name = 'Назва є обов’язковою'
    if (!body.url)
      errors.url = 'URL є обов’язковим'
    if (!body.images || !body.images.length)
      errors.images = 'Мінімум одне зображення є обов’язковим'

    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
      data: {
        ...errors,
      },
    })
  }

  const storage = useStorage<Design[]>('data')
  const designs = (await storage.getItem('designs')) || []

  const existing = designs.find(d => d.id === body.id && d.id !== id)
  if (existing) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Design with this ID already exists',
      data: {
        id: 'Має бути унікальним',
      },
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
