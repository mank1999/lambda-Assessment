interface authRequest {
  email: string;
  password: string;
}

interface authSuccessResponse {
  success: boolean;
  token: string;
}

interface authErrorResponse {
  success: boolean;
  error: string;
}

type AuthResponse = authSuccessResponse | authErrorResponse;

export const handler = async (event: authRequest): Promise<AuthResponse> => {
  const { email, password } = event;

  const isValidEmail = email.includes("@");
  const isValidPassword = password.length >= 8;

  if (!isValidEmail || !isValidPassword) {
    return {
      success: false,
      error: "Invalid email or password",
    };
  }

  return {
    success: true,
    token: "Token123",
  };
};
