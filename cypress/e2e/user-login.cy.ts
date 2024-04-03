describe("Login Test", () => {
  it("TC2-1 Valid Email and Correct Password", () => {
    cy.visit("https://heathub.vercel.app/signin");
    cy.wait(1000);
    //Change to happy@gmail.com
    cy.get("input[type=email]").type("faijai@gmail.com");
    //Chgange to test1234
    cy.get("input[type=password]").type("fai1234567");
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("exist");
  });
  it("TC2-2 Email is empty", () => {
    cy.visit("https://heathub.vercel.app/signin");
    cy.wait(1000);
    cy.get("input[type=password]").type("test1234");
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("not.exist");
  });
  it("TC2-3 Password is empty", () => {
    cy.visit("https://heathub.vercel.app/signin");
    cy.wait(1000);
    cy.get("input[type=email]").type("happy@gmail.com");
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("not.exist");
  });
  it("TC2-4 Email is valid and does not exist in the system", () => {
    cy.visit("https://heathub.vercel.app/signin");
    cy.wait(1000);
    cy.get("input[type=email]").type("nothappy@gmail.com");
    cy.get("input[type=password]").type("test1234");
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("not.exist");
  });
  it("TC2-5 Email is invalid", () => {
    cy.visit("https://heathub.vercel.app/signin");
    cy.wait(1000);
    cy.get("input[type=email]").type("happygmail.com");
    cy.get("input[type=password]").type("test1234");
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("not.exist");
  });
  it("TC2-6 Password is incorrect compare with the database system", () => {
    cy.visit("https://heathub.vercel.app/signin");
    cy.wait(1000);
    cy.get("input[type=email]").type("happy@gmail.com");
    cy.get("input[type=password]").type("abcd1234");
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.contains("Welcome back").should("not.exist");
  });
});
