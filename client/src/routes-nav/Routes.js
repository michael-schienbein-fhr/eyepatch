// import {useContext} from "react";
import './Routes.css';
import { useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import Rooms from "../room/Rooms";
import Room from "../room/Room";
import PrivateRoute from "./PrivateRoute";
import CreateRoomForm from "../room/CreateRoomForm";
import RoomLoginForm from "../room/RoomLoginForm";
import PrivateRoomRoute from "./PrivateRoomRoute";
import PrivateUserRoute from "./PrivateUserRoute";
import UserContext from "../auth/UserContext";
/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup, joinRoom, createRoom }) {
  // const { currentUser } = useContext(UserContext);
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
  );

  return (
    <div className="Routes pt-5 overflow-auto">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>
        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>
        <PrivateRoute exact path="/profile">
          <ProfileForm />
        </PrivateRoute>
        <PrivateRoute exact path="/rooms">
          <Rooms />
        </PrivateRoute>
        <PrivateRoute exact path="/rooms/create">
          <CreateRoomForm createRoom={createRoom} />
        </PrivateRoute>
        <PrivateRoute exact path="/rooms/:id">
          <Room />
        </PrivateRoute>
        <PrivateRoute exact path="/rooms/private/:id/login">
          <RoomLoginForm joinRoom={joinRoom} />
        </PrivateRoute>
        <PrivateRoomRoute exact path="/rooms/private/:id">
          <Room />
        </PrivateRoomRoute>

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
