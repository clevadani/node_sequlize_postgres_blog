require('dotenv').config()

const server = require('./server')

const PORT = process.env.PORT || 8080

server.listen(PORT, (err) => {
    if (err) {
        console.log(`ERROR STARTING SERVER: ${err}`)
    }
    console.log(`Server started on PORT: ${8080}`)
})