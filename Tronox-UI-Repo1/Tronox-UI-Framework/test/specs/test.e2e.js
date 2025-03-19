 
// import BasePage from "../../common.js"
// const Base = new BasePage();
// let data = await import('../Data/Tronox/Physicalinventory.json', { assert: { type: 'json' } });
// describe('Create Salse Order', () => {
//   it('Should Create Salse Order', async () => {
 
//   await browser.url('https://tronox.okta.com/');
//   await browser.maximizeWindow();
//   const username = $('//input[@id="okta-signin-username"]');
//   const password = $('//input[@id="okta-signin-password"]');
//   const submitbtn = $('//input[@id="okta-signin-submit"]');
//   const code = $('//input[@name="answer"]');
//   const clickonverify = $('//input[@value="Verify"]');
//   const dashboardElement = await $("//section[@id='main-content']/child::section/section/descendant::section[37]");
//   const selectTiles = $('//*[@id="dashboardGroups"]/div/child::div/descendant::ul/descendant::div[114]/child::div/div')
 
//   await Base.waitForDisplayedAndSetValue(username, data.username);
//   await Base.waitForDisplayedAndSetValue(password, data.password);
//   await Base.waitForDisplayedAndClick(submitbtn, "Submit", 5000);
//   await Base.waitForDisplayedAndSetValue(code, data.otp);
//   await Base.waitForDisplayedAndClick(clickonverify, 5000);
//   await browser.pause(10000)
 
//   // Launch Firio app launch
//   await dashboardElement.scrollIntoView();
//   await Base.waitForDisplayedAndClick(dashboardElement, 5000);
 
//   // window handle
//   const newwindow = await browser.getWindowHandles();
//   await browser.switchToWindow(newwindow[1]);
//   await browser.pause(10000);
 
// // Tiles Selection
//   await Base.waitForDisplayedAndClick(selectTiles, 5000);
 
//     });
// });
 
describe('Flikart',async()=>{
    it('Flip kart OTP',async()=>{
        await browser.url("https://www.flipkart.com/");
        await browser.pause(3000)

    })
})