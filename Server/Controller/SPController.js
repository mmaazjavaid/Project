
// ========================    IMPORT MODULES   =====================
const SP = require("../model/SPSchema")
const User = require("../model/UserSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, "yesthisisthesecretkeytomaketoken", {
        expiresIn: maxAge
    })
}




// =======================================================================================================================
// ============================================     Sign Up Service Provider   =======================================
// =======================================================================================================================
const AddSP = async (req, res) => {

    try {
        // const file = req.file;
        // const result = await cloudinary.uploader.upload(file.path, {
        //     resource_type: "image",
        // });
        const profile_image = "";


        const emailAlready = await User.findOne({ email: req.body.email });
        if (emailAlready==null) {

            const sp = new SP(
                { location, email, password, username, phone, skills, title, description, total_earnings, total_jobs, total_hours, education, experience } = req.body
            )

            try {
                const s = await sp.save();
                const token = createToken(s._id);
                res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
                console.log("sp added successfuly.")
                return res.status(200).json({ token });
            }

            catch (err) {
                console.log("sorry sp cannot add." + err)
                return res.status(404).json(err);
            }
        }
        else {
            console.log("Sorry, This Email is already in use.")
            return res.status(404).json(err);
        }

    }
    catch (err) {
        console.log(err)
        return res.status(404).json(err);
    }


}
// =======================================================================================================================
// ================================================     Edit SP    =====================================================
// =======================================================================================================================

const EditSP = async (req, res) => {

    try {

        const sp = await SP.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
                phone: req.body.phone,
                skills: req.body.skills
            }
        });

        console.log("service provider Edited successfuly.")
        return res.status(200).json(sp);
    }

    catch (err) {
        console.log("sorry service provider cannot Edit.")
        return res.status(404).json(err);
    }

}
// =======================================================================================================================
// ================================================     Login Check Service Provider    ==================================
// =======================================================================================================================
const CheckSP = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const sp = await SP.findOne({ email: email })
        const isMatch = bcrypt.compare(password, sp.password)

        if (isMatch) {
            const token = await sp.generateAuthToken()

            console.log("service provider Logged in")
            res.cookie('jwt', token)

            return res.status(200).json({sp,roll:2});
        }
    }
    catch (err) {
        console.log("sorry! service provider cannot login" + err)
        return res.status(404).json(err);
    }


}



module.exports = { AddSP, EditSP, CheckSP };