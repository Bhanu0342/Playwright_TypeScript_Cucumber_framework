import { Locator, Page } from "playwright";
import { ByRoleOptions, Roles } from "../helper/types/types";
import { expect } from "playwright/test";
import { text } from "stream/consumers";


export const waitTime={
    veryLow:15*1000,
    low:30*1000,
    medium:60*1000,
    high:90*1000,
    veryHigh:120*1000   
}
export enum selectorType{
    Label,
    Text,
    AltText,
    Placeholder,
    Title,  
    Locator
}
export class BasePage {
 public readonly page:Page
    constructor(page:Page){
        this.page = page;
    }
   
    

    protected async reloadPage(){
        await this.page.reload();
    }
    protected async navigateTo(url:string): Promise<void>{
        await this.page.goto(url,{waitUntil:"load"});
    }
    protected async navigateBack(){
        await this.page.goBack({waitUntil:"load"});
    }
    protected async navigateForward(){
        await this.page.goForward({waitUntil:"load"});
    }   
    protected async closeBrowser(){
        await this.page.close();
    }
    protected async closeTab(){
        await this.page.close();
    }  
    protected async refreshPage(){
        await this.page.reload();
    }
    protected async getTitle(): Promise<string>{
        return await this.page.title();
    }
    protected async getCurrentUrl(): Promise<string>{
        return await this.page.url();
    }
    protected async findElementBy(type:selectorType,elementLocator:string): Promise<Locator>{
       let element :Locator;

       switch (type) {
            case selectorType.Label:
                element = this.page.getByLabel(elementLocator);
                break;
            case selectorType.Text:
                element = this.page.getByText(elementLocator);
                break;
            case selectorType.AltText:
                element = this.page.getByAltText(elementLocator);
                break;
            case selectorType.Placeholder:
                element = this.page.getByPlaceholder(elementLocator);
                break;
            case selectorType.Title:
                element = this.page.getByTitle(elementLocator);
                break;
            case selectorType.Locator:
                element = this.page.locator(elementLocator);
                break;
            default:
                throw new Error("Invalid selector type");
        }
        return element;
        } 

        protected async findElement(type:selectorType|Roles,elementLocator?:string|{},nth?:number): Promise<Locator>{
            let element :Locator;
            nth = nth??0;
            if (typeof(type) === "number" && typeof(elementLocator) === "string")
                element = (await this.findElementBy(type,elementLocator)).nth(nth);
            else if(typeof(type) === "string" && typeof(elementLocator) === "object")
                element = (await this.page.getByRole(type,elementLocator)).nth(nth);
            else throw new Error("Invalid selector type");
            return element;
        }

        protected async validatePresenceOfText(text:string){
            await expect(await this.findElementBy(selectorType.Text,text)).toBeVisible({timeout:waitTime.medium});
        }

        protected async waitForElement(elementLocator:string){
            await this.page.waitForSelector(elementLocator,{timeout:waitTime.medium});
        }

        protected async isElementEnabled(type:selectorType|Roles|Locator,elementLocator?:string|ByRoleOptions,nth?:number): Promise<boolean|undefined>{
            let element :Locator|undefined;
            nth = nth??0;
            if (typeof(type) === "string" || typeof(type) === "number")
                element = (await this.findElement(type,elementLocator,nth));
            else if(typeof(type) === "object")
                element = type;
            if(element){
                await element.waitFor({state:"visible"});
                return await (element).isEnabled({timeout:waitTime.medium});
            }
        }

        protected async isElementDisabled(type:selectorType|Roles|Locator,elementLocator?:string|ByRoleOptions,nth?:number): Promise<boolean|undefined>{
            let element :Locator|undefined;
            nth = nth??0;
            if (typeof(type) === "string" || typeof(type) === "number")
                element = (await this.findElement(type,elementLocator,nth));
            else if(typeof(type) === "object")
                element = type;
            if(element){
                await element.waitFor({state:"visible"});
                return await (element).isDisabled({timeout:waitTime.medium});
            }
        }

        protected async isElementChecked(type:selectorType|Roles|Locator,elementLocator?:string|ByRoleOptions,nth?:number): Promise<boolean|undefined>{
            let element :Locator|undefined;
            nth = nth??0;
            if (typeof(type) === "string" || typeof(type) === "number")
                element = (await this.findElement(type,elementLocator,nth));
            else if(typeof(type) === "object")
                element = type;
            if(element){
                await element.waitFor({state:"visible"});
                return await (element).isChecked({timeout:waitTime.medium});
            }
        }

