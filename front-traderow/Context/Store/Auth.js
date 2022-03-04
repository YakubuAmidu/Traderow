import React, { useState, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

import AutthReducer from "../Reducers/Autth.reducer";
import { setCurrentUser } from "../Actions/Auth.actions";
import AuthGlobal from "./AuthGlobal";

const Auth = (props) => {
  cosnt[(stateUser, dispatch)] = useReducer(AutthReducer, {
    isAuthenticated: null,
    user: {},
  });

  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
    if (AsyncStorage.jwt) {
      const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "";

      if (setShowChild) {
        dispatch(setCurrentUser(jwt_decode(decoded)));
      }
    }

    return () => showCchild(false);
  }, []);

  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider
        value={{
          showUser,
          dispatch,
        }}
      >
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};

export default Auth;
