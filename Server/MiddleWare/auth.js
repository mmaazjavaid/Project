const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log("in auth middle ware")
  const token = req.headers.authorization.split(' ')[0];
  try {
    const decoded = jwt.verify(token, "yesthisisthesecretkeytomaketoken");
    req.user = decoded;
    console.log(req.user.id)
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};