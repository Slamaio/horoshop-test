export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody<Partial<Design>>(event)

  const storage = useStorage<Design[]>('data')
  const designs = (await storage.getItem('designs')) || []

  const index = designs.findIndex((d) => d.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Design not found' })
  }

  const updated = {
    ...designs[index],
    ...body,
    updatedAt: new Date().toISOString()
  }
  designs[index] = updated

  await storage.setItem('designs', designs)

  return updated
})
