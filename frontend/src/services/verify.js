import bcrypt from "bcryptjs";

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i
    );
}

function validateEmailStorage(email) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.email === email);

  if (user) {
    return false;
  } else {
    return true;
  }
}

function validatePassword(password) {
  return (
    password.length >= 8 && //At least 8 or more characters
    /[A-Z]/.test(password) && // At least one uppercase letter
    /[a-z]/.test(password) && // At least one lowercase letter
    /[0-9]/.test(password) && // At least one digit
    /[^A-Za-z0-9]/.test(password)
  ); // At least one symbol
}

function verifySignIn(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.email === email);

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      return {
        name: user.name,
        email: user.email,
        password: user.password,
        dateJoined: user.dateJoined,
      };
    }
  }
  return null;
}

export { validateEmail, validateEmailStorage, validatePassword, verifySignIn };
