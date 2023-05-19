import { atom } from "recoil";
import { ICart, IProduct, IUser } from "../@type/index";

export const currentUserAtom = atom<IUser | null>({
  key: "currentUserAtom",
  default: null,
});

export const productsAtom = atom<IProduct[] | []>({
  key: "productsAtom",
  default: [],
});

export const cartsAtom = atom<ICart[] | []>({
  key: "cartsAtom",
  default: [],
});
