import { user } from "@/server/db/schema";

describe("Login Test", () => {
  it("TC2-1 Valid Email and Correct Password", () => {
    cy.visit("https://heathub.vercel.app/signin");
    cy.wait(1000);
    cy.fixture("loginData").then((user) => {
      cy.get("input[type=email]").type(user.email);
      cy.get("input[type=password]").type(user.password);
    });
    cy.get("button[type=submit]").click();
    cy.wait(3000);
    cy.contains("Welcome back").should("exist");
  });
  it("TC2-2 Email is empty", () => {
    cy.visit("https://heathub.vercel.app/signin");
    cy.wait(1000);
    cy.fixture("loginData").then((user) => {
      cy.get("input[type=password]").type(user.password);
    });
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("not.exist");
  });
  it("TC2-3 Password is empty", () => {
    cy.visit("https://heathub.vercel.app/signin");
    cy.wait(1000);
    cy.fixture("loginData").then((user) => {
      cy.get("input[type=email]").type(user.email);
    });
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("not.exist");
  });
  it("TC2-4 Email is valid and does not exist in the system", () => {
    cy.visit("https://heathub.vercel.app/signin");
    cy.wait(1000);
    cy.fixture("loginData").then((user) => {
      cy.get("input[type=email]").type(user.email2);
      cy.get("input[type=password]").type(user.password);
    });
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("not.exist");
  });
  it("TC2-5 Email is invalid", () => {
    cy.visit("https://heathub.vercel.app/signin");
    cy.wait(1000);
    cy.fixture("loginData").then((user) => {
      cy.get("input[type=email]").type(user.invalid_email);
      cy.get("input[type=password]").type(user.password);
    });
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("not.exist");
  });
  it("TC2-6 Password is incorrect compare with the database system", () => {
    cy.visit("https://heathub.vercel.app/signin");
    cy.wait(1000);
    cy.fixture("loginData").then((user) => {
      cy.get("input[type=email]").type(user.invalid_email);
      cy.get("input[type=password]").type(user.password2);
    });
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("not.exist");
  });
});
