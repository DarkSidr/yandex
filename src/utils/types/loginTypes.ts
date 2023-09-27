type TLoginError = {
  success: boolean;
};

type TLoginSuccess = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

export type TLogin = {
  user: null | TLoginSuccess;
  loading: boolean;
  error: null | TLoginError;
  isAuthenticated: boolean;
};

export type TLoginForm = {
  email: string;
  password: string;
};

export type TLoginReducer = {
  loginReducer: TLogin;
};
