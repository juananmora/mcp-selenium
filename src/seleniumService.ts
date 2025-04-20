// src/seleniumService.ts
import { Builder, WebDriver, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import firefox from "selenium-webdriver/firefox";

export class SeleniumService {
  private driver: WebDriver | null = null;
  
  async startBrowser(browserName: string, options: any = {}) {
    if (this.driver) {
      await this.closeBrowser();
    }
    
    let builder = new Builder();
    
    if (browserName === "chrome") {
      const chromeOptions = new chrome.Options();
      if (options.headless) {
        chromeOptions.addArguments('--headless=new');
      }
      if (options.arguments && Array.isArray(options.arguments)) {
        options.arguments.forEach((arg: string) => chromeOptions.addArguments(arg));
      }
      builder = builder.forBrowser("chrome").setChromeOptions(chromeOptions);
    } else if (browserName === "firefox") {
      const firefoxOptions = new firefox.Options();
      if (options.headless) {
        firefoxOptions.addArguments('-headless');
      }
      builder = builder.forBrowser("firefox").setFirefoxOptions(firefoxOptions);
    } else {
      throw new Error(`Unsupported browser: ${browserName}`);
    }
    
    this.driver = await builder.build();
    return true;
  }
  
  async navigate(url: string) {
    if (!this.driver) {
      throw new Error("Browser not started");
    }
    await this.driver.get(url);
    return true;
  }
  
  async findElement(by: string, value: string, timeout: number = 10000) {
    if (!this.driver) {
      throw new Error("Browser not started");
    }
    
    const locator = this.getLocator(by, value);
    await this.driver.wait(until.elementLocated(locator), timeout);
    const element = await this.driver.findElement(locator);
    return element;
  }
  
  private getLocator(by: string, value: string) {
    switch (by.toLowerCase()) {
      case "id": return By.id(value);
      case "css": return By.css(value);
      case "xpath": return By.xpath(value);
      case "name": return By.name(value);
      case "tag": return By.tagName(value);
      case "class": return By.className(value);
      default: throw new Error(`Unsupported locator type: ${by}`);
    }
  }
  
  async clickElement(by: string, value: string, timeout: number = 10000) {
    const element = await this.findElement(by, value, timeout);
    await element.click();
    return true;
  }
  
  async sendKeys(by: string, value: string, text: string, timeout: number = 10000) {
    const element = await this.findElement(by, value, timeout);
    await element.sendKeys(text);
    return true;
  }
  
  async takeScreenshot(outputPath?: string) {
    if (!this.driver) {
      throw new Error("Browser not started");
    }
    
    const screenshot = await this.driver.takeScreenshot();
    if (outputPath) {
      // Save to file (implementation needed)
      return true;
    }
    return screenshot;
  }
  
  async closeBrowser() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
      return true;
    }
    return false;
  }
}

export const seleniumService = new SeleniumService();
