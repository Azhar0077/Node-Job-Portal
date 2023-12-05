import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    next("All details is required");
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(200).send({
      success: false,
      message: "Email already register",
    });
  }
  const user = await userModel.create({ name, email, password });
  //token
  const token = user.createJWT();
  res.status(200).send({
    success: true,
    message: "User register successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    next("please provide all details");
  }
  //find
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("User not found");
  }
  //compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid userName or Password");
  }
  user.password = undefined;

  const token = user.createJWT();
  res.status(200).send({
    success: true,
    message: "Login Successfully",
    user,
    token,
  });
};
