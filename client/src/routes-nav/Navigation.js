import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  const history = useHistory()
  console.debug("Navigation", "currentUser=", currentUser);
  
  const redirect = () => {
    let path = `/rooms/create`;
    history.push(path);
  }

  function loggedInNav() {
    return (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-2">
          <button
            class="btn btn-md btn-outline-secondary mx-0"
            type="button"
            onClick={redirect}
          >Create New Room</button>
        </li>
        <li className="nav-item me-2">
          <NavLink className="nav-link" to="/rooms">
            Rooms
          </NavLink>
        </li>
        <li className="nav-item me-2">
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav-item me-2">
          <Link className="nav-link" to="/" onClick={logout}>
            Log out {currentUser.first_name || currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-2">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item me-2">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navigation sticky-top navbar navbar-expand-md">
      <Link className="navbar-brand ms-1" to="/">
        Eyepatch
      </Link>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

export default Navigation;
