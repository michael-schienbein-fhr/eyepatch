import { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { USER_TOKEN_STORAGE_ID } from "../App";
import { jwt } from 'jsonwebtoken';
import EyepatchApi from "../api/api";
import ProfileForm from "../profiles/ProfileForm";

/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function PrivateUserRoute({ exact, path, children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userToken, setUserToken] = useLocalStorage(USER_TOKEN_STORAGE_ID)
  
  useEffect(function loadUserInfo() {
    console.debug("Private useEffect loadUserInfo", "userToken=", userToken);
    async function getCurrentUser() {
      if (userToken) {
        try {
          let { username } = jwt.decode(userToken);
          // put the token on the Api class so it can use it to call the API.
          EyepatchApi.userToken = userToken;
          let currentUser = await EyepatchApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          console.debug(currentUser, 'private')
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      // setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    // setInfoLoaded(false);
    getCurrentUser();
  }, []);
  console.debug(
    "PrivateRoute",
    "exact=", exact,
    "path=", path,
    "currentUser=", currentUser,
    "userToken=", userToken
  );

  // if (!currentUser) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <Route exact={exact} path={path} >
      <ProfileForm currentUser={currentUser} />
    </Route>
  );
}

export default PrivateUserRoute;
