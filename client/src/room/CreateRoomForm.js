import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import UserContext from "../auth/UserContext";
import EyepatchApi from "../api/api";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function CreateRoomForm({ createRoom }) {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    room_owner: "",
    room_name: "",
    password: "",
  });
  const [newRoomId, setNewRoomId] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  useEffect(function updateRoomInfoOnMount() {

    async function getRoomId() {
      try {
        let newRoom = await EyepatchApi.getNewest();
        setNewRoomId(newRoom.id);
      } catch (err) {
        console.error("App getRoomId: problem loading", err);
      }

    }
    getRoomId();
    setFormData(d => ({ ...d, room_owner: currentUser.username }));
  }, []);
  
  // console.debug(
    //     "SignupForm",
    //     "signup=", typeof signup,
    //     "formData=", formData,
    //     "formErrors=", formErrors,
    // );
    
    /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */
  
  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await createRoom(formData);
    
    //fix redirect with results.id?
    if (result.success) {
      history.push(`/rooms/${newRoomId + 1}`);
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Create Room</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Room Name</label>
                <input
                  name="room_name"
                  className="form-control"
                  value={formData.room_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null
              }

              <button
                type="submit"
                className="btn btn-primary mt-3"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoomForm;