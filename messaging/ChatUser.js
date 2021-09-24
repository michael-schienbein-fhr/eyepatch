/** Functionality related to chatting. */

// Room is an abstraction of a chat channel
const Room = require('./Room');

/** ChatUser is a individual connection from client -> server to chat. */

class ChatUser {
  /** make chat: store connection-device, rooom */

  constructor(send, roomId) {
    this._send = send; // "send" function for this user
    this.room = Room.get(roomId); // room user will be in
    this.username = null; // becomes the username of the visitor

    console.log(`created chat in room: ${this.room.id}`);
  }

  /** send msgs to this client using underlying connection-send-function */

  send(data) {
    try {
      this._send(data);
    } catch {
      // If trying to send to a user fails, ignore it
    }
  }

  /** handle joining: add to room members, announce join */

  handleJoin(username) {
    this.username = username;
    this.room.join(this);
    this.room.broadcast({
      type: 'note',
      text: `${this.username} joined "${this.room.id}".`
    });
  }

  /** handle a chat: broadcast to room. */

  handleChat(text) {
    this.room.broadcast({
      username: this.username,
      type: 'chat',
      text: text
    });
  }

  handleVideoId(videoId) {
    // console.debug(videoId);
    this.videoId = videoId;
    // if(videoId.action ===)
    this.room.add(this);
    this.room.broadcast({
      type: 'videoId',
      text: `${this.videoId} added to queue in: "${this.room.id}".`
    });
  }

  handleTime(time) {
    this.room.broadcast({
      type: 'time',
      time: time
    });
  }
  /** Handle messages from client:
   *
   * - {type: "join", name: username} : join
   * - {type: "chat", text: msg }     : chat
   */

  handleMessage(jsonData) {
    let msg = JSON.parse(jsonData);
    if (msg.type === 'join') this.handleJoin(msg.username);
    else if (msg.type === 'chat') this.handleChat(msg.text);
    else if (msg.type === 'time') this.handleTime(msg.time);
    else if (msg.type === 'videoId') this.handleVideoId(msg.videoId);
    else throw new Error(`bad message: ${msg.type}`);
  }

  /** Connection was closed: leave room, announce exit to others */

  handleClose() {
    this.room.leave(this);
    this.room.broadcast({
      type: 'note',
      text: `${this.username} left ${this.room.id}.`
    });
  }
}

module.exports = ChatUser;
