const {
  signupServices,
  findUserByEmail,
} = require("../services/user.services");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res, next) => {
  try {
    const user = await signupServices(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully create user",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

//1.check if email and password are given
//2.load user with mail
//3.If not user send res
//4.compare password
//5.if password not match then send res
//6.check if user is active
//7.If user not active then send res
//8.generate token
//9.send user and token

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please Provide your credential",
      });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found.Please create an account",
      });
    }
    const isPasswordValid = user.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Password is not correct",
      });
    }

    if (user.status != "active") {
      return res.status(401).json({
        status: "fail",
        error: "Your account is not active yet.",
      });
    }

    const token = generateToken(user);
    const { password: pass, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
