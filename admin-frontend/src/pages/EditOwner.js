import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getOwner, updateOwner } from "../data/repository";
import MessageContext from "../contexts/MessageContext";
import { trimFields } from "../utils";

export default function EditOwner() {
  const navigate = useNavigate();
  const [fields, setFields] = useState(null);
  const [errors, setErrors] = useState({ });
  const { setMessage } = useContext(MessageContext);
  const { email } = useParams();

  // Load Owner.
  useEffect(() => {
    async function loadOwner() {
      const owner = await getOwner(email);

      setFields(owner);
    }
    loadOwner();
  }, [email]);

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form and if invalid do not contact API.
    const { trimmedFields, isValid } = handleValidation();
    if(!isValid)
      return;

    // Update owner.
    const owner = await updateOwner(trimmedFields);

    // Show success message.
    setMessage(<><strong>{owner.first_name} {owner.last_name}</strong> has been updated successfully.</>);

    // Navigate to the owners page.
    navigate("/");
  };

  const handleValidation = () => {
    const trimmedFields = trimFields(fields, setFields);
    const currentErrors = { };

    let key = "first_name";
    let field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "First name is required.";
    else if(field.length > 40)
      currentErrors[key] = "First name length cannot be greater than 40.";

    key = "last_name";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Last name is required.";
    else if(field.length > 40)
      currentErrors[key] = "Last name length cannot be greater than 40.";

    setErrors(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  if(fields === null)
    return null;

  return (
    <div className="row">
      <div className="col-12 col-md-9">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-3 text-primary">Personal Details</h4>

          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="first_name" className="control-label">First Name</label>
                <input name="first_name" id="first_name" className="form-control"
                  value={fields.first_name} onChange={handleInputChange} />
                {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="last_name" className="control-label">Last Name</label>
                <input name="last_name" id="last_name" className="form-control"
                  value={fields.last_name} onChange={handleInputChange} />
                {errors.last_name && <div className="text-danger">{errors.last_name}</div>}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="email" className="control-label">Email</label>
                <div>
                  <input name="email" id="email" readOnly className="form-control-plaintext font-weight-bold"
                    value={fields.email} />
                </div>
              </div>
            </div>
            
            <div className="col-12">
              <div className="form-group text-md-right">
                <Link className="btn btn-secondary mr-5" to="/">Cancel</Link>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
