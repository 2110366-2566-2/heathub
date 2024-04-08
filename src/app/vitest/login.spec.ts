import { signIn } from "@/action/auth";
import { describe, test, expect, vi } from "vitest";

vi.mock("next/headers", () => ({
  cookies: vi.fn().mockReturnValue({ set: vi.fn() }), // Mock cookies function to return an set mock function object
}));

describe("signIn function", () => {
  test("should return empty string when valid credentials are provided", async () => {
    const formData: FormData = new FormData();
    formData.append("email", "faija@gmail.com");
    formData.append("password", "fai1234567");
    const result = await signIn(formData);
    expect(result).toBe("");
  });
  test("email is empty", async () => {
    const formData: FormData = new FormData();
    formData.append("email", "");
    formData.append("password", "fai1234567");
    const result = await signIn(formData);
    expect(result).toBe("Missing email or password");
  });
});
