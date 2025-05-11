import { test, Browser, Page, expect } from '@playwright/test';
import * as os from 'os';  
import * as path from 'path';

(async () => {
    let browser: Browser;
    let page: Page;

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
    })
})();