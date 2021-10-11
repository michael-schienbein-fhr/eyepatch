import './RoomCard.css';
import { Link } from "react-router-dom";


/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function RoomCard({ id, roomName, hasPass }) {


  return (
    <div className="RoomCard col-md-6 col-lg-4 mx-0 px-1 py-1">
      {hasPass === true ?
        (<Link className="RoomCard-link"
          to={`/rooms/private/${id}/login`}>
          <div className="card-body">
            <h5 className="card-title">
              Room Name: {roomName}
            </h5>
            <p><small>Room Id: {id}</small></p>
            <p><small>Password Protected: ✔️</small></p>
          </div>
        </Link>)
        :
        (<Link className="RoomCard-link" to={`/rooms/${id}`}>
          <div className="card-body">
            <h5 className="card-title">
              Room Name: {roomName}
            </h5>
            <p><small>Room Id: {id}</small></p>
            <p><small>Password Protected: ❌</small></p>
          </div>
        </Link>
        )}
    </div>
  );
}

export default RoomCard;

