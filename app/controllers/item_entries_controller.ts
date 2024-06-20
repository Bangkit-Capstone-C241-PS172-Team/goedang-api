import Item from '#models/item'
import ItemEntries from '#models/item_entry'
import type { HttpContext } from '@adonisjs/core/http'

export default class ItemEntriesController {
  /**
   * Display a list of resource
   */
  async index({ response, auth, request }: HttpContext) {
    try {
      // Memeriksa apakah pengguna sudah login
      await auth.check()
      const userId = auth.user?.id

      if (userId === undefined) {
        return response.status(401).send({ message: 'You must login to access this resource' })
      }

      // Mengambil semua data Entry dari database
      let entries = await ItemEntries.findManyBy('user_id', userId)

      // Mengambil data inOut dari parameter
      const inOut = request.qs().inOut

      // Filter entries berdasarkan inOut jika diberikan
      if (inOut) {
        entries = entries.filter((entry) => entry.inOut === inOut)
      }

      // Mengembalikan respons dengan data entries
      return response.status(200).send(entries)
    } catch (error) {
      // Menangani kesalahan jika gagal mengambil data
      console.error(error)
      return response.status(500).send({ message: 'Failed to fetch entries', error: error.message })
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

      // Menyimpan data baru ke dalam tabel Item Entries
      const entry = await ItemEntries.create(data)

      // Mengembalikan respons sukses dengan data entry yang baru dibuat
      return response.status(201).send({ message: 'Entry created successfully', data: entry })
    } catch (error) {
      // Menangani kesalahan jika gagal menyimpan data
      console.error(error)
      return response.status(500).send({ message: 'Failed to create entry', error: error.message })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response, auth }: HttpContext) {
    try {
      // Memeriksa apakah pengguna sudah login
      await auth.check()
      const userId = auth.user?.id

      if (userId === undefined) {
        return response.status(401).send({ message: 'You must login to access this resource' })
      }

      // Mengambil data Entry dari database
      const { id } = params
      const entry = await ItemEntries.query()
        .where('user_id', userId ?? '')
        .andWhere('id', id)
        .firstOrFail()

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
  async edit({}: HttpContext) {}

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

      // Lakukan operasi penghapusan entry sesuai kebutuhan
      await entry.delete()

      return response.status(200).send({ message: `Entry with id ${id} deleted successfully` })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ message: 'Failed to delete entry', error: error.message })
    }
  }

  async indexByItemId({ params, response, auth }: HttpContext) {
    try {
      // Memeriksa apakah pengguna sudah login
      await auth.check()
      const userId = auth.user?.id

      if (userId === undefined) {
        return response.status(401).send({ message: 'You must login to access this resource' })
      }

      // Mengambil data Entry dari database
      const { id } = params
      const entries = await ItemEntries.findManyBy({ userId: userId, itemId: id })

      // Mengembalikan respons sukses dengan data entry yang ditemukan
      return response.status(200).send(entries)
    } catch (error) {
      // Menangani kesalahan jika gagal menemukan data
      console.error(error)
      return response.status(404).send({ message: 'Entry not found', error: error.message })
    }
  }

  async indexItemsWithLastEntry({ response, auth }: HttpContext) {
    try {
      // Memeriksa apakah pengguna sudah login
      await auth.check()
      const userId = auth.user?.id

      if (userId === undefined) {
        return response.status(401).send({ message: 'You must login to access this resource' })
      }

      const items = await Item.query()
        .where('user_id', userId ?? '')
        .preload('itemEntries', (entriesQuery) => {
          entriesQuery.orderBy('created_at', 'desc')
        })

      const itemsWithEntries = items.filter((item) => item.itemEntries.length > 0)

      const itemsWithLastEntries = itemsWithEntries.map((item) => {
        return {
          ...item.serialize(),
          lastEntry: item.itemEntries[0],
        }
      })

      // Mengembalikan respons sukses dengan data entry yang ditemukan
      return response.status(200).send(itemsWithLastEntries)
    } catch (error) {
      // Menangani kesalahan jika gagal menemukan data
      console.error(error)
      return response.status(404).send({ message: 'Entry not found', error: error.message })
    }
  }

  async indexSalesOverview({ response, auth }: HttpContext) {
    try {
      // Memeriksa apakah pengguna sudah login
      await auth.check()
      const userId = auth.user?.id

      if (userId === undefined) {
        return response.status(401).send({ message: 'You must login to access this resource' })
      }

      const items = await Item.query()
        .where('user_id', userId ?? '')
        .preload('itemEntries', (entriesQuery) => {
          entriesQuery.orderBy('created_at', 'desc')
        })

      // Objek untuk menyimpan total penjualan per tanggal
      const dailySales: {
        date: string
        totalSales: number
      }[] = []

      // Menghitung total penjualan per tanggal
      items.forEach((item) => {
        item.itemEntries.forEach((entry) => {
          const date = entry.createdAt.toString().split('T')[0] // Ambil tanggal dari createdAt itemEntries
          const sales = entry.inOut === 'out' ? entry.total : 0 // Hanya tambahkan total jika inOut adalah 'out'

          // Cari apakah tanggal sudah ada di dalam dailySales
          const existingDateIndex = dailySales.findIndex((sale) => sale.date === date)

          // Jika tanggal sudah ada, tambahkan sales ke totalSales
          if (existingDateIndex !== -1) {
            dailySales[existingDateIndex].totalSales += sales
          } else {
            // Jika tanggal belum ada, tambahkan sebagai objek baru
            dailySales.push({ date, totalSales: sales })
          }
        })
      })

      // Mengurutkan hasil berdasarkan tanggal (ascending)
      dailySales.sort((a, b) => (a.date < b.date ? -1 : 1))

      // Mengembalikan respons
      return response.status(200).send(dailySales)
    } catch (error) {
      // Menangani kesalahan jika gagal menemukan data
      console.error(error)
      return response
        .status(404)
        .send({ message: 'Sales overview not found', error: error.message })
    }
  }
}
