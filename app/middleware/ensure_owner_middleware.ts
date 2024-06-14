import Item from '#models/item'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class EnsureOwnerMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const { auth, response } = ctx

    try {
      // Memastikan pengguna sudah login
      await auth.use('api').authenticate()

      /**
       * Call next method in the pipeline and return its output
       */
      await next()
    } catch (error) {
      return response.unauthorized({ message: 'You must login to access this resource' })
    }
  }
}
