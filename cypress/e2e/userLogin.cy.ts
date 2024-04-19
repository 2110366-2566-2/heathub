import { type User } from "../support/types";
import { path } from "../support/utils";

describe("Login Test", () => {
  it("TC2-1 Valid Email and Correct Password", () => {
    cy.visit(path + "/signin");
    cy.wait(1000);
    cy.fixture("/login/valid").then((user: User) => {
      cy.get("input[type=email]").type(user.email);
      cy.get("input[type=password]").type(user.password);
    });
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("exist");
  });

  it("TC2-2 Email is empty", () => {
    cy.visit(path + "/signin");
    cy.wait(1000);
    cy.fixture("/login/valid").then((user: User) => {
      cy.get("input[type=password]").type(user.password);
    });
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("not.exist");
  });

  it("TC2-3 Password is empty", () => {
    cy.visit(path + "/signin");
    cy.wait(1000);
    cy.fixture("/login/valid").then((user: User) => {
      cy.get("input[type=email]").type(user.email);
    });
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("not.exist");
  });

  it("TC2-4 Email is valid and does not exist in the system", () => {
    cy.visit(path + "/signin");
    cy.wait(1000);
    cy.fixture("/login/notExist").then((user: User) => {
      cy.get("input[type=email]").type(user.email);
      cy.get("input[type=password]").type(user.password);
    });
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("not.exist");
  });

  it("TC2-5 Email is invalid", () => {
    cy.visit(path + "/signin");
    cy.wait(1000);
    cy.fixture("/login/invalid").then((user: User) => {
      cy.get("input[type=email]").type(user.email);
      cy.get("input[type=password]").type(user.password);
    });
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("not.exist");
  });

  it("TC2-6 Password is incorrect compare with the database system", () => {
    cy.visit(path + "/signin");
    cy.wait(1000);
    cy.fixture("/login/passwordIncorrect").then((user: User) => {
      cy.get("input[type=email]").type(user.email);
      cy.get("input[type=password]").type(user.password);
    });
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("not.exist");
  });
});
