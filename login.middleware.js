
const usersWithCredentials = require("./users_with_credentials.json");
const bcrypt = require("bcrypt");


const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "email and password are required",
            });
        }

        const foundUser = usersWithCredentials.find((user) => user.email === email);

        if (!foundUser) {
            return res.status(401).json({
                message: "User not found",
            });
        }


        const isMatch = await bcrypt.compare(password, foundUser.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }

    next();
};

module.exports = { Login };