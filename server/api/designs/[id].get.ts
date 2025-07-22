export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const storage = useStorage<Design[]>('data')
  const all = (await storage.getItem('designs')) || []

  const design = all.find(d => d.id === id)
  if (!design) {
    throw createError({ statusCode: 404, statusMessage: 'Design not found' })
  }

  return design
})
