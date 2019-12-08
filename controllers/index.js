const models = require('../database/models')

const createPost = async (req, res) => {
    try {
        const post = await models.Post.create(req.body)
        res.status(200).json({post})
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await models.Post.findAll({
            raw: true,
            include: [
                {
                    model: models.Comment,
                    as: 'comments',
                    include: [{
                        model: models.User,
                        as: 'author',
                        attributes: ['name']
                    }]
                },
                {
                    model: models.User,
                    as: 'author',
                    attributes: ['name']
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })

        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getPostById = async (req, res) => {
    try {
        const { postId } = req.params
        const post = await models.Post.findOne({
            where: { id: postId },
            include: [
                {
                    model: models.Comment,
                    as: 'comments',
                    include: [{
                        model: models.User,
                        as: 'author',
                        attributes: ['id', 'name', 'email']
                    }]
                },
                {
                    model: models.User,
                    as: 'author',
                    attributes: ['id', 'name', 'email']
                }
            ]
        })

        if (post) {
            res.status(200).json({ post })
        } else{
            res.status(404).json({ error: "Post with that ID not found" })
        }
    } catch (error) {
        console.log('ERROR', error)
        res.status(500).json({ error: error.message })
    }
}

const updatePost = async (req, res) => {
    try {
        const { postId } = req.params
        
        const updatedPost = await models.Post.update(req.body, {
            where: { id: postId}
        })

        if (updatedPost) {
            const post = await models.Post.findOne({ where: {id: postId} })
            return res.status(200).json({ post })
        }

        return res.status(400).json({ error: `Post with id(${postId}) could not be updated`})
    } catch (error) {
        console.log('ERROR', error)
        return res.status(500).json({ error: error.message })
    }
}

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params
        const deletedPost = await models.Post.destroy({
            where: { id: postId}
        })

        if (deletedPost) {
            return res.status(200).json({ message: "Post deleted successfully" })
        }

        return res.status(400).json({ error: `Post with id(${postId}) not found`})
    } catch (error) {
        console.log('ERROR', error)
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}