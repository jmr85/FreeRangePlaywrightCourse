import { type Locator, type Page } from '@playwright/test';

export class SandboxPage {
    readonly page: Page;
    readonly pastaCheckbox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pastaCheckbox = page.getByLabel('Pasta 🍝');
    }

    async checkPasta() {
        await this.pastaCheckbox.check();
    }

    async uncheckPasta() {
        await this.pastaCheckbox.uncheck();
    }

    //Las validaciones se hacen en el test, no dentro de la clase del modelo.
    //No usarlo aca
    // async verifyPastaChecked() {
    //     expect(this.pastaCheckbox).toBeChecked;
    // }
}