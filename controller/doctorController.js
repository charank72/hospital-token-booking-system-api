const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const Doctor = require("../model/doctorModel");
const comparePassword = require("../utility/comparepass");
const createAccessToken = require("../utility/accessToken");
const readall = async (req, res) => {
  try {
    let userList = await User.find({});
    let users = userList.filter((item) => item.role !== "doctor");
    return res
      .status(StatusCodes.OK)
      .json({ length: users.length, users, success: true });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    //email
    const extEmail = await Doctor.findOne({ email });

    //points the duplicate,any server reseponse erroe 409
    if (extEmail)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: `${email} already exsists`, success: false });

    const encPass = await bcrypt.hash(password, 10); //encrypts the password into hash

    let data = await Doctor.create({
      name,
      email,
      role,
      password: encPass,
    });
    res.status(StatusCodes.ACCEPTED).json({
      msg: "New doctor registered succesfully",
      doctor: data,
      success: true,
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};
const readSingle = async (req, res) => {
  let id = req.params.id;
  let single = await User.findById(id);
  if (!single)
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "no user found" });

  return res.status(StatusCodes.OK).json({ msg: "user data", single });
};
const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    let single = await User.findById(id);
    if (!single)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: `requested user not found`, success: false });

    await User.findByIdAndDelete({ _id: id });

    res
      .status(StatusCodes.OK)
      .json({ msg: "user info successfully deleted", success: true });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //if login through email
    if (email) {
      let extEmail = await Doctor.findOne({ email });
      if (!extEmail)
        return res
          .status(StatusCodes.CONFLICT)
          .json({ msg: `${email} is not registered`, success: false });

      //comparing the password(string,hash)
      let isMatch = await comparePassword(password, extEmail.password);
      if (!isMatch)
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ msg: `password not matched`, success: false, extEmail });
      res
        .status(StatusCodes.OK)
        .json({ msg: `login success(with email)`, success: true });
    }
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};

module.exports = { readall, register, login, readSingle, deleteUser };
