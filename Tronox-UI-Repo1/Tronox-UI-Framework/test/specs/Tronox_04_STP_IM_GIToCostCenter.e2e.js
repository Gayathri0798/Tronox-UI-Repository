import BasePage from "../../common.js"
let dataset = await import('../Data/'+ global.wdioEnvParameters.config.appName +'/TronoxData.json', { assert: { type: 'json' } } );
let locators = await import('../pageobjects/elementIdentifiers/'+ global.wdioEnvParameters.config.appName +'/physicalinventoryxpath.json', { assert: { type: 'json' } })
locators=locators.default;
dataset=dataset.default;

const Base = new BasePage();
import fs from 'fs';
describe('SAP Furio app Automation', ()=>{
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
    before(async()=>{
        await browser.url(global.wdioEnvParameters.config.baseUrl);
        await browser.maximizeWindow();
    })

    it('S4_STP_IM_Goods Issue to Cost Center',async()=>{ 
        errorStep="";
        initTestcase();
      try {
        await Base.waitForDisplayedAndSetValue($(locators.Usernameoktaxpath), dataset.logincred.username);
        await Base.waitForDisplayedAndSetValue($(locators.Passwordoktaxpath), dataset.logincred.password);
        await Base.waitForDisplayedAndClick($(locators.Submitbuttonxpath), dataset.logincred.submitbtn, 5000);
        await takeScreenshot('login_success');
        await Base.waitForDisplayedAndSetValue($(locators.Codepathxpath), dataset.logincred.code); // OTP_____________________
        await Base.waitForDisplayedAndClick($(locators.verifybuttonxpath), 5000);
        await browser.pause(10000);
       
        // Launch Firio app launch
        const dashboard = $(locators.dashboardElement);
        await dashboard.scrollIntoView();
        await Base.waitForDisplayedAndClick(dashboard, 5000);
        await takeScreenshot('Dashboard');
        await browser.pause(5000);

  // window handle
  const newwindow = await browser.getWindowHandles();
  await browser.switchToWindow(newwindow[1]);
  await browser.pause(10000);

  // Select Goods Issue Tiles
  const selectPostIssueTiles = $("//*[@id='dashboardGroups']/div/child::div/descendant::ul/descendant::div[68]/child::div/div");
  await Base.waitForDisplayedAndClick(selectPostIssueTiles, 8000);
  await takeScreenshot('Goods_Issue_Tiles');
  await browser.pause(5000);

 // Switch to iframe
 const iframeGoodsIssue = await browser.$('//iframe[@id="application-Shell-startGUI"]');
 await Base.switchToIframe(iframeGoodsIssue);
 await browser.pause(5000);

  // click on DropDown 
  const clickDropdown  = $('//input[@id="M0:46:1:1::0:0"]');
  await Base.waitForDisplayedAndClick(clickDropdown,5000);
  await takeScreenshot('select_DropDown_Value');
 
  // Select Goods Issue From Dropdown
  const selectGoodsIssue  = $('//div[text()="Goods Issue"]');
  await Base.waitForDisplayedAndClick(selectGoodsIssue,5000);
  await takeScreenshot('Select_GoodsIssue');

 // click on DropDown 
 const selectDropdown  = $('//input[@id="M0:46:1:1::0:20"]');
 await Base.waitForDisplayedAndClick(selectDropdown,5000);

 // Select others From Dropdown
 const selectOther  = $('//div[text()="Other"]');
 await Base.waitForDisplayedAndClick(selectOther,5000);
 await takeScreenshot('Select_Other');

 // Click on where Tab To see the details
 const clickWhereTab = $('//div[@id="M0:46:1:4:1:1::0:2-title"]');
 await Base.waitForDisplayedAndClick(clickWhereTab);
 await takeScreenshot('click_tab');
 await browser.pause(5000);

 // Enter Movement Type
 const enterMovementType  = $('//input[@id="M0:46:1:4:1:1:29B263::0:22"]');
 await enterMovementType.clearValue();
 await Base.waitForDisplayedAndSetValue(enterMovementType, dataset.CC_MovementType);
 await browser.keys('Enter');
 await takeScreenshot('Movement_type');
 await browser.pause(5000);

 const enterPlantCode  = $('//input[@id="M0:46:1:4:1:1:29B263::2:22"]');
 await enterPlantCode.clearValue();
 await Base.waitForDisplayedAndSetValue(enterPlantCode, dataset.CC_Plant);
 await browser.keys('Enter');
 await takeScreenshot('Plant');
 await browser.pause(5000);

 const enterStorageLocation  = $('//input[@id="M0:46:1:4:1:1:29B263::3:22"]');
 await enterStorageLocation.clearValue();
 await Base.waitForDisplayedAndSetValue(enterStorageLocation, dataset.CC_StorageLocation);
 await browser.keys('Enter');
 await takeScreenshot('StorageLocation');
 await browser.pause(5000);

 // Click on account assignment Tab To see the details
 const clickOnAccountAssignmentTab = $('//div[@id="M0:46:1:4:1:1::0:10-title"]');
 await Base.waitForDisplayedAndClick(clickOnAccountAssignmentTab);
 await takeScreenshot('Assignment_Tab');
 await browser.pause(5000);

 // Enter Cost Center
 const enterCostCenter  = $('//input[@id="M0:46:1:4:1:1:21B271:1::1:16"]');
 await enterCostCenter.clearValue();
 await Base.waitForDisplayedAndSetValue(enterCostCenter, dataset.CC_CostCenter);
 await browser.keys('Enter');
 await takeScreenshot('CostCenter');
 await browser.pause(5000);

 // Click on Material Tab To see the details
 const clickonMaterialTab = $('//div[@id="M0:46:1:4:1:1::0:0-title"]');
 await Base.waitForDisplayedAndClick(clickonMaterialTab);
 await takeScreenshot('Material_Tab');
 await browser.pause(5000);
 
 // Enter Material No
 const enterMaterialNo  = $('//input[@id="M0:46:1:4:1:1:31B261::0:21"]');
 await enterMaterialNo.clearValue();
 await Base.waitForDisplayedAndSetValue(enterMaterialNo, dataset.CC_MaterialNo);
 await browser.keys('Enter');
 await takeScreenshot('MaterialNo');
 await browser.pause(5000);

  // Click on Quantity Tab To see the details
  const clickonQuantityTab = $('//div[@id="M0:46:1:4:1:1::0:1-title"]');
  await Base.waitForDisplayedAndClick(clickonQuantityTab);
  await takeScreenshot('QuantityTab');
  await browser.pause(5000);
 
  // Enter Material No
  const enterQuantityUnit  = $('//input[@id="M0:46:1:4:1:1:30B262::0:22"]');
  await enterQuantityUnit.clearValue();
  await Base.waitForDisplayedAndSetValue(enterQuantityUnit, dataset.CC_QuantityUnit);
  await browser.keys('Enter');
  await takeScreenshot('QuantityUnit');
  await browser.pause(5000);

  // Click on Batch Tab To see the details
  const clickonBatchTab = $('//div[@id="M0:46:1:4:1:1::0:7-title"]');
  await Base.waitForDisplayedAndClick(clickonBatchTab);
  await takeScreenshot('BatchTab');
  await browser.pause(5000);
 
  // Enter Material No
  const enterBatch  = $('//input[@id="M0:46:1:4:1:1:24B268::0:21"]');
  await enterBatch.clearValue();
  await Base.waitForDisplayedAndSetValue(enterBatch, dataset.CC_Batch);
  await browser.keys('Enter');
  await takeScreenshot('Batch');
  await browser.pause(5000);

 // Click on post button to create a Code Center
 const cc_PostBTN  = $('//div[@id="M0:50::btn[11]"]');
 await Base.waitForDisplayedAndClick(cc_PostBTN);
 await takeScreenshot('CC_PostBTN');
 await browser.pause(10000);

 // Document No for work Order
 const createGoodIssueForCoseCenter = await $("//div[@id='msgarea']/child::div[1]/div/descendant::span[3]").getText();
 const GoodsReceiptNoForCoseCenter = Number(createGoodIssueForCoseCenter.replace(/\D/g, ''));
 console.log("Work Order No:", GoodsReceiptNoForCoseCenter);
 await takeScreenshot('Work_OrderNo');

 const result = {
    Testname:'S4_STP_IM_Goods Issue to Cost Center',
    status: 'passed', // Default to failed
    screenshots: screenshotData,
    error: null
    };
    endTestcase(result);
    summary.passed++;
      
    }
    catch(error) {
      const result = {
        Testname:'S4_STP_IM_Goods Issue to Cost Center',
        status: 'failed', // Default to failed
        screenshots: screenshotData,
        error: error.message,
        errorstep:`Testcase failed at ${errorStep}`
        };
        endTestcase(result);
        summary.failed++;
    }


  });
});