const { readall, register, login } = require("../controller/doctorController");
const auth = require("../middleware/auth");
const route = require("express").Router();

route.post(`/docregister`, register);
route.get(`/all`, readall);
route.get(`/doclogin`, login);

module.exports = route;
