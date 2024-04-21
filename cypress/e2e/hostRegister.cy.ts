import {
  path,
  validImagePath,
  exceedFileSizeImagePath,
  notImageFileImagePath,
} from "../support/utils";

describe("Host Register", () => {
  beforeEach(() => {
    //Visit the page
    cy.visit(path + "/signup");
    cy.get("button", { timeout: 1000 }).contains("I'm a Host").click();
  });
  const HandlerEmailandPassword = (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    if (email !== "") {
      cy.get("input[name='Email']", { timeout: 1000 }).type(email);
    }
    if (password !== "") {
      cy.get("input[name='Password']").type(password);
    }
    if (confirmPassword !== "") {
      cy.get("input[name='Confirm Password']").type(confirmPassword);
    }
    cy.get("button").contains("Next").click();
  };
  const HandlerTellUsAboutYourself = (
    firstname: string,
    lastname: string,
    username: string,
    bio: string,
    date: string,
    gender: string,
    genderText: string,
    profileUrl: string,
  ) => {
    if (firstname !== "") {
      cy.get("input[name='Firstname']", { timeout: 1000 }).type(firstname);
    }
    if (lastname !== "") {
      cy.get("input[name='Lastname']").type(lastname);
    }
    if (username !== "") {
      cy.get("input[name='Username']").type(username);
    }
    if (bio !== "") {
      cy.get("textarea[name='Bio']").type(bio);
    }
    cy.get("button").contains("Pick a date").click();
    if (date !== "") {
      cy.get("button[name='day']").contains(date).click();
    }
    cy.contains("label", "Date of birth").click({ force: true });
    if (gender === "Custom" || gender !== "") {
      cy.get("button").contains(gender).click();
    }
    if (gender === "Custom" && genderText !== "") {
      cy.get("input[placeholder='Custom your gender']").type(genderText);
    }
    if (profileUrl !== "") {
      cy.get("input[type='file']").selectFile(profileUrl);
    }
    cy.get("button").contains("Next").click();
  };

  const HandlerInterests = (interests: string[]) => {
    if (interests.length === 0) {
      cy.get("button").contains("Create Account").click();
      return;
    }
    interests.forEach((interest) => {
      cy.get("button").contains(interest).click();
    });
    cy.get("button").contains("Create Account").click();
  };
  it(
    "TC1-1: Valid Register",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        `host${random}`,
        `host${random}`,
        `host${random}`,
        `host${random}`,
        "9",
        "Male",
        "",
        validImagePath,
      );
      HandlerInterests(["Basketball", "Football", "Camping"]);

      cy.contains("Get Started", { timeout: 10000 }).click();
      cy.url().should("eq", path + "/signin", { timeout: 1000 });
    },
  );

  it(
    "TC1-2: Bio is empty",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        `host${random}`,
        `host${random}`,
        `host${random}`,
        "",
        "9",
        "Male",
        "",
        validImagePath,
      );
      HandlerInterests(["Basketball", "Football", "Camping"]);

      cy.contains("Get Started", { timeout: 10000 }).click();
      cy.url().should("eq", path + "/signin", { timeout: 1000 });
    },
  );
  it(
    "TC1-3: Gender is Custom with not exceeds 32 characters",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        `host${random}`,
        `host${random}`,
        `host${random}`,
        "",
        "9",
        "Custom",
        "custom",
        validImagePath,
      );
      HandlerInterests(["Basketball", "Football", "Camping"]);

      cy.contains("Get Started", { timeout: 10000 }).click();
      cy.url().should("eq", path + "/signin", { timeout: 1000 });
    },
  );

  it(
    "TC1-4: Email is empty",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword("", "12345678", "12345678");

      cy.contains("Tell us about yourself").should("not.exist");
    },
  );

  it("TC1-5: Email already exists in the system", () => {
    const random = Math.floor(Math.random() * 1000000);
    HandlerEmailandPassword(`host@gmail.com`, "12345678", "12345678");

    cy.contains("Tell us about yourself").should("not.exist");
  });

  it(
    "TC1-6: Email is invalid",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(`hostAtgmail.com`, "12345678", "12345678");

      cy.contains("Tell us about yourself").should("not.exist");
    },
  );

  it(
    "TC1-7: Password is empty",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(`host${random}@gmail.com`, "", "12345678");

      cy.contains("Tell us about yourself").should("not.exist");
    },
  );

  it("TC1-8: Password does not exceeds 8 characters", () => {
    const random = Math.floor(Math.random() * 1000000);
    HandlerEmailandPassword(`host${random}@gmail.com`, "1234567", "1234567");

    cy.contains("Tell us about yourself").should("not.exist");
  });

  it(
    "TC1-9: Confirm password is empty",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(`host${random}@gmail.com`, "12345678", "");

      cy.contains("Tell us about yourself").should("not.exist");
    },
  );

  //TC1-10 : Confirm password does not match the filled password
  it(
    "TC1-10: Confirm password does not match the filled password",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "123456789",
      );

      cy.contains("Passwords do not match").should("exist");

      cy.contains("Tell us about yourself").should("not.exist");
    },
  );

  //TC1-11 : First name is empty
  it(
    "TC1-11: First name is empty",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        ``,
        `host${random}`,
        `host${random}`,
        `host${random}`,
        "9",
        "Male",
        "",
        validImagePath,
      );

      cy.contains("Please fill in your details.").should("exist");
      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  //TC1-12 : First name exceeds 64 characters
  it(
    "TC1-12: First name exceeds 64 characters",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        "a".repeat(100),
        `host${random}`,
        `host${random}`,
        `host${random}`,
        "9",
        "Male",
        "",
        validImagePath,
      );

      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  it(
    "TC1-13: Last name is empty",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        `host${random}`,
        ``,
        `host${random}`,
        `host${random}`,
        "9",
        "Male",
        "",
        validImagePath,
      );

      cy.contains("Please fill in your details.").should("exist");

      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  //TC1-14 : Last name exceeds 64 characters
  it(
    "TC1-14: Last name exceeds 64 characters",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        `host${random}`,
        `a`.repeat(100),
        `host${random}`,
        `host${random}`,
        "9",
        "Male",
        "",
        validImagePath,
      );

      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  it(
    "TC1-15: Username is empty",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        `host${random}`,
        `host${random}`,
        ``,
        `host${random}`,
        "9",
        "Male",
        "",
        validImagePath,
      );

      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  it(
    "TC1-16: Username is already existed in the system",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        `host${random}`,
        `host${random}`,
        `host`,
        `host${random}`,
        "9",
        "Male",
        "",
        validImagePath,
      );

      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  it(
    "TC1-17: Username exceeds 128 characters",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        `host${random}`,
        `host${random}`,
        `a`.repeat(140),
        `host${random}`,
        "9",
        "Male",
        "",
        validImagePath,
      );

      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  it(
    "TC1-18: Bio exceeds 256 characters",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        `host${random}`,
        `host${random}`,
        `host${random}`,
        `a`.repeat(300),
        "9",
        "Male",
        "",
        validImagePath,
      );

      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  it(
    "TC1-19: Date of birth is empty",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        `host${random}`,
        `host${random}`,
        `host${random}`,
        `host${random}`,
        "",
        "Male",
        "",
        validImagePath,
      );

      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  it(
    "TC1-20: Date of birth is later than the present",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );

      cy.get("input[name='Firstname']", { timeout: 1000 }).type(
        `host${random}`,
      );
      cy.get("input[name='Lastname']").type(`host${random}`);
      cy.get("input[name='Username']").type(`host${random}`);
      cy.get("textarea[name='Bio']").type(`host${random}`);
      cy.get("button").contains("Pick a date").click();
      cy.contains("button[name='day']", "27").should("be.disabled");
      cy.contains("label", "Date of birth").click({ force: true });
      cy.get("button").contains("Male").click();
      cy.get("input[type='file']").selectFile(validImagePath);
      cy.get("button").contains("Next").click();
      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  it(
    "TC1-21: Gender is not selected",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        `host${random}`,
        `host${random}`,
        `host${random}`,
        `host${random}`,
        "9",
        "",
        "",
        validImagePath,
      );

      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  it(
    "TC1-22: Gender is empty string when choose custom gender",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        `host${random}`,
        `host${random}`,
        `host${random}`,
        `host${random}`,
        "9",
        "Custom",
        "",
        validImagePath,
      );

      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  it(
    "TC1-23: Gender is Custom with exceeds 32 characters",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        `host${random}`,
        `host${random}`,
        `host${random}`,
        `host${random}`,
        "9",
        "Custom",
        "h".repeat(35),
        validImagePath,
      );

      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  it(
    "TC1-24: File is empty",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        `host${random}`,
        `host${random}`,
        `host${random}`,
        `host${random}`,
        "9",
        "Male",
        "",
        "",
      );

      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  it(
    "TC1-25: File size has exceeded the limit",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      cy.on("uncaught:exception", (err, runnable) => {
        return false;
      });
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      //Tell us about yourself
      cy.get("input[name='Firstname']", { timeout: 1000 }).type(
        `host${random}`,
      );
      cy.get("input[name='Lastname']").type(`host${random}`);
      cy.get("input[name='Username']").type(`host${random}`);
      cy.get("textarea[name='Bio']").type(`host${random}`);
      cy.get("button").contains("Pick a date").click();
      cy.get("button[name='day']").contains("2").click();
      cy.contains("label", "Date of birth").click({ force: true });
      cy.get("button").contains("Male").click();
      cy.get("input[type='file']").selectFile(exceedFileSizeImagePath);
      cy.contains("Can not upload file larger than 4MB.", {
        timeout: 5000,
      }).should("exist");
      cy.get("button").contains("Next").click();
      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  it(
    "TC1-26: File has not an image file extension",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      cy.on("uncaught:exception", (err, runnable) => {
        return false;
      });
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );

      cy.get("input[name='Firstname']", { timeout: 1000 }).type(
        `host${random}`,
      );
      cy.get("input[name='Lastname']").type(`host${random}`);
      cy.get("input[name='Username']").type(`host${random}`);
      cy.get("textarea[name='Bio']").type(`host${random}`);
      cy.get("button").contains("Pick a date").click();
      cy.get("button[name='day']").contains("2").click();
      cy.contains("label", "Date of birth").click({ force: true });
      cy.get("button").contains("Male").click();
      cy.get("input[type='file']").selectFile(notImageFileImagePath);
      cy.contains("Please upload JPG or PNG file.").should("exist", {
        timeout: 1000,
      });
      cy.get("button").contains("Next").click();
      cy.wait(1000);
      cy.contains("Interests").should("not.exist");
    },
  );

  it(
    "TC1-27: Interest is less than 3",
    {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    },
    () => {
      const random = Math.floor(Math.random() * 1000000);
      HandlerEmailandPassword(
        `host${random}@gmail.com`,
        "12345678",
        "12345678",
      );
      HandlerTellUsAboutYourself(
        `host${random}`,
        `host${random}`,
        `host${random}`,
        `host${random}`,
        "9",
        "Male",
        "",
        validImagePath,
      );

      //Interests
      cy.get("button").contains("Basketball").click();
      cy.get("button").contains("Football").click();
      cy.get("button").contains("Create Account").click();
      cy.contains("Get Started").should("not.exist");
    },
  );
});
