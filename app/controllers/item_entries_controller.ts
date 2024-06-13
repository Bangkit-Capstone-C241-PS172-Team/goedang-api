import ItemEntries from '#models/item_entry'
import type { HttpContext } from '@adonisjs/core/http'

export default class ItemEntriesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const entries = await ItemEntries.all()
    return entries
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.body()
    await ItemEntries.create(data)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const { id } = params
      const entry = await ItemEntries.findOrFail(id)

      // Lakukan operasi penghapusan item sesuai kebutuhan
      await entry.delete()

      return response.status(200).send({ message: `Entry with id ${id} deleted successfully` })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ message: 'Failed to delete entry' })
    }
  }
}
