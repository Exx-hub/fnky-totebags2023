import { RegisterValues } from "../types/interfaces";

const useRegisterValidate = async ({
  name,
  email,
  mobile,
  password,
  confirmPass,
}: RegisterValues) => {
  let errors = {} as RegisterValues;

  if (!name) {
    errors.name = "Name is required!";
  }

  if (!email) {
    errors.email = "Email Address is required.";
  } else if (!/\S+@\S+\.\S/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!mobile) {
    errors.mobile = "Mobile number is required!";
  } else if (!/^\d{4}-\d{3}-\d{4}$/.test(mobile)) {
    errors.mobile = "Please follow 13-digit format 09XX-XXX-XXXX";
  }

  if (!password) {
    errors.password = "Password is required!";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long!";
  }
  if (!confirmPass) {
    errors.confirmPass = "Need to confirm password!";
  } else if (password !== confirmPass) {
    errors.confirmPass = "Passwords do not match!";
  }

  return errors;
};

export default useRegisterValidate;
