import {
  path,
  validImagePath,
  exceedFileSizeImagePath,
  notImageFileImagePath,
} from "../support/utils";

describe("Host Register", () => {
  // it("TC1-1: Valid Register", () => {
  //   //Visit the page
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type(`host${random}`);
  //   cy.get("textarea[name='Bio']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("9").click();
  //   cy.get("button").contains("Male").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Interests
  //   cy.get("button").contains("Basketball").click();
  //   cy.get("button").contains("Football").click();
  //   cy.get("button").contains("Camping").click();
  //   cy.get("button").contains("Create Account").click();
  //   cy.wait(4000);

  //   cy.contains("Get Started").click();
  //   cy.wait(300);
  //   cy.url().should("eq", path + "/signin");
  // });

  // it("TC1-2: Bio is empty", () => {
  //   //Email and Password
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("9").click();
  //   cy.get("button").contains("Male").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Interests
  //   cy.get("button").contains("Basketball").click();
  //   cy.get("button").contains("Football").click();
  //   cy.get("button").contains("Camping").click();
  //   cy.get("button").contains("Create Account").click();
  //   cy.wait(4000);

  //   cy.contains("Get Started").click();
  //   cy.wait(300);
  //   cy.url().should("eq", path + "/signin");
  // });
  // it("TC1-3: Gender is Custom with not exceeds 32 characters", () => {
  //   //Email and Password
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type(`host${random}`);
  //   cy.get("textarea[name='Bio']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("9").click();
  //   cy.get("button").contains("Male").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Interests
  //   cy.get("button").contains("Basketball").click();
  //   cy.get("button").contains("Football").click();
  //   cy.get("button").contains("Camping").click();
  //   cy.get("button").contains("Create Account").click();
  //   cy.wait(4000);

  //   cy.contains("Get Started").click();
  //   cy.wait(300);
  //   cy.url().should("eq", path + "/signin");
  // });

  // it("TC1-4: Email is empty", () => {
  //   //Email and Password
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.contains("Tell us about yourself").should("not.exist");
  // });

  // it("TC1-5: Email already exists in the system", () => {
  //   //Email and Password
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   cy.get("input[name='Email']").type(`host@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);
  //   cy.contains("This Email is already exists.").should("exist");

  //   //Tell us about yourself
  //   cy.contains("Tell us about yourself").should("not.exist");
  // });

  // it("TC1-6: Email is invalid", () => {
  //   //Email and Password
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   cy.get("input[name='Email']").type(`hostAtgmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);
  //   cy.contains("Invalid email").should("exist");

  //   //Tell us about yourself
  //   cy.contains("Tell us about yourself").should("not.exist");
  // });

  // it("TC1-7: Password is empty", () => {
  //   //Email and Password
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.contains("Passwords do not match").should("exist");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.contains("Tell us about yourself").should("not.exist");
  // });

  // it("TC1-8: Password does not exceeds 8 characters", () => {
  //   //Email and Password
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("1234567");
  //   cy.get("input[name='Confirm Password']").type("1234567");
  //   cy.contains("The password must be at least 8 characters").should("exist");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.contains("Tell us about yourself").should("not.exist");
  // });

  // it("TC1-9: Confirm password is empty", () => {
  //   //Email and Password
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.contains("Passwords do not match").should("exist");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.contains("Tell us about yourself").should("not.exist");
  // });

  // //TC1-10 : Confirm password does not match the filled password
  // it("TC1-10: Confirm password does not match the filled password", () => {
  //   //Email and Password
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("123456789");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   cy.contains("Passwords do not match").should("exist");

  //   //Tell us about yourself
  //   cy.contains("Tell us about yourself").should("not.exist");
  // });

  // //TC1-11 : First name is empty
  // it("TC1-11: First name is empty", () => {
  //   //Email and Password
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("9").click();
  //   cy.get("button").contains("Male").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Interests
  //   cy.contains("Please fill in your details.").should("exist");
  //   cy.contains("Interests").should("not.exist");
  // });

  // //TC1-12 : First name exceeds 64 characters
  // it("TC1-12: First name exceeds 64 characters", () => {
  //   //Email and Password
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type("a".repeat(100));
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("9").click();
  //   cy.get("button").contains("Male").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   cy.contains("Interests").should("not.exist");
  // });

  // it("TC1-13: Last name is empty", () => {
  //   //Email and Password
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("9").click();
  //   cy.get("button").contains("Male").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   cy.contains("Please fill in your details.").should("exist");
  //   cy.contains("Interests").should("not.exist");
  // });

  // //TC1-14 : Last name exceeds 64 characters
  // it("TC1-14: Last name exceeds 64 characters", () => {
  //   //Email and Password
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Lastname']").type("a".repeat(100));
  //   cy.get("input[name='Username']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("9").click();
  //   cy.get("button").contains("Male").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   cy.contains("Interests").should("not.exist");
  // });

  // it("TC1-15: Username is empty", () => {
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("textarea[name='Bio']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("9").click();
  //   cy.get("button").contains("Male").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);
  //   cy.contains("Interests").should("not.exist");
  // });

  // it("TC1-16: Username is already existed in the system", () => {
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type("้host");
  //   cy.get("textarea[name='Bio']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("9").click();
  //   cy.get("button").contains("Male").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);
  //   cy.contains("Interests").should("not.exist");
  // });

  // it("TC1-17: Username exceeds 128 characters", () => {
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type("a".repeat(140));
  //   cy.get("textarea[name='Bio']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("9").click();
  //   cy.get("button").contains("Male").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);
  //   cy.contains("Interests").should("not.exist");
  // });

  // it("TC1-18: Bio exceeds 256 characters", () => {
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type(`host${random}`);
  //   cy.get("textarea[name='Bio']").type("a".repeat(299));
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("9").click();
  //   cy.get("button").contains("Male").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);
  //   cy.contains("Interests").should("not.exist");
  // });

  // it("TC1-19: Date of birth is empty", () => {
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type(`host${random}`);
  //   cy.get("textarea[name='Bio']").type(`host${random}`);
  //   cy.get("button").contains("Male").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);
  //   cy.contains("Interests").should("not.exist");
  // });

  // it("TC1-20: Date of birth is later than the present", () => {
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type(`host${random}`);
  //   cy.get("textarea[name='Bio']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").should("be.disabled");
  //   cy.get("button").contains("Male").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);
  //   cy.contains("Interests").should("not.exist");
  // });

  // it("TC1-21: Gender is not selected", () => {
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type(`host${random}`);
  //   cy.get("textarea[name='Bio']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("2").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);
  //   cy.contains("Interests").should("not.exist");
  // });

  // it("TC1-22: Gender is empty string when choose custom gender", () => {
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type(`host${random}`);
  //   cy.get("textarea[name='Bio']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("2").click();
  //   cy.get("button").contains("Male").click();
  //   cy.get("button").contains("Custom").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);
  //   cy.contains("Interests").should("not.exist");
  // });

  // it("TC1-23: Gender is Custom with exceeds 32 characters", () => {
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type(`host${random}`);
  //   cy.get("textarea[name='Bio']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("2").click();
  //   cy.get("button").contains("Male").click();
  //   cy.get("button").contains("Custom").click();
  //   cy.get("input[placeholder='Custom your gender']").type(
  //     "asdfjkl;asdfjkl;asdfjkl;asdfjklasdasd;",
  //   );
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);
  //   cy.contains("Interests").should("not.exist");
  // });

  // it("TC1-24: File is empty", () => {
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type(`host${random}`);
  //   cy.get("textarea[name='Bio']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("2").click();
  //   cy.get("button").contains("Male").click();
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);
  //   cy.contains("Interests").should("not.exist");
  // });

  it("TC1-25: File size has exceeded the limit", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit(path + "/signup");
    cy.wait(300);
    cy.get("button").contains("I'm a Host").click();
    cy.wait(300);

    //Email and Password
    const random = Math.floor(Math.random() * 1000000);
    cy.get("input[name='Email']").type(`host${random}@gmail.com`);
    cy.get("input[name='Password']").type("12345678");
    cy.get("input[name='Confirm Password']").type("12345678");
    cy.get("button").contains("Next").click();
    cy.wait(300);

    //Tell us about yourself
    cy.get("input[name='Firstname']").type(`host${random}`);
    cy.get("input[name='Lastname']").type(`host${random}`);
    cy.get("input[name='Username']").type(`host${random}`);
    cy.get("textarea[name='Bio']").type(`host${random}`);
    cy.get("button").contains("Pick a date").click();
    cy.get("button[name='day']").contains("2").click();
    cy.get("button").contains("Male").click();
    cy.get("input[type='file']").selectFile(exceedFileSizeImagePath);

    cy.wait(500);
    cy.get("button").contains("Next").click();
    cy.wait(500);

    cy.contains("Interests").should("not.exist");
  });

  it("TC1-26: File has not an image file extension", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit(path + "/signup");
    cy.wait(300);
    cy.get("button").contains("I'm a Host").click();
    cy.wait(300);

    //Email and Password
    const random = Math.floor(Math.random() * 1000000);
    cy.get("input[name='Email']").type(`host${random}@gmail.com`);
    cy.get("input[name='Password']").type("12345678");
    cy.get("input[name='Confirm Password']").type("12345678");
    cy.get("button").contains("Next").click();
    cy.wait(300);

    //Tell us about yourself
    cy.get("input[name='Firstname']").type(`host${random}`);
    cy.get("input[name='Lastname']").type(`host${random}`);
    cy.get("input[name='Username']").type(`host${random}`);
    cy.get("textarea[name='Bio']").type(`host${random}`);
    cy.get("button").contains("Pick a date").click();
    cy.get("button[name='day']").contains("2").click();
    cy.get("button").contains("Male").click();
    cy.get("input[type='file']").selectFile(notImageFileImagePath);

    cy.wait(500);

    cy.log("pass the exception");

    cy.get("button").contains("Next").click();
    cy.wait(300);
    cy.contains("Interests").should("not.exist");
  });

  // it("TC1-27: Interest is less than 3", () => {
  //   cy.visit(path + "/signup");
  //   cy.wait(300);
  //   cy.get("button").contains("I'm a Host").click();
  //   cy.wait(300);

  //   //Email and Password
  //   const random = Math.floor(Math.random() * 1000000);
  //   cy.get("input[name='Email']").type(`host${random}@gmail.com`);
  //   cy.get("input[name='Password']").type("12345678");
  //   cy.get("input[name='Confirm Password']").type("12345678");
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Tell us about yourself
  //   cy.get("input[name='Firstname']").type(`host${random}`);
  //   cy.get("input[name='Lastname']").type(`host${random}`);
  //   cy.get("input[name='Username']").type(`host${random}`);
  //   cy.get("textarea[name='Bio']").type(`host${random}`);
  //   cy.get("button").contains("Pick a date").click();
  //   cy.get("button[name='day']").contains("2").click();
  //   cy.get("button").contains("Male").click();
  //   cy.get("input[type='file']").selectFile(validImagePath);
  //   cy.wait(300);
  //   cy.get("button").contains("Next").click();
  //   cy.wait(300);

  //   //Interests
  //   cy.get("button").contains("Basketball").click();
  //   cy.get("button").contains("Football").click();
  //   cy.get("button").contains("Create Account").click();
  //   cy.wait(4000);
  //   cy.contains("Get Started").should("not.exist");
  // });
});
