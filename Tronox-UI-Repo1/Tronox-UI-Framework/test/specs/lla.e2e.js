//const assert = require('assert');
import assert from 'assert';
import BasePage from "../../common.js"
import fs from 'fs';
const logFilePath = './testStepsLog.txt';
fs.writeFileSync(logFilePath, "");
const Base = new BasePage();
describe('LLA whitelabel', () => {

  fs.writeFileSync(logFilePath, "", "utf8");

     //jeeva changes start
     let testResults = [];
     let screenshotData = [];
     let summary = { passed: 0, failed: 0 };
     var errorStep="";
     
     const takeScreenshot = async (stepName) => {
       errorStep = stepName;
       const fileName = `screenshot_${stepName}_${Date.now()}.png`;
       const filePath = `./screenshots/${fileName}`;
       screenshotData.push(filePath);
       console.log('stepName'+stepName);
       console.log('screenshot data length >> '+screenshotData.length);
       await browser.saveScreenshot(filePath);
       
   };
   const logStepToFile = (stepMessage) => {
       const timestamp = new Date().toISOString();
       fs.appendFileSync(logFilePath, `${timestamp} - ${stepMessage}\n`);
   };
   
   after(async () => {
     fs.writeFileSync('./testResults.json', JSON.stringify(testResults, null, 2));
   });
   
   const initTestcase = () => {
    fs.writeFileSync('./testResults.json', JSON.stringify([], null, 2));
    screenshotData=[];
    
   };
   
   const endTestcase = (data) => {
    testResults.push(data);
   }
   //jeeva changes ends  
    // before(async()=>{
       
    //     console.log(1);
    //     await browser.maximizeWindow();
    //     console.log(112);
    // })

  
    it('LLA whitelabel navigation', async () => {
   //jeeva changes start
   console.log(2);
         errorStep="";
         initTestcase();
         console.log(3);
         try {
         //jeeva changes end     
        // Step 1: Go to Google
         await browser.url('http://34.134.12.173/en/');
         await browser.maximizeWindow();
        await browser.pause(6000); // Optional: wait for page to load
        console.log(4);
        await takeScreenshot('LLA whitelabel home page loaded');
        console.log(5);
        // Accept cookies if present (Google may show a prompt)
         const homeliving = await $('/html/body/app-root/div[1]/app-main-menu/nav/div/ul/li[3]/a');
      //   if (await homeliving.isExisting()) {
             await homeliving.click();
             await browser.pause(4000);
             await takeScreenshot('Navigated to Home & Living page');
       //  }
       const dashboardElement = await $(`//*[@id="product_plp_3"]/cms-product-card-group/div/div[1]/app-plan-card/div/div/app-button/div/button`);

         await dashboardElement.scrollIntoView();
        // await Base.waitForDisplayedAndClick(dashboardElement, 5000);
         await browser.pause(1000);
         await takeScreenshot('Adding atmosphere drive to cart');
         await dashboardElement.click();
         await browser.pause(3000);

         const enteremail = await $('//*[@id="email"]');
        await Base.waitForDisplayedAndSetValue(enteremail, "admin@llawhitelabel.com");

        const entermobilenumber = await $('//*[@id="phone_number"]');
        await Base.waitForDisplayedAndSetValue(entermobilenumber, "9384612696");

        await browser.pause(1000);
        await takeScreenshot('Adding personal information');
        const submit1Element = await $('//*[@id="mat-mdc-dialog-0"]/div/div/mat-dialog-content/personal-detail-form/app-dynamic-flexi-form-page/div/div/div/app-dynamic-form/div/app-button/div/button');
        await submit1Element.click();
        await browser.pause(1000);
        await takeScreenshot('order summary page loaded');
        const submit2Element = await $('//*[@id="shopping_cart_1"]/div/div[2]/div[2]/cms-order-summary/app-order-summary/div/div[3]/app-button/div/button');
        await submit2Element.click();

        await browser.pause(2000);




        const title = await browser.getTitle();
        console.log('Navigated to:', title);
   //jeeva changes start
  const result = {
    Testname:'LLA white label',
    status: 'passed', // Default to failed
    screenshots: screenshotData,
    error: null
    };
    endTestcase(result);
    summary.passed++;
      
    }
    catch(error) {
      const result = {
        Testname:'LLA white label',
        status: 'failed', // Default to failed
        screenshots: screenshotData,
        error: error.message,
        errorstep:`Testcase failed at ${errorStep}`
        };
        logStepToFile(`Testcase failed at ${errorStep}`);
        endTestcase(result);
        summary.failed++;
    }
    //jeeva changes ends

    });
});
