const fastify = require('fastify');
const app = fastify();

const PORT = process.env.NODE_ENV || 3000

app.get('/', (req, res)=>{
    res.send({hello: 'world'})
})

app.listen(PORT)