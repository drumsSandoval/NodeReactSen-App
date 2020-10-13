import React from "react";
import AuthState from "../context/auth/state";
import AppState from "../context/app/state";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthState>
      <AppState>
        <Component {...pageProps} />
      </AppState>
    </AuthState>
  );
};

export default MyApp;
