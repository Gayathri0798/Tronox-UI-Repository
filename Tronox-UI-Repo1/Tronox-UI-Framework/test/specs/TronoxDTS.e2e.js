import BasePage from "../../common.js"
let dataset = await import('../Data/Tronox/Physicalinventory.json', { assert: { type: 'json' } });
let locators = await import('../pageobjects/elementIdentifiers/Tronox/physicalinventoryxpath.json', { assert: { type: 'json' } })
locators=locators.default;
dataset=dataset.default;

const Base = new BasePage();

//const fs = require('fs');
import fs from 'fs';
describe('SAP Furio app Automation', () => {
    let testResults = [];

    before(async () => {
        await browser.url('https://tronox.okta.com/');
        await browser.maximizeWindow();
    });

    after(async () => {
        // Save test results to a JSON file for Express API to read
        fs.writeFileSync('./testResults.json', JSON.stringify(testResults, null, 2));
    });

    const runTest = async (testName, testSteps) => {
        const result = {
            testName,
            status: 'failed', // Default to failed
            screenshots: []
        };

        try {
            // Helper function to take screenshots
            const takeScreenshot = async (stepName) => {
                const fileName = `screenshot_${testName}_${stepName}_${Date.now()}.png`;
                const filePath = `./screenshots/${fileName}`;
                await browser.saveScreenshot(filePath);
                result.screenshots.push(filePath);
            };

            if (!fs.existsSync('./screenshots')) {
                fs.mkdirSync('./screenshots');
            }

            await testSteps(takeScreenshot);

            result.status = 'passed'; // Mark as passed if no errors
        } catch (error) {
            console.error(`❌ Test Failed: ${testName} - ${error.message}`);
            await takeScreenshot('error'); // Capture failure screenshot
            result.status = 'failed';
        }

        testResults.push(result);
    };

    it('S4_DTS_PP_Manage Process Orders', async () => {
        await runTest('S4_DTS_PP_Manage Process Orders', async (takeScreenshot) => {
            await Base.waitForDisplayedAndSetValue($(locators.Usernameoktaxpath), dataset.logincred.username);
            await Base.waitForDisplayedAndSetValue($(locators.Passwordoktaxpath), dataset.logincred.password);
            await Base.waitForDisplayedAndClick($(locators.Submitbuttonxpath), dataset.logincred.submitbtn, 5000);
            await takeScreenshot('login_success');

            await Base.waitForDisplayedAndSetValue($(locators.Codepathxpath), dataset.logincred.code);
            await Base.waitForDisplayedAndClick($(locators.verifybuttonxpath), 5000);
            await browser.pause(10000);

            // Navigate and interact with the app
            const dashboard = $(locators.dashboardElement);
            await dashboard.scrollIntoView();
            await Base.waitForDisplayedAndClick(dashboard, 5000);
            await takeScreenshot('dashboard_clicked');

            const newwindow = await browser.getWindowHandles();
            await browser.switchToWindow(newwindow[1]);
            await browser.pause(10000);
            await takeScreenshot('new_window_opened');

            const COR2tile = $(locators.COR2tileselectionxpath);
            await COR2tile.scrollIntoView();
            await Base.waitForDisplayedAndClick(COR2tile, 5000);
            await takeScreenshot('COR2_tile_clicked');

            // Switch to iframe and perform actions
            const iframe3 = await browser.$(locators.iframexpath);
            await browser.switchToFrame(iframe3);
            await browser.pause(3000);
            await takeScreenshot('iframe_switched');

            await browser.keys('F4');
            await browser.pause(5000);
            await takeScreenshot('process_order_entered');

            await Base.waitForDisplayedAndClick($(locators.COR2clickon3tabxpath), 5000);
            await takeScreenshot('3rd_tab_clicked');

            await Base.waitForDisplayedAndSetValue($(locators.COR2enterplantnumber), dataset.COR2data.plantnumber);
            await takeScreenshot('plant_number_entered');

            await Base.waitForDisplayedAndSetValue($(locators.CORS2schedulefinishxpath), dataset.COR2data.scheduledate);
            await takeScreenshot('schedule_date_entered');

            await Base.waitForDisplayedAndClick($(locators.COR2findbtnxpath), 3000);
            await takeScreenshot('find_button_clicked');
        });
    });

    it('S4_DTS_PP_Change Process Order_COR2_Final delivery for month end', async () => {
        await runTest('S4_DTS_PP_Change Process Order_COR2_Final delivery for month end', async (takeScreenshot) => {
            await Base.waitForDisplayedAndSetValue($(locators.Usernameoktaxpath), dataset.logincred.username);
            await Base.waitForDisplayedAndSetValue($(locators.Passwordoktaxpath), dataset.logincred.password);
            await Base.waitForDisplayedAndClick($(locators.Submitbuttonxpath), dataset.logincred.submitbtn, 5000);
            await takeScreenshot('login_success');

            await Base.waitForDisplayedAndSetValue($(locators.Codepathxpath), dataset.logincred.code);
            await Base.waitForDisplayedAndClick($(locators.verifybuttonxpath), 5000);
            await browser.pause(10000);

            // Navigate and interact with the app
            const dashboard = $(locators.dashboardElement);
            await dashboard.scrollIntoView();
            await Base.waitForDisplayedAndClick(dashboard, 5000);
            await takeScreenshot('dashboard_clicked');

            const newwindow = await browser.getWindowHandles();
            await browser.switchToWindow(newwindow[1]);
            await browser.pause(10000);
            await takeScreenshot('new_window_opened');

            const COR2tile = $(locators.COR2tileselectionxpath);
            await COR2tile.scrollIntoView();
            await Base.waitForDisplayedAndClick(COR2tile, 5000);
            await takeScreenshot('COR2_tile_clicked');

            const iframe3 = await browser.$(locators.iframexpath);
            await browser.switchToFrame(iframe3);
            await takeScreenshot('iframe_switched');

            await Base.waitForDisplayedAndSetValue($(locators.COR2processorderxpath), dataset.COR2data.processorder);
            await browser.keys('Enter');
            await takeScreenshot('process_order_entered');

            await Base.waitForDisplayedAndClick($(locators.COR2clickongoodsdeliveryxpath), 5000);
            await takeScreenshot('goods_delivery_tab_clicked');

            await Base.waitForDisplayedAndClick($(locators.COR2finaldeliveryxpath), 5000);
            await takeScreenshot('final_delivery_checkbox_clicked');

            await Base.waitForDisplayedAndClick($(locators.COR2savebtnxpath), 5000);
            await takeScreenshot('save_button_clicked');
        });
    });
});
