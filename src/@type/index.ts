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
