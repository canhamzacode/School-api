const loginController = (req, res) => {
  res.send("Login");
};
const signupController = (req, res) => {
  res.send("Register");
};
module.exports = { loginController, signupController };
