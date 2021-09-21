const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT from user data. */

function createUserToken(user) {
  console.assert(user.isAdmin !== undefined,
      "createToken passed user without isAdmin property");

  let payload = {
    username: user.username,
    isAdmin: user.isAdmin || false,
  };

  return jwt.sign(payload, SECRET_KEY);
}

function createRoomToken(room) {
  console.assert(room.password !== undefined,
      "createRoomToken passed user without isAdmin property");
  const passFlag = room.password ? true : false;

  let payload = {
    id: room.id,
    roomOwner: room.roomOwner,
    roomName: room.roomName,
    passFlag 
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createUserToken, createRoomToken };
