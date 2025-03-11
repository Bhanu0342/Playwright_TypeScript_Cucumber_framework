import { Page,expect } from "playwright/test";
import { BasePage, selectorType } from "./basePage";
import { pageFixture } from "../helper/hooks/pageFixture";


export class LoginPage extends BasePage{
    constructor(page:Page){
        super(page);
    }

    async navigateHomePage(){
        await this.navigateTo(process.env.BaseURL??'');
        await this.page.waitForLoadState();
        console.log("Navigated to home page");
        console.log(await this.readElementText(selectorType.Locator,"//div[text()='Widgets']"));
        
    }

}