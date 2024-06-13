/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
// Item
router.get('/item', '#controllers/item_controller.index')
router.post('/item', '#controllers/item_controller.store')
// Item Entries
router.get('/item_entries', '#controllers/item_entries_controller.index')
router.post('/item_entries', '#controllers/item_entries_controller.store')
