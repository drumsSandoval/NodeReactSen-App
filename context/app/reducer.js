export default (state, action) => {
  switch (action.type) {
    case "UPLOAD_FILE_REQUEST":
      return {
        ...state,
        fetching: true,
      };
    case "SHOW_ALERT":
      return {
        ...state,
        fileMessage: action.payload,
      };
    case "HIDE_ALERT":
      return {
        ...state,
        fileMessage: null,
      };
    case "UPLOAD_FILE_SUCCESS":
      return {
        ...state,
        ...action.payload,
        fetching: false,
      };
    case "UPLOAD_FILE_ERROR":
      return {
        ...state,
        fileMessage: action.payload,
        fetching: false,
      };
    case "CREATE_LINK_SUCCESS":
      return {
        ...state,
        url: action.payload,
      };
    case "CREATE_LINK_ERROR":
    default:
      return state;
  }
};
