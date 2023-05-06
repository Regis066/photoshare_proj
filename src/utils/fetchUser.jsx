export const fetchUser = () => {
    const userInfo =
      localStorage.getItem('user') === null
        ? null
        : JSON.parse(localStorage.getItem('user'));
    console.log(userInfo);
    return userInfo;
  };
  