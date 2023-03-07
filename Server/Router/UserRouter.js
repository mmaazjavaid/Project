const express = require("express");
const router = express.Router();
const verifyToken=require("../MiddleWare/auth")

const {AddUser,EditUser,HomePage,CheckUser}=require("../Controller/userController")
const {user_rating_and_feedback}=require("../Controller/WorkCompletedController")



router.get("/",HomePage )


router.post("/api/signup-User", AddUser)

router.post("/api/login-User", CheckUser)

router.post("/api/Edit-User/:id",verifyToken, EditUser)


module.exports = router