import { type User } from "../support/types";
import { path } from "../support/utils";

describe(
  "Login Test",
  {
    retries: {
      runMode: 2,
      openMode: 2,
    },
  },
  () => {
    beforeEach(() => {
      cy.visit(path + "/signin");
    });
    it(
      "TC2-1 Valid Email and Correct Password",
      {
        retries: {
          runMode: 2,
          openMode: 2,
        },
      },
      () => {
        cy.fixture("/login/valid").then((user: User) => {
          cy.get("input[type=email]", { timeout: 1000 }).type(user.email);
          cy.get("input[type=password]").type(user.password);
        });
        cy.get("button[type=submit]").click();
        cy.contains("Welcome back").should("exist", { timeout: 1000 });
      },
    );

    it(
      "TC2-2 Email is empty",
      {
        retries: {
          runMode: 2,
          openMode: 2,
        },
      },
      () => {
        cy.fixture("/login/valid").then((user: User) => {
          cy.get("input[type=password]").type(user.password);
        });
        cy.get("button[type=submit]").click();
        cy.contains("Welcome back").should("not.exist", { timeout: 1000 });
      },
    );

    it(
      "TC2-3 Password is empty",
      {
        retries: {
          runMode: 2,
          openMode: 2,
        },
      },
      () => {
        cy.fixture("/login/valid").then((user: User) => {
          cy.get("input[type=email]", { timeout: 1000 }).type(user.email);
        });
        cy.get("button[type=submit]").click();
        cy.contains("Welcome back").should("not.exist", { timeout: 1000 });
      },
    );

    it(
      "TC2-4 Email is valid and does not exist in the system",
      {
        retries: {
          runMode: 2,
          openMode: 2,
        },
      },
      () => {
        cy.fixture("/login/notExist").then((user: User) => {
          cy.get("input[type=email]", { timeout: 1000 }).type(user.email);
          cy.get("input[type=password]").type(user.password);
        });
        cy.get("button[type=submit]").click();
        cy.contains("Welcome back").should("not.exist", { timeout: 1000 });
      },
    );

    it(
      "TC2-5 Email is invalid",
      {
        retries: {
          runMode: 2,
          openMode: 2,
        },
      },
      () => {
        cy.fixture("/login/invalid").then((user: User) => {
          cy.get("input[type=email]", { timeout: 1000 }).type(user.email);
          cy.get("input[type=password]").type(user.password);
        });
        cy.get("button[type=submit]").click();
        cy.contains("Welcome back").should("not.exist", { timeout: 1000 });
      },
    );

    it(
      "TC2-6 Password is incorrect compare with the database system",
      {
        retries: {
          runMode: 2,
          openMode: 2,
        },
      },
      () => {
        cy.fixture("/login/passwordIncorrect").then((user: User) => {
          cy.get("input[type=email]", { timeout: 1000 }).type(user.email);
          cy.get("input[type=password]").type(user.password);
        });
        cy.get("button[type=submit]").click();
        cy.contains("Welcome back").should("not.exist", { timeout: 1000 });
      },
    );
  },
);
