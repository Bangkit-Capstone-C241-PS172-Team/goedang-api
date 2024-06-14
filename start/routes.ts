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
router.get('/items', '#controllers/items_controller.index')
router.post('/items', '#controllers/items_controller.store')
router.get('/items/:id', '#controllers/items_controller.show')
router.put('/items/:id', '#controllers/items_controller.update')
router.delete('/items/:id', '#controllers/items_controller.destroy')
// Item Entries
router.get('/item_entries', '#controllers/item_entries_controller.index')
router.post('/item_entries', '#controllers/item_entries_controller.store')
router.get('/item_entries/:id', '#controllers/item_entries_controller.show')
router.put('/item_entries/:id', '#controllers/item_entries_controller.update')
router.delete('/item_entries/:id', '#controllers/item_entries_controller.destroy')
