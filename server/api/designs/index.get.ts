export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number.parseInt(query.page as string || '1')
  const limit = Number.parseInt(query.limit as string || '10')

  const storage = useStorage<Design[]>('data')
  const designs = (await storage.getItem('designs')) || []

  const start = (page - 1) * limit
  const paginated = designs.slice(start, start + limit)

  return {
    page,
    limit,
    total: designs.length,
    data: paginated,
  }
})
