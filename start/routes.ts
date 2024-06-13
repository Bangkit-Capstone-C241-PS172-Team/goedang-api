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
router.get('/item', '#controllers/items_controller.index')
router.post('/item', '#controllers/items_controller.store')
router.get('/items/delete/:id', '#controllers/items_controller.destroy')
// Item Entries
router.get('/item_entries', '#controllers/item_entries_controller.index')
router.post('/item_entries', '#controllers/item_entries_controller.store')
router.get('/item_entries/delete/:id', '#controllers/item_entries_controller.destroy')
