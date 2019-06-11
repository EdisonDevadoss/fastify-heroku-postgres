const { Client } = require("pg");

const connectionString =
  "postgres://jkoqcymnivnfiw:6dc2b9799324f5b0c32c94fa67e26360f0e99f12a70b76e4a812065aeb4ba8b3@ec2-174-129-240-67.compute-1.amazonaws.com:5432/d8k6louksj77eq";

const client = new Client({
  connectionString: connectionString,
  ssl: true
});

client.connect();

const getUsers = (request, response) => {
  client.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  client.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;
  client.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User added with ID: ${result.id}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  client.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  client.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = { getUsers, createUser, updateUser, getUserById, deleteUser };