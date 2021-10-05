/** Functionality related to chatting. */

// Room is an abstraction of a chat channel
const Room = require('./Room');

/** ChatUser is a individual connection from client -> server to chat. */

class ChatUser {
  /** make chat: store connection-device, rooom */

  constructor(send, roomId) {
    this._send = send; // "send" function for this user
    this.username = null; // becomes the username of the visitor
    this.room = Room.get(roomId); // room user will be in
    this.queue = Array.from(this.room.getVideos());
    // console.debug(this.queue);
    console.log(`created chat in room: ${this.room.id}`);
  };

  /** send msgs to this client using underlying connection-send-function */

  send(data) {
    try {
      this._send(data);
    } catch {
      // If trying to send to a user fails, ignore it
    };
  };

  /** handle joining: add to room members, announce join */

  handleJoin(username) {
    this.username = username;
    this.room.join(this);
    // this.queue = this.room.getVideos()
    this.room.broadcast({
      type: 'note',
      text: `${this.username} joined "${this.room.id}".`,
      // queue: this.queue

    });
    for (let video of this.queue) {
      this.room.broadcastSelf({
        username: this.username,
        type: 'video',
        text: `"${video.title}" added to queue for user: "${this.username}".`,
        videoId: video.videoId,
        title: video.title,
        description: video.description,
        thumbnail: video.thumbnail
      });
    };
  };

  /** handle a chat: broadcast to room. */

  handleChat(text) {
    this.room.broadcast({
      username: this.username,
      type: 'chat',
      text: text
    });
  };

  handleVideo(video) {
    this.video = video;
    if (video.action === 'add') {
      this.room.add(this.video);
      this.room.broadcast({
        type: 'video',
        action: 'add',
        text: `"${this.video.title}" added to queue in room: "${this.room.id}".`,
        videoId: this.video.videoId,
        title: this.video.title,
        description: this.video.description,
        thumbnail: this.video.thumbnail
      });
    } else if (video.action === 'remove') {
      this.room.remove(this.video);
      this.room.broadcast({
        type: 'video',
        action: 'remove',
        text: `"${this.video.title}" removed from queue in room: "${this.room.id}".`,
        videoId: this.video.videoId,
        title: this.video.title,
        description: this.video.description,
        thumbnail: this.video.thumbnail
      });
    };
  };

  handleTime(time) {
    this.room.broadcastExclusive({
      username: this.username,
      type: 'time',
      time: time
    });
  };

  handlePlayerState(msg) {
  this.room.broadcastExclusive({
    username: this.username,
    type: 'playerState',
    state: msg.state,
    time: msg.time
  });
};

/** Handle messages from client:
 *
 * - {type: "join", name: username} : join
 * - {type: "chat", text: msg }     : chat
 */

handleMessage(jsonData) {
  let msg = JSON.parse(jsonData);
  if (msg.type === 'join') this.handleJoin(msg.username);
  else if (msg.type === 'chat') this.handleChat(msg.text);
  else if (msg.type === 'playerState') {
    this.handlePlayerState(msg);
  }
  else if (msg.type === 'video') this.handleVideo(msg);
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
