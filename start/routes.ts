/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/stocks', '#controllers/stocks_controller.index')
router.post('/stocks', '#controllers/stocks_controller.store')
