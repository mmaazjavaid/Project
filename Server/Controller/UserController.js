
const User = require("../Model/UserSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const SP = require("../Model/SPSchema")

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, "yesthisisthesecretkeytomaketoken", {
        expiresIn: maxAge
    })
}
// =======================================================================================================================
// ================================================     Home page    =====================================================
// =======================================================================================================================

const HomePage = (req, res) => {
    res.json("<h1>Welcome to Node js, This is home page of your node app</h1>")
}

// =======================================================================================================================
// ================================================     Sign Up User     =====================================================
// =======================================================================================================================

const AddUser = async (req, res) => {
    const { email, password, username, phone } = req.body

    const user = new User(
        { email, password, username, phone, roll: 1 }
    )

    try {

        const u = await user.save();
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
        console.log("user added successfuly.")
        return res.status(200).json({ u: u._id });
    }

    catch (err) {
        console.log("sorry user cannot add." + err)
        return res.status(404).json(err);
    }



}

// =======================================================================================================================
// ================================================     Edit User     =====================================================
// =======================================================================================================================


const EditUser = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
                phone: req.body.phone
            }
        });


        console.log("user Edited successfuly.")
        return res.status(200).json(user);
    }

    catch (err) {
        console.log("sorry user cannot Edit.")
        return res.status(404).json(err);
    }

}

// =======================================================================================================================
// ================================================     Login Check     =====================================================
// =======================================================================================================================

const CheckUser = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    try {

        try {


            const user = await User.findOne({ email: email })
            const isMatch = bcrypt.compare(password, user.password)

            if (isMatch) {

                const token = createToken(user._id);
                console.log("user logged in")
                console.log(user._id)
                return res.status(200).json({ token: token, user_id: user._id, roll: 1 });

            }
        }
        catch (err) {



            const sp = await SP.findOne({ email: email })
            const isSpMatch = bcrypt.compare(password, sp.password)
            if (isSpMatch) {

                const token = createToken(sp._id);
                console.log("sp logged in")
                console.log(sp._id)
                return res.status(200).json({ token: token, sp_id: sp._id, roll: 2 });

            }
        }

    }
    catch (err) {

        console.log("sorry user cannot login" + err)


        return res.status(404).json(err);
    }



}


module.exports = { AddUser, EditUser, HomePage, CheckUser };