import { LoginValidateValues } from "../types/interfaces";

const loginValidate = async ({ email, password }: LoginValidateValues) => {
  let errors = {} as LoginValidateValues;

  if (!email) {
    errors.email = "Email Address is required.";
  } else if (!/\S+@\S+\.\S/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required!";
  } else if (password.length < 6) {
    errors.password = "Password needs to have at least 6 characters!";
  }

  return errors;
};

export default loginValidate;
