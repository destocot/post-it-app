export const validationCheck = async (signupData: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = signupData;
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

  if (!name) {
    return "Please enter a username.";
  }

  if (!email) {
    return "Please enter an email.";
  }

  if (!password) {
    return "Please enter a password.";
  }

  if (name.length < 3) {
    return "Please enter a username longer than 3 characters";
  }

  if (!usernameRegex.test(name)) {
    return "Please enter a valid username";
  }

  if (!emailRegex.test(email)) {
    return "Please enter a valid email";
  }

  if (password.length < 8) {
    return "Please enter a strong password.";
  }

  return null;
};
