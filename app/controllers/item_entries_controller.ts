import ItemEntries from '#models/item_entry'
import type { HttpContext } from '@adonisjs/core/http'

export default class ItemEntriesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      // Mengambil semua data Item dari database
      const entries = await ItemEntries.all()

      // Mengembalikan respons dengan data items
      return response.status(200).send(entries)
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
      const entry = await ItemEntries.create(data)

      // Mengembalikan respons sukses dengan data item yang baru dibuat
      return response.status(201).send({ message: 'Item created successfully', data: entry })
    } catch (error) {
      // Menangani kesalahan jika gagal menyimpan data
      console.error(error)
      return response.status(500).send({ message: 'Failed to create item', error: error.message })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const { id } = params
      const entry = await ItemEntries.findOrFail(id)

      // Mengembalikan respons sukses dengan data entry yang ditemukan
      return response.status(200).send(entry)
    } catch (error) {
      // Menangani kesalahan jika gagal menemukan data
      console.error(error)
      return response.status(404).send({ message: 'Entry not found', error: error.message })
    }
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const { id } = params
      const entry = await ItemEntries.findOrFail(id)
      const data = request.body()

      // Mengupdate data entry dengan data baru
      entry.merge(data)
      await entry.save()

      // Mengembalikan respons sukses dengan data entry yang diperbarui
      return response.status(200).send({ message: 'Entry updated successfully', data: entry })
    } catch (error) {
      // Menangani kesalahan jika gagal mengupdate data
      console.error(error)
      return response.status(500).send({ message: 'Failed to update entry', error: error.message })
    }
  }

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
      return response.status(500).send({ message: 'Failed to delete entry', error: error.message })
    }
  }
}
