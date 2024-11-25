export function validate(email: string, password: string) {
  const errors: {
    email?: string;
    password?: string;
  } = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!email.includes("@")) {
    errors.email = "Invalid email";
  }
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 5) {
    errors.password = "Password must be at least 5 characters.";
  }

  return Object.keys(errors)?.length ? errors : null;
}
