const { Router } = require("express")
const controllers = require('../controllers')

const router = Router()

router.post('/posts', controllers.createPost)

router.get('/posts', controllers.getAllPosts)

router.get('/posts/:postId', controllers.getPostById)

router.put('/posts/:postId', controllers.updatePost)

router.delete('/posts/:postId', controllers.deletePost)

router.use('*', (req, res) => res.send('Welcome'))

module.exports = router