const express = require("express");
const router = express.Router();
const verifyToken = require("../MiddleWare/auth");
const {
  AddUser,
  EditUser,
  CheckUser,
  GetUser,
} = require("../Controller/UserController");

router.post("/api/signup-User", AddUser);
router.post("/api/login-User", CheckUser);
router.post("/api/Edit-User/:id", verifyToken, EditUser);
router.get("/api/get-User/:user_id", GetUser);

module.exports = router;
