import { BeforeAll,AfterAll,Before,After,Status } from "@cucumber/cucumber";
import { Browser,BrowserContext } from '@playwright/test';
import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "../browsers/browserManager";
import { getEnv } from "../env/env";
import fs from "fs";
let browser : Browser;
let context : BrowserContext;
BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
    context = await browser.newContext({
        storageState: JSON.parse(fs.readFileSync('./tests/helper/auth/auth.json', 'utf8'))
    });
});

Before(async function (){
const page = await context.newPage();
pageFixture.page = page;

});
After(async function ({pickle, result}){
    let videoPath:string;
    let img:Buffer;
    let scenario = pickle.name; 
    if (result?.status == Status.FAILED){
         img =await pageFixture.page.screenshot({path:`./test-report/screenshots/${scenario}.png`,type:"png"});
        await this.attach(img, 'image/png');
    }
    
    await pageFixture.page.close();
    await context.close();   
    if (result?.status == Status.FAILED){
        videoPath = await pageFixture.page.video()?.path()??'';
        await this.attach(fs.readFileSync(videoPath), 'video/webm');
    }
});
AfterAll(async function () {
    await browser.close();   
});