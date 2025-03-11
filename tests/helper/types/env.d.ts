 export{};

 declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: "chrome" | "firefox" | "webkit";
            ENV: "local" | "dev" | "qa" | "prod";
            BaseURL: string;
            ACCESS_TOKEN: string;
            SESSION_ID: string;
            HEAD:true | false;
            Email: string;
            Password: string;
        }
    }
}