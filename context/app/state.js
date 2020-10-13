import React, { useReducer } from "react";
import appContext from "./index";
import appReducer from "./reducer";
import Api from "../../config/axios";

const AppState = ({ children }) => {
  const initialState = {
    fileMessage: null,
    fileId: "",
    fileName: "",
    fetching: false,
    downloads: 1,
    password: "",
    author: null,
    url: "",
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const _showAlert = (msg) => {
    dispatch({
      type: "SHOW_ALERT",
      payload: msg,
    });
    setTimeout(() => {
      dispatch({
        type: "HIDE_ALERT",
      });
    }, 3000);
  };

  const _uploadFile = (formData, fileName) => {
    dispatch({
      type: "UPLOAD_FILE_REQUEST",
    });
    const r = async () => {
      const response = await Api.post("/api/files", formData);
      dispatch({
        type: "UPLOAD_FILE_SUCCESS",
        payload: {
          fileId: response.data.data.file,
          fileName,
        },
      });
    };
    r().catch((err) => {
      dispatch({
        type: "UPLOAD_FILE_ERROR",
        payload: err.response.data.data.msg,
      });
    });
  };

  const _createLink = () => {
    const data = {
      name: state.fileId,
      originalName: state.fileName,
      downloads: state.downloads,
      author: state.author,
      password: state.password,
    };
    const r = async () => {
      const response = await Api.post("/api/links", data);
      dispatch({
        type: "CREATE_LINK_SUCCESS",
        payload: response.data.data.url,
      });
    };
    r().catch((err) => console.log(err));
  };

  return (
    <appContext.Provider
      value={{ ...state, _showAlert, _uploadFile, _createLink }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
