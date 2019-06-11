const fastify = require('fastify')({
  logger: true
});
const jsonParser = require('fast-json-body');

const db = require('./queries');

const PORT = process.env.PORT || 3000;

fastify.addContentTypeParser('application/jsoff', function (req, done) {
  jsonParser(req, function (err, body) {
    done(err, body)
  })
});

fastify.get('/', (req, res)=>{
    res.send({hello: 'world'})
})

fastify.get('/users', db.getUsers);
fastify.get('/users/:id', db.getUserById);
fastify.post('/users/', db.createUser);
fastify.put('/users/:id', db.updateUser);
fastify.delete('/users/:id', db.deleteUser);

fastify.listen(PORT)