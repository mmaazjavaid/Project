const User = require("../Model/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "yesthisisthesecretkeytomaketoken", {
    expiresIn: maxAge,
  });
};

const AddUser = async (req, res) => {
  const {
    location,
    email,
    roll,
    password,
    username,
    name,
    phone,
    skills,
    title,
    description,
    total_earnings,
    total_jobs,
    total_hours,
    education,
    experience,
  } = req.body;

  const user = new User({
    location,
    email,
    password,
    username,
    name,
    phone,
    skills,
    title,
    description,
    total_earnings,
    total_jobs,
    total_hours,
    education,
    experience,
    roll,
  });

  try {
    const userObject = await user.save();
    const token = createToken(userObject._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res.status(200).json({ user: userObject });
  } catch (err) {
    return res.status(404).json({ error: err.errmsg });
  }
};

const EditUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      {
        new: true,
      }
    );
    return res.status(200).json({ user: user });
  } catch (err) {
    return res.status(404).json({ error: err.errmsg });
  }
};

const CheckUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    const isMatch = bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      return res.status(200).json({ user, token: token, user_id: user._id, roll: 2 });
    }
  } catch (err) {
    return res.status(404).json({ error: err.errmsg });
  }
};
const GetUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error: "Error getting user" });
  }
};

module.exports = { AddUser, EditUser, CheckUser, GetUser };
