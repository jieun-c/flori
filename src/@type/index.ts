interface ICommonOptionType {
  label: string;
  code: string;
}

export const categorys: readonly ICommonOptionType[] = [
  { label: "상의", code: "top" },
  { label: "스커트", code: "skirt" },
  { label: "팬츠", code: "pants" },
  { label: "원피스", code: "dress" },
];

export const USER_ROLES = {
  ADMIN: "admin",
  SELLER: "seller",
  CUSTOMER: "customer",
} as const;
type RoleType = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface IUser {
  displayName: string;
  email: string;
  photoURL: string;
  role: RoleType;
  uid: string;
}

export interface IProduct {
  productId: string;
  brandName: string;
  name: string;
  description: string | undefined;
  originPrice: number;
  price: number;
  discount: number;
  category: string; // 구분 필요
  options: string[] | null;
  images: IImageInfo[];
  sellerId: string;
  createAt: Date;
  updateAt: Date;
}

export interface IImageInfo {
  publicId: string;
  url: string;
}
