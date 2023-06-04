const User = require("../Model/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SP = require("../Model/SPSchema");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "yesthisisthesecretkeytomaketoken", {
    expiresIn: maxAge,
  });
};

const AddUser = async (req, res) => {
  const { email, password, username, phone } = req.body;
  const user = new User({ email, password, username, phone, roll: 1 });

  try {
    const u = await user.save();
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res.status(200).json({ u: u._id });
  } catch (err) {
    return res.status(404).json(err);
  }
};

const EditUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
          phone: req.body.phone,
        },
      }
    );
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json(err);
  }
};

const CheckUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    try {
      const user = await User.findOne({ email: email });
      const isMatch = bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = createToken(user._id);
        return res
          .status(200)
          .json({ token: token, user_id: user._id, user, roll: 1 });
      }
    } catch (err) {
      const sp = await SP.findOne({ email: email });
      const isSpMatch = bcrypt.compare(password, sp.password);
      if (isSpMatch) {
        const token = createToken(sp._id);
        return res
          .status(200)
          .json({ token: token, user_id: sp._id, user: sp, roll: 2 });
      }
    }
  } catch (err) {
    return res.status(404).json(err);
  }
};

const GetUser = async (req, res) => {
  const user =
    (await User.findById(req.params.user_id)) ||
    (await SP.findById(req.params.user_id));
  return res.status(200).json({ user });
};

module.exports = { AddUser, EditUser, CheckUser, GetUser };
