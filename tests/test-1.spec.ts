import { test, Browser, Page , expect } from '@playwright/test';


(async () => {
  let browser: Browser;
  let page: Page;

  test.describe('Navegacion en www.freerangetesters.com', () => {
    
    test('Los links principales redirigen correctamente', async ({page}) => {

      await test.step('Estando yo en la web principal www.freerangetesters.com', async () => {
        page.goto("https://www.freerangetesters.com/");
        await expect(page).toHaveTitle('Free Range Testers');
      })
      await test.step('Cuando hago click en "Cursos"', async () => {
        page.locator('#page_header').getByRole('link', {name: 'Cursos', exact: true}).click();
        await page.waitForURL('**/cursos');
      })

      await test.step('Soy redirigido a la sección de título "Cursos"', async () => {
        await expect(page).toHaveTitle('Cursos');
      })

    })
  })
})();