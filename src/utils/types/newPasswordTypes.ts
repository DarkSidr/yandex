export type TNewPassword = {
  loading: boolean;
  error: null | {};
  newPassword: null | boolean;
};

export type TNewPasswordReducer = {
  newPasswordReducer: TNewPassword;
};
