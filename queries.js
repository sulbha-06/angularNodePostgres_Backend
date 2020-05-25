const dbConnection = require("./dbConfig").pool;
//get all user
const getUsers = (request, response) => {
  dbConnection.query(
    "SELECT * FROM newusers ORDER BY userid ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
//get user by Id
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  dbConnection.query(
    "SELECT * FROM newusers WHERE userid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
//createt new users

const createUser = (request, response) => {
  const { userid, username } = request.body;

  dbConnection.query(
    "INSERT INTO newusers (userid, username) VALUES ($1, $2)",
    [userid, username],
    (error, results) => {
      console.log("result users", results);

      response.status(201).send();
    }
  );
};
//put users
const updateUser = (request, response) => {
  //const id = parseInt(request.params.id);
  const { userid, username } = request.body;

  dbConnection.query(
    "UPDATE newusers SET  username = $1 WHERE userid = $2",
    [username, userid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send();
    }
  );
};
//delete users
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  dbConnection.query(
    "DELETE FROM newusers WHERE userid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send();
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
