import Item from '#models/item'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class ItemsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return {
      message: 'Item',
    }
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ response, request }: HttpContext) {
    try {
      const data = request.body()

      // Mengonversi user_id menjadi integer
      data.user_id = Number.parseInt(data.user_id)

      console.log(data)

      // Pastikan data user_id yang dimasukkan ada di tabel users
      const user = await User.find(data.user_id)
      if (!user) {
        return response.status(400).send({ message: 'User not found' })
      }

      await Item.create(data)

      return response.status(201).send({ message: 'Item created successfully' })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ message: 'Failed to create item' })
    }
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
  async destroy({ params }: HttpContext) {}
}
