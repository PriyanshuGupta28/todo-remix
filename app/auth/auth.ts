import { createCookie } from "@remix-run/node";
import { User } from "~/models/user";

export const authCookie = createCookie("authCookie", {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  secrets: ["sdkandkannsdkansdk"], // Make sure to change this secret in production
  maxAge: 5 * 60 * 24 * 60 * 60, // 5 days
});

// Create user account and store password as plain text
export const createUserAccount = async (email: string, password: string) => {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already registered.");
    }

    const newUser = new User({
      email,
      password,
    });

    const savedUser = await newUser.save();

    return savedUser;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create user account.");
  }
};

// Login user and create a session (without password hashing)
export const loginUser = async (email: string, password: string) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    // Check if the entered password matches the stored plain text password
    if (user.password !== password) {
      throw new Error("Invalid email or password.");
    }

    // Create a session (using a cookie here)
    const session = await authCookie.serialize({ userId: user._id });
    return session; // Return the session cookie to be set in the response header
  } catch (error: any) {
    throw new Error(error.message || "Failed to log in.");
  }
};

// Fetch user details (excluding password)
export const findUserById = async (userId: string) => {
  return User.findById(userId).select("-password"); // Exclude password from the result
};
