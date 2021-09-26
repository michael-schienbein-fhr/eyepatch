import { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { USER_TOKEN_STORAGE_ID } from "../App";
/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function PrivateRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);
  const [userToken, setUserToken] = useLocalStorage(USER_TOKEN_STORAGE_ID)

  useEffect(function(){

  })
  console.debug(
      "PrivateRoute",
      "exact=", exact,
      "path=", path,
      "currentUser=", currentUser,
      "userToken=", userToken
  );

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
      <Route exact={exact} path={path}>
        {children}
      </Route>
  );
}

export default PrivateRoute;
