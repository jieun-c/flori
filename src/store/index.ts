import { atom } from "recoil";
import { IUser } from "../@type/index";

export const currentUserAtom = atom<IUser | null>({
  key: "currentUserAtom",
  default: null,
});
