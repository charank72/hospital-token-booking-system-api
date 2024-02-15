const {
  readall,
  register,
  login,
  readSingle,
  deleteUser,
} = require("../controller/doctorController");
const auth = require("../middleware/auth");
const route = require("express").Router();

route.post(`/docregister`, register);
route.get(`/all`, readall);
route.post(`/doclogin`, login);
route.get(`/read/:id`, readSingle);
route.delete(`/delete/:id`, deleteUser);

module.exports = route;
