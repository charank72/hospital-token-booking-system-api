const { StatusCodes } = require("http-status-codes");
const User = require("../model/userModel");

const userController = {
  form: async (req, res) => {
    try {
      const { name, email, mobile, gender, role, issue } = req.body;
      let userList = await User.find({});
      let users = userList.filter((item) => item.role !== "doctor");
      let tokenGen = users.length + 1;
      let data = await User.create({
        name,
        email,
        token: tokenGen,
        mobile,
        gender,
        role,
        issue,
      });
      res.status(StatusCodes.ACCEPTED).json({
        msg: "Details sent succesfully",
        user: data,
        success: true,
      });
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: err.message, succcess: false });
    }
  },
};

module.exports = userController;
