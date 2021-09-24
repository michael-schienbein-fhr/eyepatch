import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class EyepatchApi {
  // the token for interactive with the API will be stored here.
  static userToken;
  static roomToken;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    const url = `${BASE_URL}/${endpoint}`;

    const headers = (EyepatchApi.roomToken === "undefined")
      ? { Authorization: `Bearer ${EyepatchApi.userToken}` }
      : { Authorization: `Bearer ${EyepatchApi.userToken},${EyepatchApi.roomToken}` };

    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token/user`, data, "post", "user");
    return res.userToken;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.userToken;
  }

  /** Get token for login from username, password. */

  static async joinRoom(data) {
    let res = await this.request(`auth/token/room`, data, "post");
    return res.roomToken;
  }

  /** Create new room. */

  static async createRoom(data) {
    let res = await this.request(`auth/create`, data, "post");
    return res.roomToken;
  };

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`, {}, "get");
    return res.user;
  }

  // /** Get get all rooms */

  static async getRooms() {
    let res = await this.request("rooms");
    return res.rooms;
  }
  // /** Get room by id */

  static async getRoom(id) {
    let res = await this.request(`rooms/${id}`, {}, "get");
    return res.room;
  }

  static async getPrivateRoom(id) {
    let res = await this.request(`rooms/private/${id}`, {}, "get");
    return res.room;
  }

  // /** Get newest room */

  static async getNewest() {
    let res = await this.request("rooms/newest");
    return res.room;
  }

  // /** Save user profile page. */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}


export default EyepatchApi;
