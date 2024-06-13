import Item from '#models/item'
import type { HttpContext } from '@adonisjs/core/http'

export default class ItemsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      // Mengambil semua data Item dari database
      const items = await Item.all()

      // Mengembalikan respons dengan data items
      return response.status(200).send(items)
    } catch (error) {
      // Menangani kesalahan jika gagal mengambil data
      console.error(error)
      return response.status(500).send({ message: 'Failed to fetch items', error: error.message })
    }
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()

      // Menyimpan data baru ke dalam tabel Item
      const item = await Item.create(data)

      // Mengembalikan respons sukses dengan data item yang baru dibuat
      return response.status(201).send({ message: 'Item created successfully', data: item })
    } catch (error) {
      // Menangani kesalahan jika gagal menyimpan data
      console.error(error)
      return response.status(500).send({ message: 'Failed to create item', error: error.message })
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
  async destroy({ params, response }: HttpContext) {
    try {
      const { id } = params
      const item = await Item.findOrFail(id)

      // Lakukan operasi penghapusan item sesuai kebutuhan
      await item.delete()

      return response.status(200).send({ message: `Item with id ${id} deleted successfully` })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ message: 'Failed to delete item' })
    }
  }
}
