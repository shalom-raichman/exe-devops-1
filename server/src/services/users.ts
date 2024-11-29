import { LoginDto, ProfileDto, RegisterDto } from "../typs/dto/user";
import User from "../models/user";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin = async (user: LoginDto) => {
  try {
    const userFromDatabase = await User.findOne({
      username: user.username,
    }).lean();
    if (!userFromDatabase) throw new Error("user not found");
    const match = await compare(user.password, userFromDatabase.password);
    if (!match) throw new Error("wrong password");
    // gen token
    const token = await jwt.sign(
      {
        user_id: userFromDatabase._id,
        isAdmin: userFromDatabase.isAdmin,
        username: userFromDatabase.username,
      },
      "process.env.JWT_SECRET!",
      {
        expiresIn: "10m",
      }
    );
    return { ...userFromDatabase, token, password: "*******" };
  } catch (err) {
    throw err;
  }
};

export const createNewUser = async (user: RegisterDto) => {
  try {
    if (!user.password)
      throw new Error("Missing user data, [password] is require");
    const encPass = await hash(user.password, 10);
    user.password = encPass;
    const newUser = new User(user);
    return await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Can't create new user");
  }
};

export const getUserData = async (user: ProfileDto) => {
  try {
    if (!user.id) throw new Error("Missing user data, [id] is required");
    const currUser = await User.findById(user.id).lean();
    return { hasVoted: currUser?.hasVoted, votedFor: currUser?.votedFor };
  } catch (err) {
    console.log(err);
    throw new Error("Can't create new user");
  }
};
