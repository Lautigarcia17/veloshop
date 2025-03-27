export type ErrorMessages = {
    auth: {
      EMAIL_IN_USE: string;
      EMAIL_NOT_FOUND: string;
      INCORRECT_PASSWORD: string;
      USER_NOT_FOUND: string;
      LOGGED_OUT_SUCCESS: string;
      LOGOUT_ERROR: string;
      AUTH_CREATION_FAILED: string;
      DB_SAVE_FAILED: string;
      INVALID_CREDENTIALS: string;
      USER_DATA_MISSING: string
    };
    general: {
      TOKEN_EXPIRED: string;
      INVALID_TOKEN: string;
      INTERNAL_SERVER_ERROR: string;
      NO_TOKEN_PROVIDED: string;
      AUTHORIZATION_DENIED: string;
      SET_CUSTOM_CLAIMS_FAILED: string;
      LOGOUT_ERROR:string
    };
  };