import { Given,When,Then, setDefaultTimeout } from '@cucumber/cucumber';
import { LoginPage } from '../pages/loginPage';
import { pageFixture } from '../helper/hooks/pageFixture';

let loginpage:LoginPage;
setDefaultTimeout(100 * 1000);
;

  When('I navigate to home page', async function () {
    loginpage = new LoginPage(pageFixture.page);
    await loginpage.navigateHomePage();
    
  });

