import { test, expect } from "@playwright/test";

test("sign-up successfully", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Nome do estabelecimento" })
    .fill("Pizza shop");

  await page.getByRole("textbox", { name: "Seu nome" }).fill("John doe");

  await page
    .getByRole("textbox", { name: "Seu e-mail" })
    .fill("pizzashop@test.com");

  await page.getByRole("textbox", { name: "Seu celular" }).fill("123213323123");

  await page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText("Restaurante cadastrado com sucesso!");

  await expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Login" }).click();

  const emailSignIn = page.getByRole("textbox", { name: "Seu e-mail" });

  expect(page.url()).toContain("/sign-in");
  expect(emailSignIn).toHaveValue("pizzashop@test.com");
});

test("sign-up with error", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Nome do estabelecimento" })
    .fill("Invalid name");

  await page.getByRole("textbox", { name: "Seu nome" }).fill("Invalid name");

  await page
    .getByRole("textbox", { name: "Seu e-mail" })
    .fill("invalid@test.com");

  await page.getByRole("textbox", { name: "Seu celular" }).fill("2313433123");

  await page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText("Erro ao cadastrar restaurante");

  await expect(toast).toBeVisible();
});

test("navigate to sign-in", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Fazer login" }).click();

  expect(page.url()).toContain("/sign-in");
});
