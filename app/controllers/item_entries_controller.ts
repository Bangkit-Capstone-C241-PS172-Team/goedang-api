import ItemLog from '#models/item_entry'
import type { HttpContext } from '@adonisjs/core/http'

export default class ItemEntriesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return {
      message: 'Item Entries',
    }
  }

  /**
   * Display form to create a new record
   */
  async create({ request }: HttpContext) {
    const data = request.body()

    await ItemLog.create(data)

    return data
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

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
  async destroy({ params }: HttpContext) {}
}
