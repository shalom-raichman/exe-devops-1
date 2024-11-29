import { Request, Response } from "express";
import { getCandidateList, initDatabase } from "../services/candidates";

export const sid = async (req: Request, res: Response) => {
  try {
    await initDatabase();
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const getList = async (req: Request, res: Response) => {
  try {
    const list = await getCandidateList();
    if (!list.length) {
      console.log("initializing sid")
      await initDatabase();
    }
    res.json(await getCandidateList());
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
