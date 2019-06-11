const fastify = require('fastify')({
  logger: true,
  ignoreTrailingSlash: true
});
const jsonParser = require('fast-json-body');
const qs = require('qs');
const db = require('./queries');

const PORT = process.env.PORT || 3000;

fastify.addContentTypeParser('application/jsoff', function (req, done) {
  jsonParser(req, function (err, body) {
    done(err, body)
  })
})

fastify.addContentTypeParser('application/x-www-form-urlencoded', function (req, done) {
  var body = ''
  req.on('data', function (data) {
    body += data
  })
  req.on('end', function () {
    try {
      const parsed = qs.parse(body)
      done(null, parsed)
    } catch (e) {
      done(e)
    }
  })
  req.on('error', done)
})

fastify.get('/', (req, res)=>{
    res.send({hello: 'world'})
})

fastify.get('/users', db.getUsers);
fastify.get('/users/:id', db.getUserById);
fastify.post('/users', db.createUser);
fastify.put('/users/:id', db.updateUser);
fastify.delete('/users/:id', db.deleteUser);

const start = async () => {
  try {
    await fastify.listen(PORT, '0.0.0.0');
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  }
  catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();