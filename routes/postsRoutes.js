const express = require('express')
const router = express.Router()


const PostsController = require('../controllers/postsController')

router.get('/index', PostsController.lista)
router.get('/new', PostsController.novo)
router.post('/add', PostsController.salvar)
router.get('/view/:id', PostsController.visualizar)
router.get('/edit/:id', PostsController.edit)
router.post('/update', PostsController.alterar)
router.get('/delete/:id', PostsController.excluir)


module.exports = router