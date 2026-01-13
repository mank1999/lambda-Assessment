
import { handler } from "../src/authentication/handler";

describe("auth lambda handler", () => {
  it("return valid success and token if email and pass valid", async () => {
    const response = await handler({
      email: "manish@gmail.com",
      password: "Manish12345",
    });

    expect(response).toEqual({
      success: true,
      token: "Token123",
    });
  });
  it("should return error if invalid email", async () => {
    const response = await handler({
      email: "manishgmail.com",
      password: "Manish12345",
    });

    expect(response).toEqual({
      success: false,
      error: "Invalid email or password",
    });
  });
  it("should return if invalid pass", async () => {
    const response = await handler({
      email: "manishgmail.com",
      password: "Manis",
    });

    expect(response).toEqual({
      success: false,
      error: "Invalid email or password",
    });
  });
});
