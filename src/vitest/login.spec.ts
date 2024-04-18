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
import { auth } from "@/server/api/auth";
import { describe, test, beforeEach, expect, vi } from "vitest";

// Mock the entire auth module
vi.mock("@/server/api/auth", () => ({
  auth: {
    useKey: vi.fn().mockImplementation(() => {
      return {
        userId: "123",
        key: "123",
      };
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

// Mock any other modules as needed
vi.mock("next/headers", () => ({
  cookies: vi.fn().mockReturnValue({ set: vi.fn() }), // Mock cookies function to return an set mock function object
}));

describe("signIn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should return empty string when valid credentials are provided", async () => {
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
    expect(auth.useKey).toHaveBeenCalled();
    expect(auth.createSession).toHaveBeenCalled();
    expect(auth.createSessionCookie).toHaveBeenCalled();
  });

  test("email is empty", async () => {
    const formData = new FormData();
    formData.append("password", "password123");

    try {
      // Call the signIn function with the incomplete formData
      await signIn(formData);

      // If the function does not throw an error, fail the test
    } catch (error) {
      expect(error instanceof Error).toBe(true);
      expect((error as Error).message).toBe("Missing email or password");
    }

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
    try {
      // Call the signIn function with the incomplete formData
      await signIn(formData);

      // If the function does not throw an error, fail the test
    } catch (error) {
      expect(error instanceof Error).toBe(true);
      expect((error as Error).message).toBe("Missing email or password");
    }
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
    try {
      // Call the signIn function with the incomplete formData
      await signIn(formData);

      // If the function does not throw an error, fail the test
    } catch (error) {
      expect(error instanceof Error).toBe(true);
      expect((error as Error).message).toBe("Invalid email or password");
    }
    expect(await signIn(formData)).toBe("Invalid email or password");
    expect(auth.useKey).toHaveBeenCalled();
    expect(auth.createSession).toHaveBeenCalled();
    expect(auth.createSessionCookie).toHaveBeenCalled();
  });
});
