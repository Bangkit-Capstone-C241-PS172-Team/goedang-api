/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/item_entries', '#controllers/item_entries_controller.index')
router.post('/item_entries', '#controllers/item_entries_controller.store')
