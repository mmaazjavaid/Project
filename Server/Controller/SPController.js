const SP = require("../Model/SPSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "yesthisisthesecretkeytomaketoken", {
    expiresIn: maxAge,
  });
};

const AddSP = async (req, res) => {
  const {
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
  } = req.body;

  const sp = new SP({
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
    roll: 2,
  });

  try {
    const s = await sp.save();
    const token = createToken(s._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(404).json({ error: err.errmsg });
  }
};

const EditSP = async (req, res) => {
  try {
    const sp = await SP.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      {
        new: true,
      }
    );
    return res.status(200).json({ sp: sp });
  } catch (err) {
    return res.status(404).json({ error: err.errmsg });
  }
};

const CheckSP = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const sp = await SP.findOne({ email: email });
    const isMatch = bcrypt.compare(password, sp.password);

    if (isMatch) {
      const token = createToken(sp._id);
      return res.status(200).json({ sp, token: token, sp_id: sp._id, roll: 2 });
    }
  } catch (err) {
    return res.status(404).json(err);
  }
};

module.exports = { AddSP, EditSP, CheckSP };
