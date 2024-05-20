import { useState } from 'react';

export const useForm = (initialValues, validate) => {
  //store form values
  const [values, setValues] = useState(initialValues);
  //store form validation errors
  const [errors, setErrors] = useState({});

  //handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target; 
    setValues({
      ...values,
      [name]: value, // Update form values state
    });
  };

  //validate the form
  const validateForm = () => {
    const validationErrors = {};
    // loop over each field in the form values
    Object.keys(values).forEach((name) => {
      const error = validate(name, values[name], values); // Validate each field
      if (error) {
        validationErrors[name] = error; // If there's an error, add it to validationErrors
      }
    });
    setErrors(validationErrors); // Set the errors state
    return Object.keys(validationErrors).length === 0; // Return true if no validation errors, otherwise false
  };

  // Function to reset the form to its initial state
  const resetForm = () => {
    setValues(initialValues); // Reset form values to initial values
    setErrors({}); // Clear validation errors
  };

  
  return {
    values, 
    errors, 
    handleChange, 
    setErrors, 
    validateForm, 
    resetForm,
  };
};
