describe("app works correctly constructor", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" }).as(
      "ingredients"
    );

    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie("accessToken", "test-accessToken");

    cy.get("[data-cy-items]").children().first().as("bun");
    cy.get("[data-cy-items]").children().eq(2).as("sause");
    cy.get("[data-cy-items]").children().last().as("main");
  });

  it("should open main page, loaded ingredients", function () {
    cy.contains("Соберите бургер");
    cy.get("@ingredients");
  });

  it("user is authorized", function () {
    cy.getCookie("accessToken");
  });

  it("create order", function () {
    cy.get("[data-cy-orderSubmit]").click();
    cy.intercept("POST", "api/auth/login", { fixture: "userLogin.json" }).as(
      "userLogin"
    );
    cy.get("[name=email]").type(`dsgsdgsdgdsg@fgsdagdsgsdg.com`);
    cy.get("[name=password]").type(`1234567890`);

    cy.contains("Войти").click();

    cy.intercept("GET", "api/auth/user", { fixture: "user.json" }).as("user");

    cy.get("@bun").trigger("dragstart");
    cy.get("[data-cy-dropZone]").trigger("drop");
    cy.get("@sause").trigger("dragstart");
    cy.get("[data-cy-dropZone]").trigger("drop");
    cy.get("@main").trigger("dragstart");
    cy.get("[data-cy-dropZone]").trigger("drop");

    cy.get("[data-cy-orderSubmit]").click();

    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as(
      "postOrder"
    );
  });
});
