interface authRequest {
  header?: {
    authorization?: string;
  };
}

interface authResponse {
  isAuthorized: Boolean;
  error?: string;
}

export const handler = async (event: authRequest): Promise<authResponse> => {
  try {
    const authHeader = event.header?.authorization;
    if (!authHeader) {
      return {
        isAuthorized: false,
      };
    }

    const token = authHeader.split(" ")[1];
    // here we can call verify method to check token valid or not
    if (token === "Token123") {
      return {
        isAuthorized: true,
      };
    } else {
      return {
        isAuthorized: false,
      };
    }
  } catch (error: any) {
    return {
      isAuthorized: false,
      error: error.message,
    };
  }
};
