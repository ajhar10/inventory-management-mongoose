const jwt = require("jsonwebtoken");
const { promisify } = require("util");
/***
 * 1.check if token exist
 * 2.If not token send res
 * 3.decode token
 * 4.If valid then next
 */
module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({
        status: "fail",
        error: "You are not logged in",
      });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_TOKEN
    );

    // const user = User.findOne({ email: decoded.email })
    // console.log(token);
    console.log(decoded);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).json({
      status: "fail",
      error: "Invalid given token",
    });
  }
};
