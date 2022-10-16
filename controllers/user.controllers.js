const { signupServices } = require("../services/user.services");

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
      message: "couldnt find the user",
    });
  }
};
