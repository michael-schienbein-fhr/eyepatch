/** Chat rooms that can be joined/left/broadcast to. */

// in-memory storage of roomIds -> room

const ROOMS = new Map();

/** Room is a collection of listening members; this becomes a "chat room"
 *   where individual users can join/leave/broadcast to.
 */

class Room {
  /** get room by that name, creating if nonexistent
   *
   * This uses a programming pattern often called a "registry" ---
   * users of this class only need to .get to find a room; they don't
   * need to know about the ROOMS variable that holds the rooms. To
   * them, the Room class manages all of this stuff for them.
   **/

  static get(roomId) {
    if (!ROOMS.has(roomId)) {
      ROOMS.set(roomId, new Room(roomId));
    }

    return ROOMS.get(roomId);
  }

  /** make a new room, starting with empty set of listeners */

  constructor(roomId) {
    this.id = roomId;
    this.members = new Set();
    this.videos = new Set();
  }

  /** member joining a room. */

  join(member) {
    this.members.add(member);
  }

  /** member leaving a room. */

  leave(member) {
    this.members.delete(member);
  }

  /** add video to queue. */

  add(video) {
    this.videos.add(video);
  }
  /** add video to queue. */

  remove(video) {
    this.videos.delete(video);
  }

  /** send message to all members in a room. */
  // exclude self
  broadcastExclusive(data) {
    console.debug(data);
    for (let member of this.members) {
      // console.debug(member.username);
      if (member.username !== data.username) {
        // console.debug(member.username);
        console.debug('sent to: ', member.username, data);
        member.send(JSON.stringify(data));
      }
    }
  }

  // /** send message to all members in a room. */

  broadcast(data) {
    console.debug(data);
    for (let member of this.members) {
      member.send(JSON.stringify(data));
    }
  }
}

module.exports = Room;
