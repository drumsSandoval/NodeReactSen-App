export default (state, action) => {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
    case "SIGNUP_ERROR":
    case "LOGIN_ERROR":
      return {
        ...state,
        msg: action.payload,
      };
    case "CLEAR_MESSAGES":
      return {
        ...state,
        msg: null,
      };
    case "INIT_SESSION":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        auth: true,
      };
    case "USER_AUTH":
      return {
        ...state,
        user: action.payload,
      };
    case "LOG_OUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        auth: null,
        user: null,
      };
    default:
      return state;
  }
};
