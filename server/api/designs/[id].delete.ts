export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const storage = useStorage<Design[]>('data')
  const designs = (await storage.getItem('designs')) || []

  const index = designs.findIndex((d) => d.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Design not found' })
  }

  designs.splice(index, 1)
  await storage.setItem('designs', designs)
  
  return { success: true }
})
