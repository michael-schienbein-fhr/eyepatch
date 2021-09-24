import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SearchForm from "../common/SearchForm";
import EyepatchApi from "../api/api";
import RoomCard from "./RoomCard";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

const Rooms = ({ joinRoom }) => {
  console.debug("Rooms");

  const [rooms, setRooms] = useState(null);
  const history = useHistory();
  useEffect(function getRoomsOnMount() {
    console.debug("Rooms useEffect getRoomsOnMount");
    search();
  }, []);

  const redirect = () => {
    let path = `/rooms/create`;
    history.push(path);
  }
  /** Triggered by search form submit; reloads rooms. */
  async function search() {
    let rooms = await EyepatchApi.getRooms();
    setRooms(rooms);
  }

  if (!rooms) return <LoadingSpinner />;

  // console.log(rooms);
  return (
    <div className="Rooms col-md-8 offset-md-2">
      <button onClick={redirect}>Create New Room</button>
      {/* <SearchForm searchFor={search} /> */}
      {rooms.length
        ? (
          <div className="Rooms-list">
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

