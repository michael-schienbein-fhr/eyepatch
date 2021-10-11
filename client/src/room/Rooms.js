import './Rooms.css';
import { useState, useEffect } from "react";
import EyepatchApi from "../api/api";
import RoomCard from "./RoomCard";
import LoadingSpinner from "../common/LoadingSpinner";


const Rooms = ({ joinRoom }) => {
  console.debug("Rooms");

  const [rooms, setRooms] = useState(null);
  useEffect(function getRoomsOnMount() {
    console.debug("Rooms useEffect getRoomsOnMount");
    getRooms();
  }, []);

  /** Triggered by getRooms form submit; reloads rooms. */
  async function getRooms() {
    let rooms = await EyepatchApi.getRooms();
    setRooms(rooms);
  }

  if (!rooms) return <LoadingSpinner />;

  // console.log(rooms);
  return (
    <div className="Rooms container overflow-auto">
      {/* <button
          class="btn btn-md btn-outline-secondary mb-3"
          type="button"
          onClick={redirect}
        >Create New Room</button> */}
      {rooms.length
        ? (
          <div className="row overflow-auto">
            {rooms.map(c => (
              <RoomCard
                key={c.id}
                id={c.id}
                roomName={c.roomName}
                hasPass={c.hasPass}
                joinRoom={joinRoom}
              />
            ))}
          </div>
        ) : (
          <p className="lead">Sorry, no results were found!</p>
        )}
    </div>
  );
}

export default Rooms;

