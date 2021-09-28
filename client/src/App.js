import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import EyepatchApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";

// Key name for storing token in localStorage for "remember me" re-login
export const USER_TOKEN_STORAGE_ID = "eyepatch-user-token";
export const ROOM_TOKEN_STORAGE_ID = "eyepatch-room-token";
/** eyepatch application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [infoLoaded2, setInfoLoaded2] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [userToken, setUserToken] = useLocalStorage(USER_TOKEN_STORAGE_ID);
  const [roomToken, setRoomToken] = useLocalStorage(ROOM_TOKEN_STORAGE_ID);
  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "currentRoom=", currentRoom,
    "userToken=", userToken,
    "roomToken=", roomToken
  );

  // Load user info from API. Until a user is logged in and they have a user token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the user token is a dependency for this effect.


  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "userToken=", userToken);
    async function getCurrentUser() {
      if (userToken) {
        try {
          let { username } = jwt.decode(userToken);
          // put the token on the Api class so it can use it to call the API.
          EyepatchApi.userToken = userToken;
          let currentUser = await EyepatchApi.getCurrentUser(username);
          setCurrentUser(currentUser);

        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [userToken]);

  useEffect(function loadRoomInfo() {
    console.debug("App useEffect loadUserInfo", "roomToken=", roomToken);

    async function getRoomInfo() {
      if (roomToken) {
        try {
          let { id } = jwt.decode(roomToken);

          // put the token on the Api class so it can use it to call the API.
          EyepatchApi.roomToken = roomToken;
          let currentRoom = await EyepatchApi.getRoom(id);
          setCurrentRoom(currentRoom);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded2(true);
    }
    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded2(false);
    getRoomInfo();
  }, [roomToken]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setUserToken(null);
    setRoomToken(null);
  };

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
  async function signup(signupData) {
    try {
      let userToken = await EyepatchApi.signup(signupData);
      setUserToken(userToken);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let userToken = await EyepatchApi.login(loginData);
      setUserToken(userToken);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles joining rooms and related auth.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
  async function joinRoom(roomData) {
    try {
      let roomToken = await EyepatchApi.joinRoom(roomData);
      setRoomToken(roomToken);
      return { success: true };
    } catch (errors) {
      console.error("Failed to join room", errors);
      return { success: false, errors };
    }
  }

  /** Handles creating a new room
   *
   * Make sure you await this function and check its return value!
   */
  async function createRoom(roomData) {
    try {
      let roomToken = await EyepatchApi.createRoom(roomData);
      setRoomToken(roomToken)
      return { success: true, roomToken };
    } catch (errors) {
      console.error("Room creation failed", errors);
      return { success: false, errors };
    }
  }


  if (!infoLoaded || !infoLoaded2) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, currentRoom, setCurrentRoom }}>
        <div className="App">
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} createRoom={createRoom} joinRoom={joinRoom} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
