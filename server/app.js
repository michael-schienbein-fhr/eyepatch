/** app for groupchat */

const express = require('express');
const app = express();
// const path = require("path");

//Serve frontend files
// app.use(express.static(path.join(__dirname, "..", "client", "build"))); 


/** Handle websocket chat */

// allow for app.ws routes for websocket routes




/** Handle a persistent connection to /chat/[roomName]
 *
 * Note that this is only called *once* per client --- not every time
 * a particular websocket chat is sent.
 *
 * `ws` becomes the socket for the client; it is specific to that visitor.
 * The `ws.send` method is how we'll send messages back to that socket.
 */


/** serve homepage --- just static HTML
 *
 * Allow any roomName to come after homepage --- client JS will find the
 * roomname in the URL.
 *
 * */

// app.get('/', function (req, res, next) {
//   res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
// });

module.exports = app;
