import { test, Browser, Page, expect } from '@playwright/test';
import * as os from 'os';  
import * as path from 'path';

(async () => {
    let browser: Browser;
    let page: Page;

    let textoAEscribir = 'Estoy aprendiendo Playwright 🚀';

    test.describe('Assertions/Validaciones en el Automation Sandbox', () => {
        // Assertions toBeChecked() y not.toBeChecked()
        test('Puedo seleccionar y deseleccionar un checkbox en el @Sandbox', async ({ page }) => {
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

        // toBeEditable(), toHaveValue()
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
        // page.$("css locator") y throw new Error()
        test('Los items del dropdown son los esperados', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {
                const deportes = ['Fútbol', 'Tennis', 'Basketball'];

                for (let opcion of deportes) {
                    //page.$() Deprecated reemplazar por page.locator()
                    // const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
                    const element = page.locator(`select#formBasicSelect > option:is(:text("${opcion}"))`);
                    if (element) {
                        console.log(`La opción '${opcion}' está presente.`);
                    } else {
                        throw new Error(`La opción '${opcion}' no está presente.`);
                    }
                }
            })
        })
        // $$eval() ó page.locator() con evaluateAll()
        test('Valido la columna Nombres de la @tabla estática', async ({ page }) => {
            await test.info().attach('screenshot', {
			    body: await page.screenshot(),
			    contentType: 'image/png',
		    })// esta no muestra nada
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
                // const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
               
                //page.$$eval() Deprecated reemplazar por page.locator() con evaluateAll()
               const valoresColumnaNombres = await page.locator('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)')
                .evaluateAll(elements => elements.map(element => element.textContent));
 
               const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];
               await test.info().attach('screenshot', {
			        body: await page.screenshot(),
			        contentType: 'image/png',
		       })// esta no muestra nada 
               expect(valoresColumnaNombres).toEqual(nombresEsperados);
            })

        })
        // $$eval() ó page.locator() con evaluateAll() con tabla dinámica
        test('Valido que todos los valores cambian en la @tabla dinámica luego de un reload', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
                //Creamos un arreglo con todos los valores de la tabla dinámica
                //const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                
                //page.$$eval() Deprecated reemplazar por page.locator() con evaluateAll()
                const valoresTablaDinamica = await page.locator('h2:has-text("Tabla dinámica") + table tbody tr td')
                    .evaluateAll(elements => elements.map(element => element.textContent));
                console.log(valoresTablaDinamica);

                //Hacemos una recarga para que cambien los valores
                await page.reload();

                //Creamos un segundo arreglo con los valores luego de la recarga
                // const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                const valoresPostReload = await page.locator('h2:has-text("Tabla dinámica") + table tbody tr td')
                    .evaluateAll(elements => elements.map(element => element.textContent));
                console.log(valoresPostReload);

                //Validamos que todos los valores cambiaron para cada celda.
                expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
            })
        })

        test('Ejemplo de Soft Assertions', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
                await expect.soft(page.getByText('Pizza 🍕'), 'El elemento pizza es visible 🍕').toBeVisible();
                await expect.soft(page.getByText('Hamburguesa 🍔'), 'El elemento Hamburguesa es visible 🍔').toBeVisible();
                await expect.soft(page.getByText('Pasta 🍝'), 'El elemento Pasta es visible 🍝').toBeVisible();
                await expect.soft(page.getByText('Helado 🍧'), 'El elemento Helado es visible 🍧').toBeVisible();
                await expect.soft(page.getByText('Torta 🍰'), 'El elemento Torta es visible 🍰').toBeVisible();
            })
        })
        // Si el popup es un modal HTML dentro de la misma página
        test('Validando dentro de un @popup', async ({ page, browserName }) => {
            //test.skip(browserName === 'chromium', 'No soportado en Chromium');
            await test.step('Dado que navego al sandbox', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            /**
             Si el popup es un window real que abre una nueva pestaña o ventana:
             *  const popupPromise = page.waitForEvent('popup');
                await page.getByText('open the popup').click();
                const popup = await popupPromise;
                await popup.waitForLoadState();
                // validar o imprimir contenido del popup
                console.log(await popup.title());
             */

            await test.step('Cuando hago click en el botón popup', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })

            await test.step('Puedo validar un elemento dentro del popup', async () => {
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();
            })
        })
    })
})();