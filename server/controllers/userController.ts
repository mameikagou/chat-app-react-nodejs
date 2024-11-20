import User from "../models/userModel.ts";
import bcrypt from "bcrypt";
import _express, { Request, Response, next } from "npm:express@^4.17";
import { getValue, setValue } from "node-global-storage";
import { onlineUserType } from "../types/user.ts";

export const login = async (req: Request, res: Response, next: next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

export const register = async (req: Request, res: Response, next: next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

export const setAvatar = async (req: Request, res: Response, next: next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

export const logOut = async (req: Request, res: Response, next: next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });

    const onlineUsers = getValue<onlineUserType[]>("onlineUsers");
    const updatedOnlineUsers = onlineUsers.filter(item => req.params.id !== item.userId)
    
    setValue<onlineUserType[]>('onlineUsers',updatedOnlineUsers);


    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};