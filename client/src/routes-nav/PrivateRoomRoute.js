import React, { useContext } from "react";
import { Route, Redirect, useParams } from "react-router-dom";
import UserContext from "../auth/UserContext";
import useLocalStorage from "../hooks/useLocalStorage";
/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function PrivateRoomRoute({ exact, path, children }) {
  const { currentRoom } = useContext(UserContext);
  // const { id } = useParams();
  console.debug(
    "PrivateRoomRoute",
    "exact=", exact,
    "path=", path,
    "currentRoom=", currentRoom,
    
    );
    

  if (!currentRoom) {
    return <Redirect from="rooms/private/:id" to="/rooms/" />;
  }
  // if (!currentRoom) {
  //   return <Redirect from="rooms/private/:id" to="/rooms/private/:id/login" />;
  // }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoomRoute;
