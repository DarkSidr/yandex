export type TItemBurger = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  uniqueId?: string;
};

export type TRegisterForm = {
  name: string;
  email: string;
  password: string;
};

export type TProfileForm = {
  name: string;
  email: string;
  password?: string;
};

export type TForgotPasswordForm = {
  email: string;
};

export type TResetPasswordForm = {
  password: string;
  token: string;
};

export type TLinks = {
  id: number;
  text: string;
  linkTo: string;
  linkText: string;
};

export type TRequestError = {
  success: boolean;
  message: string;
};

export type TRequestUser = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

export type TUserError = {
  error: null | TRequestError;
};

export type TUserSuccess = {
  user: null | TRequestUser;
};
