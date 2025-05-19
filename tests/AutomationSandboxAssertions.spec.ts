import { test, Browser, Page, expect } from '@playwright/test';
import * as os from 'os';  
import * as path from 'path';

(async () => {
    let browser: Browser;
    let page: Page;

    let textoAEscribir = 'Estoy aprendiendo Playwright 🚀';

    test.describe('Assertions/Validaciones en el Automation @Sandbox', () => {
        // Assertions toBeChecked() y not.toBeChecked()
        test('Puedo seleccionar y deseleccionar un checkbox en el Sandbox', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Puedo seleccionar el checkbox para Pasta', async () => {
                await page.getByLabel('Pasta 🍝').check();
                await expect(page.getByLabel('Pasta 🍝'), 'El checkbox de Pasta esta seleccionado').toBeChecked()
            })

            await test.step('Puedo deseleccionar el checkbox Pasta', async () => {
                await page.getByLabel('Pasta 🍝').uncheck();
                await expect(page.getByLabel('Pasta 🍝')).not.toBeChecked()
            })
        })
        
        // toBeVisible()
        test('Click en Botón ID Dinámico', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo hacer click en el botón con ID dinámico', async () => {
                const botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' });
                await botonIDDinamico.click({ force: true });
                await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible();
            })
        })

        test('Lleno un campo de texto en Automation @Sandbox', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
                await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto admite edición').toBeEditable();
                await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir);
                await expect(page.getByPlaceholder('Ingresá texto'), `Se esperaba que el campo tuviera el valor "${textoAEscribir}"`).toHaveValue(textoAEscribir);
            })
        })
    })
})();