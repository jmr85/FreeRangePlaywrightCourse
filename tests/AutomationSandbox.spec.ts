import { test, Browser, Page, expect } from '@playwright/test';
import { SandboxPage } from '../pages/SandboxPage';
import * as os from 'os';  
import * as path from 'path';

(async () => {
    let browser: Browser;
    let page: Page;

    let textoAEscribir = 'Estoy aprendiendo Playwright 🚀';

    test.describe('Acciones en el Automation Sandbox', () => {
        test('Click en Botón ID Dinámico', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
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
                await page.goto('');
            })
            await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
                await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir);
            })
        })

        test.only('Puedo seleccionar y deseleccionar un checkbox en el @Sandbox', async ({ page }) => {
            const sandboxPage = new SandboxPage(page);
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Puedo seleccionar el checkbox para Pasta', async () => {
                // await page.getByLabel('Pasta 🍝').check();
                await sandboxPage.checkPasta();
            })

            await test.step('Puedo deseleccionar el checkbox Pasta', async () => {
                // const sandboxPage = new SandboxPage(page);
                // await page.getByLabel('Pasta 🍝').uncheck();
                await sandboxPage.uncheckPasta();
            })
        })

        test('Puedo seleccionar Radio Buttons', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Puedo seleccionar el Radio Button para No', async () => {
                await page.getByLabel('No').check();
                //await page.getByLabel('No').uncheck(); -> DA ERROR, NO USAR (no se deselecciona en Radio Buttons)
            })
        })

        test('Puedo seleccionar un item del @Dropdown', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Seleccion un deporte del dropdown', async () => {
                await page.getByLabel('Dropdown').selectOption('Tennis');
            })
        })
        test('Puedo seleccionar un dia del @Dropdown Dias de la Semana', async ({ page }) => {
            test.info().annotations.push({
                type: 'User Story 131234',
                description: 'El usuario puede seleccionar un día del dropdown Días de Semana '
            });
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Selecciono un dia de la semana del dropdown', async () => {
                await page.getByRole( 'button', { name: 'Día de la semana'}).click();
                await page.getByRole('link', { name: 'Martes' }).click();
            })
        })
        test('Lleno un campo de texto en Automation Sandbox', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
                // await page.getByPlaceholder('Ingresá texto').type(textoAEscribir); 
                // type() esta deprecated usar en su lugar pressSequentially()
                await page.getByPlaceholder('Ingresá texto').pressSequentially(textoAEscribir);
                // Escribe de una letra lentamente
                await page.getByPlaceholder('Ingresá texto').pressSequentially(textoAEscribir, { delay: 100 });
                await page.getByPlaceholder('Ingresá texto').press('Shift+ArrowLeft');
            })
        })
        // Es solo ejemplo, no existe el elemento 'Upload file'. Va a explotar si se ejecuta
        test.skip('Puedo subir archivos a Automation Sandbox - NO IMPLEMENTADO EN PROD', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Agrego archivos para ser subidos', async () => {
                const filePath = path.join(os.homedir(), 'Downloads', 'Cupon_pago_2025-05-06.pdf');

                await page.getByLabel('Upload file').setInputFiles(filePath);
                // await page.getByLabel('Upload file').setInputFiles(['pathAlArchivo.pdf', 'Invoice1.pdf', 'Invoice2.pdf']);
                await page.getByLabel('Upload file').setInputFiles([]);// para remover todos los archivos seleccionados (vaciar la lista)
            })
        })

        // Es solo ejemplo, no existe el elemento 'DragFrom'. Va a explotar si se ejecuta
        test.skip('Puedo hacer un Drag and Drop de elementos en Automation Sandbox - NO IMPLEMENTADO EN PROD', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Selecciono un día de la semana del dropdown', async () => {
                await page.getByTestId('DragFrom').dragTo(page.getByTestId('DragTo'));
            })
        })
         // Es solo ejemplo, no existe el elemento 'Upload file'. Va a explotar si se ejecuta
        test.fixme('Puedo subir archivos a Automation Sandbox - NO IMPLEMENTADO EN PROD 2', async ({ page }) => {
            //test.fixme(); o desde caca dentro es lo mismo
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Agrego archivos para ser subidos', async () => {
                const filePath = path.join(os.homedir(), 'Downloads', 'Cupon_pago_2025-05-06.pdf');

                await page.getByLabel('Upload file').setInputFiles(filePath);
                // await page.getByLabel('Upload file').setInputFiles(['pathAlArchivo.pdf', 'Invoice1.pdf', 'Invoice2.pdf']);
                await page.getByLabel('Upload file').setInputFiles([]);// para remover todos los archivos seleccionados (vaciar la lista)
            })
        })

        // Es solo ejemplo, no existe el elemento 'DragFrom'. Va a explotar si se ejecuta
        test.fixme('Puedo hacer un Drag and Drop de elementos en Automation Sandbox - NO IMPLEMENTADO EN PROD 2', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Selecciono un día de la semana del dropdown', async () => {
                await page.getByTestId('DragFrom').dragTo(page.getByTestId('DragTo'));
            })
        })
        // fail()
        test('Lleno un campo de texto en Automation Sandbox 2 solo para probar annotation fail', async ({ page }) => {
            test.fail();
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
                // await page.getByPlaceholder('Ingresá texto').type(textoAEscribir); 
                // type() esta deprecated usar en su lugar pressSequentially()
                await page.getByPlaceholder('Ingresá texto').pressSequentially(textoAEscribir);
                // Escribe de una letra lentamente
                await page.getByPlaceholder('Ingresá texto').pressSequentially(textoAEscribir, { delay: 100 });
                await page.getByPlaceholder('Ingresá texto').press('Shift+ArrowLeft');
            })
        })
    })
})();