// import { signIn } from "@/action/auth";
// import { describe, test, expect, vi } from "vitest";

// vi.mock("next/headers", () => ({
//   cookies: vi.fn().mockReturnValue({ set: vi.fn() }), // Mock cookies function to return an set mock function object
// }));

// describe("signIn function", () => {
//   // test("should return empty string when valid credentials are provided", async () => {
//   //   const formData: FormData = new FormData();
//   //   formData.append("email", "faija@gmail.com");
//   //   formData.append("password", "fai1234567");
//   //   const result = await signIn(formData);
//   //   expect(result).toBe("");
//   // });
//   // test("email is empty", async () => {
//   //   const formData: FormData = new FormData();
//   //   formData.append("email", "");
//   //   formData.append("password", "fai1234567");
//   //   const result = await signIn(formData);
//   //   expect(result).toBe("Invalid email or password");
//   // });
//   test("email is empty", async () => {
//     const formData: FormData = new FormData();
//     formData.append("email", null as any);
//     formData.append("password", "fai1234567");
//     const result = await signIn(formData);
//     // expect(result).toThrow(Error("Missing email or password"));
//     expect(result).toBe("Invalid email or password");
//   });
// });

import { signIn } from "@/action/auth";
import { describe, test, beforeEach, expect, vi } from "vitest";
import { auth } from "@/server/api/auth";

// Mock the entire auth module
vi.mock("@/server/api/auth", () => ({
  auth: {
    useKey: vi.fn().mockImplementation((email, mockEmail, mockPassword) => {
      if (
        mockEmail === process.env.EMAIL &&
        mockPassword === process.env.PASSWORD
      ) {
        return {
          userId: "123",
          key: "123",
        };
      } else {
        throw new Error("Invalid email or password");
      }
    }),
    adapter: {
      createSession: vi.fn(),
      createSessionCookie: vi.fn(),
      useKey: vi.fn(),
    },
    env: "DEV",
    middleware: vi.fn(),
    sessionCookie: {
      expires: false,
    },
    getUserAttributes: vi.fn(),
    createSession: vi.fn(),
    createSessionCookie: vi.fn(),
  },
}));

// Mock the cookies function from next/headers
vi.mock("next/headers", () => ({
  cookies: vi.fn().mockReturnValue({ set: vi.fn() }), // Mock cookies function to return an set mock function object
}));

describe("signIn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("TC2-1 Valid Email and Correct Password", async () => {
    const formData: FormData = new FormData();
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
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
    const email = process.env.EMAIL;
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
    const email = process.env.EMAIL2;
    const password = process.env.PASSWORD2;
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
    const email = process.env.INVALID_EMAIL;
    const password = process.env.PASSWORD;
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
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD2;

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
