import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getOwners, deleteOwner } from "../data/repository";
import MessageContext from "../contexts/MessageContext";

export default function Owners() {
  const [owners, setOwners] = useState(null);
  const { message, setMessage } = useContext(MessageContext);

  // Load owners.
  useEffect(() => {
    loadOwners();
  }, []);

  const loadOwners = async () => {
    const currentOwners = await getOwners();

    setOwners(currentOwners);
  };

  const handleDelete = async (email) => {
    if(!window.confirm(`Are you sure you want to delete ${email} ?`))
      return;
    
    const isDeleted = await deleteOwner(email);

    if(isDeleted) {
      // Could remove the owner that was deleted or refresh the owners.
      // Here the owners are refreshed.
      await loadOwners();

      setMessage(<><strong>{email}</strong> has been deleted successfully.</>);
    }
  };

  if(owners === null)
    return null;

  return (
    <div>
      {message && <div className="alert alert-success" role="alert">{message}</div>}
      <h1 className="display-4">Owners</h1>
      <div className="mb-3">
        <Link to="/create">Create Owner</Link>
      </div>
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Pets</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {owners.map(owner =>
              <tr key={owner.email}>
                <td>{owner.email}</td>
                <td>{owner.first_name} {owner.last_name}</td>
                <td>
                  {owner.pets.length > 0 &&
                    <ul className="pl-0">
                      {owner.pets.map(pet =>
                        <li key={pet.pet_id}>{pet.name}</li>
                      )}
                    </ul>
                  }
                </td>
                <td>
                  <Link className="btn btn-primary" to={`/edit/${owner.email}`}>Edit Owner</Link>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(owner.email)}>Delete</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
