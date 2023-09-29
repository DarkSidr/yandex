type TUser = {
  email: string;
  name: string;
};

type TUserResponse = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TRegister = {
  user: null | TUserResponse;
  loading: boolean;
  error: null | boolean;
  isRegistered: boolean;
};
