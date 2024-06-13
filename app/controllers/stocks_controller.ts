import Stock from '#models/stock'
import type { HttpContext } from '@adonisjs/core/http'

export default class StocksController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return {
      itemName: 'Cabai Merah',
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.body()

    // await Stock.create(data)

    return data
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
