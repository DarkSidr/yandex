export const getUserInfo = (login) => {
  return {
    name: login.user.user.name,
    email: login.user.user.email,
  };
};
