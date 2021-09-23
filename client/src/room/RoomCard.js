import { Link } from "react-router-dom";
import RoomLoginForm from "./RoomLoginForm";


/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function RoomCard({ id, roomName, hasPass}) {
  // console.debug("CompanyCard", logoUrl);

  return (
    <div>
      {hasPass === true ?
        (<Link className="CompanyCard card"
        to={`/rooms/${id}/login`}>
          <div className="card-body">
            <h6 className="card-title">
              {roomName}

            </h6>
            <p><small>{roomName}{id}</small></p>
          </div>
        </Link>)
        :
        (<Link className="CompanyCard card" to={`/rooms/${id}`}>
          <div className="card-body">
            <h6 className="card-title">
              {roomName}

            </h6>
            <p><small>{roomName}{id}</small></p>
          </div>
        </Link>
        )}
    </div>
  );
}

export default RoomCard;

// {logoUrl && <img src={}
//                              alt={roomName}
//                              className="float-right ml-5" />}