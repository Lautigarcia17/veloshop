import { ErrorMessages } from "../types/type/errorMessage";

export const ERROR_MESSAGES : ErrorMessages = {
    auth: {
      EMAIL_IN_USE: "The email is already in use",
      EMAIL_NOT_FOUND: "The email does not exist",
      INCORRECT_PASSWORD: "The password is incorrect",
      USER_NOT_FOUND: "User not found",
      LOGGED_OUT_SUCCESS: "Logged out successfully",
      LOGOUT_ERROR: "Error logging out",
      AUTH_CREATION_FAILED: "Failed to create user in authentication.",
      DB_SAVE_FAILED: "Failed to save user in database.",
      INVALID_CREDENTIALS: "Email or password is incorrect",
      USER_DATA_MISSING: 'User data is missing'
    },
    general: {
      TOKEN_EXPIRED: "Token expired",
      INVALID_TOKEN: "Invalid token",
      INTERNAL_SERVER_ERROR: "Internal server error",
      NO_TOKEN_PROVIDED: "No token provided",
      AUTHORIZATION_DENIED: "No token, authorization denied",
      SET_CUSTOM_CLAIMS_FAILED: "Error setting user custom claims",
      LOGOUT_ERROR: "Error logging out"
    }
  };