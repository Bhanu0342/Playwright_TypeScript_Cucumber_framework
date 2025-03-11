import { test,Page,expect } from '@playwright/test';
import { getEnv } from "../env/env";
import { chromium, firefox, webkit, LaunchOptions, Browser } from "playwright";
import fs from "fs"
const authfile = "tests/helper/auth/auth.json";


function getBrowserType(){
    getEnv();
    const browserType = process.env.BROWSER;
    switch (browserType) {
        case "chrome":
            return chromium.launch({channel:"chrome",headless:false,args:['--startMaximized']});
        case "firefox":
            return firefox.launch({channel:"firefox",headless:false,args:['--startMaximized']});
        case "webkit":
            return webkit.launch();    
        default:
            throw new Error("Invalid browser type");
    }
}

test('login to application', async () => {
    let browser:Browser = await getBrowserType();
    let context = await browser.newContext();
    let page = await context.newPage();
    if((fs.existsSync(authfile))){
        await fs.rmSync(authfile);
    }
        await login(page);
        await page.close();
        await context.close();
        await browser.close();
});
async function login(page:Page){
        await page.goto(process.env.BaseURL);
        await page.locator('#txt_name').fill(process.env.Email);
        await page.locator('#txt_pass').fill(process.env.Password);
        await page.locator('#btn_submit').click();
        await page.waitForLoadState();
        await page.waitForSelector('//div[text()="Widgets"]', {timeout: 60*1000,state:"visible"});
        await page.context().storageState({path:authfile});
}