import { Request, Response } from "express";
import { LoginDto, ProfileDto, RegisterDto } from "../typs/dto/user";
import { createNewUser, getUserData, userLogin } from "../services/users";

export const login = async (req: Request<LoginDto>, res: Response) => {
  try {
    const loggedUser = await userLogin(req.body);
    res.status(200).json(loggedUser);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

export const register = async (req: Request<RegisterDto>, res: Response) => {
  try {
    const freshlyCreatedUser = await createNewUser(req.body);
    res.status(201).json(freshlyCreatedUser);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

export const profile = async (
  req: Request<any, any, ProfileDto>,
  res: Response
) => {
  try {
    const data = await getUserData(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};
