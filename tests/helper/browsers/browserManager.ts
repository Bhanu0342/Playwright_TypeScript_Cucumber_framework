import { error } from "console";
import { chromium, firefox, LaunchOptions, webkit } from "playwright";

const options:LaunchOptions = {
    headless:false
};

export const invokeBrowser =() => {
    const browserType = process.env.BROWSER;
    switch (browserType) {
    case "chrome":
        return chromium.launch(options);
    case "firefox":
       return firefox.launch(options);
    case "webkit":
        return webkit.launch(options);    
    default:
        throw new Error("Invalid browser type");
 }
}