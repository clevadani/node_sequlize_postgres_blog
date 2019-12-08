const request = require('supertest')
const app = require('../server')

describe('Post endpoints', () => {
    it('should create a new post', async () => {
        const res = await request(app)
            .post('/api/posts')
            .send({
                userId: 1,
                title: 'Test is cool'
            })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('post')
    })


    it('retrieves a single post', async () => {
        const postId = 1
        const res = await request(app).get(`/api/posts/${postId}`)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('post')
    })

    it('retrieves all posts', async () => {
        const res = await request(app).get(`/api/posts`)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('posts')
        expect(res.body.posts).toHaveLength(1)
    })

    it('updates one post', async () => {
        const postId = 1
        const res = await request(app)
            .put(`/api/posts/${postId}`)
            .send({
                title: 'Title modified.'
            })
            
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('post')
        expect(res.body.post).toHaveProperty('title', 'Title modified.')
    })

    it('deletes single post', async () => {
        const postId = 1
        const res = await request(app)
            .delete(`/api/posts/${postId}`)
        
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message', 'Post deleted successfully')
    })

    // it('should return status code 500 if db constraint is violated', async () => {
    //     const res = await request(app)
    //       .post('/api/posts')
    //       .send({
    //         title: 'test is cool',
    //         content: 'Lorem ipsum',
    //       });
    //     expect(res.statusCode).toEqual(500);
    //     expect(res.body).toHaveProperty('error');
    //   });

    it('should respond with status code 404 if resource is not found', async () => {
        const postId = 1;
        const res = await request(app).get(`/api/posts/${postId}`);
        expect(res.statusCode).toEqual(404);
    })
})