        protected async isElementEditable(type:selectorType|Roles|Locator,elementLocator?:string|ByRoleOptions,nth?:number): Promise<boolean|undefined>{
            let element :Locator|undefined;
            nth = nth??0;
            if (typeof(type) === "string" || typeof(type) === "number")
                element = (await this.findElement(type,elementLocator,nth));
            else if(typeof(type) === "object")
                element = type;
            if(element){
                await element.waitFor({state:"visible"});
                return await (element).isEditable({timeout:waitTime.medium});
            }
        }

        protected async clickElement(type:selectorType|Roles|Locator,elementLocator?:string|ByRoleOptions,nth?:number): Promise<void>{
            let element :Locator|undefined;
            nth = nth??0;
            if (typeof(type) === "string" || typeof(type) === "number")
                element = (await this.findElement(type,elementLocator,nth));
            else if(typeof(type) === "object")
                element = type;
            if(element){
                await element.waitFor({state:"visible"});
                return await (element).click({timeout:waitTime.medium});
            }
        }

        protected async doubleClickElement(type:selectorType|Roles|Locator,elementLocator?:string|ByRoleOptions,nth?:number): Promise<void>{
            let element :Locator|undefined;
            nth = nth??0;
            if (typeof(type) === "string" || typeof(type) === "number")
                element = (await this.findElement(type,elementLocator,nth));
            else if(typeof(type) === "object")
                element = type;
            if(element){
                await element.waitFor({state:"visible"});
                return await (element).dblclick({timeout:waitTime.medium});
            }
        }

        

        protected async readElementText(type:selectorType|Roles|Locator,elementLocator?:string|ByRoleOptions,nth?:number): Promise<string|null|undefined>{
            let element :Locator|undefined;
            nth = nth??0;
            if (typeof(type) === "string" || typeof(type) === "number")
                element = (await this.findElement(type,elementLocator,nth));
            else if(typeof(type) === "object")
                element = type;
            if(element){
                await element.waitFor({state:"visible"});
                return await element.textContent({timeout:waitTime.medium});
            }
        }

        protected async hoverOverElement(type:selectorType|Roles|Locator,elementLocator?:string|ByRoleOptions,nth?:number): Promise<void>{
            let element :Locator|undefined;
            nth = nth??0;
            if (typeof(type) === "string" || typeof(type) === "number")
                element = (await this.findElement(type,elementLocator,nth));
            else if(typeof(type) === "object")
                element = type;
            if(element){
                await element.waitFor({state:"visible"});
                return await element.hover();
            }
        }

        protected async isElementVisible(type:selectorType|Roles|Locator,elementLocator?:string|ByRoleOptions,nth?:number): Promise<boolean|undefined>{
            let element :Locator|undefined;
            nth = nth??0;
            if (typeof(type) === "string" || typeof(type) === "number")
                element = (await this.findElement(type,elementLocator,nth));
            else if(typeof(type) === "object")
                element = type;
            if(element){
                await element.waitFor({state:"visible"});
                return await (element).isVisible({timeout:waitTime.medium});
            }
        }

        protected async selectDropDown(element:Locator,options:string|object|string[]):Promise<Array<string>>{
            return await element.selectOption(options);
        }

        protected async dragAndDropElement(source:string,destination:string):Promise<void>{
            await this.page.dragAndDrop(source,destination)
        }

        protected async writeText(type:selectorType|Roles|Locator,elementLocator?:string|ByRoleOptions, nthElement?:number,textToFill?:string): Promise<void>{
            textToFill = textToFill??''; 
            let nth:number=0;
            if (typeof(nthElement) === "number")
                nth = nthElement;
            else 
                textToFill = nthElement;
                let element :Locator|undefined;
            if (typeof(type) === "string" || typeof(type) === "number"){
                element = (await this.findElement(type,elementLocator));}
            else if(typeof(type) === "object" && typeof elementLocator == "string"){
                element = type;
                textToFill = elementLocator;}
            if(element && textToFill){
                await element.waitFor({state:"visible"});
                 await element.fill(textToFill);
            }
        }

        protected async pressKeys(type:selectorType|Roles|Locator,elementLocator?:string|ByRoleOptions,keyToPress?:string): Promise<void>{
            let element :Locator|undefined;
            keyToPress = keyToPress??'';
            if (typeof(type) === "string" || typeof(type) === "number")
                element = (await this.findElement(type,elementLocator));
            else if(typeof(type) === "object")
                element = type;
            if(element && keyToPress){
                await element.waitFor({state:"visible"});
                await element.press(keyToPress);
            }

        }

        protected async findElementCount(type:selectorType|Roles,elementLocator?:string|ByRoleOptions){    
            return(await this.findElement(type,elementLocator)).count();
        }

        protected async innerText(element:Locator):Promise<string>{
            return await element.innerText();
        }

        protected async innerHTML(element:Locator):Promise<string>{
            return await element.innerHTML();
        }
}