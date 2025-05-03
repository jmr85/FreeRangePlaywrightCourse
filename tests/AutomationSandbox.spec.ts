import { test, Browser, Page, expect } from '@playwright/test';

(async () => {
    let browser: Browser;
    let page: Page;

    let textoAEscribir = 'Estoy aprendiendo Playwright 🚀';

    test.describe('Acciones en el Automation Sandbox', () => {
        test('Click en Botón ID Dinámico', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo hacer click en el botón con ID dinámico', async () => {
                const botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' });
                await botonIDDinamico.click({ force: true });
                await botonIDDinamico.dblclick();
                await botonIDDinamico.click({ button: 'right' });
                await botonIDDinamico.click({ modifiers:['Shift'] });
                await botonIDDinamico.hover();
            })
        })

        test('Lleno un campo de texto en Automation @Sandbox', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
                await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir);
            })
        })
    })
})();