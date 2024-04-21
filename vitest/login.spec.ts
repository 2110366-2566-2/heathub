import { signIn } from "@/action/auth";
import { describe, test, beforeEach, expect, vi } from "vitest";
import { auth } from "@/server/api/auth";

vi.mock("@/server/api/auth", () => ({
  auth: {
    useKey: vi.fn().mockImplementation((email, mockEmail, mockPassword) => {
      if (mockEmail === "happy@gmail.com" && mockPassword === "test1234") {
        return {
          userId: "123",
          key: "123",
        };
      } else {
        throw new Error("Invalid email or password");
      }
    }),
    createSession: vi.fn(),
    createSessionCookie: vi.fn(),
  },
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn().mockReturnValue({ set: vi.fn() }),
}));

describe("signIn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("TC2-1 Valid Email and Correct Password", async () => {
    const formData: FormData = new FormData();
    const email = "happy@gmail.com";
    const password = "test1234";
    if (email) {
      formData.append("email", email);
    }
    if (password) {
      formData.append("password", password);
    }
    const result = await signIn(formData);

    expect(result).toBe("");
    expect(result).toBe("");
    expect(auth.useKey).toHaveBeenCalled();
    expect(auth.createSession).toHaveBeenCalledWith({
      userId: "123",
      attributes: {},
    });
    const session = await auth.createSession({ userId: "123", attributes: {} });

    expect(auth.createSessionCookie).toHaveBeenCalledWith(session);
  });

  test("TC2-2 Email is empty", async () => {
    const formData = new FormData();
    formData.append("password", "password123");
    const result = await signIn(formData);

    expect(result).toBe("Invalid email or password");
    expect(auth.useKey).not.toHaveBeenCalled();
    expect(auth.createSession).not.toHaveBeenCalled();
    expect(auth.createSessionCookie).not.toHaveBeenCalled();
  });

  test("TC2-3 Password is empty", async () => {
    const formData = new FormData();
    const email = "happy@gmail.com";
    if (email) {
      formData.append("email", email);
    }
    const result = await signIn(formData);

    expect(result).toBe("Invalid email or password");
    expect(auth.useKey).not.toHaveBeenCalled();
    expect(auth.createSession).not.toHaveBeenCalled();
    expect(auth.createSessionCookie).not.toHaveBeenCalled();
  });

  test("TC2-4 Email is valid and does not exist in the system", async () => {
    const formData = new FormData();
    const email = "nothappy@gmail.com";
    const password = "abcd1234";
    if (email) {
      formData.append("email", email);
    }
    if (password) {
      formData.append("password", password);
    }
    const result = await signIn(formData);

    expect(result).toBe("Invalid email or password");
    expect(auth.useKey).toHaveBeenCalled();
    expect(auth.createSession).not.toHaveBeenCalled();
    expect(auth.createSessionCookie).not.toHaveBeenCalled();
  });
  test("TC2-5 Email is invalid", async () => {
    const formData = new FormData();
    const email = "nothappyemail";
    const password = "test1234";
    if (email) {
      formData.append("email", email);
    }
    if (password) {
      formData.append("password", password);
    }

    const result = await signIn(formData);

    expect(result).toBe("Invalid email or password");
    expect(auth.useKey).toHaveBeenCalledWith("email", email, password);
    expect(auth.createSession).not.toHaveBeenCalled();
    expect(auth.createSessionCookie).not.toHaveBeenCalled();
  });

  test("TC2-6 Password is incorrect compare with the database system", async () => {
    const formData = new FormData();
    const email = "happy@gmail.com";
    const password = "abcd1234";

    if (email) {
      formData.append("email", email);
    }
    if (password) {
      formData.append("password", password);
    }

    const result = await signIn(formData);

    expect(result).toBe("Invalid email or password");
    expect(auth.useKey).toHaveBeenCalledWith("email", email, password);
    expect(auth.createSession).not.toHaveBeenCalled();
    expect(auth.createSessionCookie).not.toHaveBeenCalled();
  });
});
