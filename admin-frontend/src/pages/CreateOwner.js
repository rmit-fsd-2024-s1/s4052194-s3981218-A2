import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getOwnerExists, createOwner } from "../data/repository";
import MessageContext from "../contexts/MessageContext";
import { trimFields } from "../utils";
import EmailValidator from "email-validator";

export default function CreateOwner() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    first_name: "",
    last_name: ""
  });
  const [errors, setErrors] = useState({ });
  const { setMessage } = useContext(MessageContext);

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form and if invalid do not contact API.
    const { trimmedFields, isValid } = await handleValidation();
    if(!isValid)
      return;

    // Create owner.
    const owner = await createOwner(trimmedFields);

    // Show success message.
    setMessage(<><strong>{owner.first_name} {owner.last_name}</strong> has been created successfully.</>);

    // Navigate to the owners page.
    navigate("/");
  };

  const handleValidation = async () => {
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

    key = "email";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Email is required.";
    else if(!EmailValidator.validate(field))
      currentErrors[key] = "Email is invalid.";
    else if(await getOwnerExists(field))
      currentErrors[key] = "Email is already taken.";

    setErrors(currentErrors);
    console.log(trimmedFields)
    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

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
                <input name="email" id="email" className="form-control"
                  value={fields.email} onChange={handleInputChange} />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>
            </div>
            
            <div className="col-12">
              <div className="form-group text-md-right">
                <Link className="btn btn-secondary mr-5" to="/">Cancel</Link>
                <button type="submit" className="btn btn-success">Create</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
