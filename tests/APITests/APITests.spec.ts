import { test, expect } from '@playwright/test';

const REPO = 'FreeRangePlaywrightCourse';
const USER = 'jmr85';

// export API_TOKEN=API_token_generado (Mac y Linux)
// $env:API_TOKEN="API_token_generado" (powershell)

test('Se puede crear un Issue en el repositorio de GitHub', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Bug] Reporte 2',
            body: 'Descripción del bug',
        }
    });
    // expect(newIssue.ok()).toBeTruthy();
    expect(newIssue.status()).toBe(201);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Bug] Reporte 2',
        body: 'Descripción del bug'
    }));
});

test('Puedo crear un feature request', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Request 2',
            body: 'Descripción del Feature',
        }
    });
    // expect(newIssue.ok()).toBeTruthy();
    expect(newIssue.status()).toBe(201);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Feature] Request 2',
        body: 'Descripción del Feature'
    }));
});