#!/usr/bin/env node

/**
 * Cross-Browser Testing Script
 * Tests the portfolio across different browsers and devices
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BROWSERS = [
  { name: 'Chrome', product: 'chrome' },
  { name: 'Firefox', product: 'firefox' },
];

const VIEWPORTS = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1920, height: 1080 },
];

const TEST_URLS = [
  { name: 'Homepage', path: '/' },
  { name: 'About Section', path: '/#about' },
  { name: 'Projects Section', path: '/#projects' },
  { name: 'Contact Section', path: '/#contact' },
];

async function runCrossBrowserTests() {
  const baseUrl = process.argv[2] || 'http://localhost:3000';
  const results = [];
  
  console.log(`🌐 Running cross-browser tests for: ${baseUrl}`);
  
  for (const browser of BROWSERS) {
    console.log(`\n🔍 Testing with ${browser.name}...`);
    
    let browserInstance;
    try {
      browserInstance = await puppeteer.launch({
        product: browser.product,
        headless: true,
        args: ['--no-sandbox', '--disable-dev-shm-usage']
      });
      
      for (const viewport of VIEWPORTS) {
        console.log(`  📱 Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
        
        const page = await browserInstance.newPage();
        await page.setViewport(viewport);
        
        for (const testUrl of TEST_URLS) {
          const url = `${baseUrl}${testUrl.path}`;
          const testResult = await testPage(page, url, testUrl.name, browser.name, viewport.name);
          results.push(testResult);
        }
        
        await page.close();
      }
    } catch (error) {
      console.error(`❌ Error testing ${browser.name}:`, error.message);
      results.push({
        browser: browser.name,
        viewport: 'All',
        url: 'All',
        success: false,
        error: error.message
      });
    } finally {
      if (browserInstance) {
        await browserInstance.close();
      }
    }
  }
  
  // Generate report
  generateTestReport(results);
}

async function testPage(page, url, pageName, browserName, viewportName) {
  const result = {
    browser: browserName,
    viewport: viewportName,
    page: pageName,
    url: url,
    success: false,
    loadTime: 0,
    errors: []
  };
  
  try {
    const startTime = Date.now();
    
    // Navigate to page
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    
    result.loadTime = Date.now() - startTime;
    
    // Check for JavaScript errors
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('requestfailed', request => errors.push(`Failed to load: ${request.url()}`));
    
    // Wait a bit for any async operations
    await page.waitForTimeout(2000);
    
    // Check if main content is visible
    const mainContent = await page.$('main');
    if (!mainContent) {
      errors.push('Main content not found');
    }
    
    // Check navigation
    const navigation = await page.$('nav');
    if (!navigation) {
      errors.push('Navigation not found');
    }
    
    // Take screenshot for visual verification
    const screenshotPath = path.join(
      process.cwd(), 
      'screenshots', 
      `${browserName}-${viewportName}-${pageName.replace(/\s+/g, '-')}.png`
    );
    
    // Ensure screenshots directory exists
    const screenshotsDir = path.dirname(screenshotPath);
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    await page.screenshot({ path: screenshotPath, fullPage: true });
    
    result.errors = errors;
    result.success = errors.length === 0;
    result.screenshot = screenshotPath;
    
  } catch (error) {
    result.errors.push(error.message);
    result.success = false;
  }
  
  return result;
}

function generateTestReport(results) {
  console.log('\n📊 Cross-Browser Test Results:');
  console.log('================================');
  
  const summary = {
    total: results.length,
    passed: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length
  };
  
  console.log(`Total Tests: ${summary.total}`);
  console.log(`Passed: ${summary.passed}`);
  console.log(`Failed: ${summary.failed}`);
  console.log(`Success Rate: ${Math.round((summary.passed / summary.total) * 100)}%`);
  
  // Show failed tests
  const failedTests = results.filter(r => !r.success);
  if (failedTests.length > 0) {
    console.log('\n❌ Failed Tests:');
    failedTests.forEach(test => {
      console.log(`  ${test.browser} - ${test.viewport} - ${test.page}`);
      test.errors.forEach(error => console.log(`    Error: ${error}`));
    });
  }
  
  // Show performance summary
  console.log('\n⚡ Performance Summary:');
  const avgLoadTime = results.reduce((sum, r) => sum + r.loadTime, 0) / results.length;
  console.log(`Average Load Time: ${Math.round(avgLoadTime)}ms`);
  
  // Save detailed report
  const reportPath = path.join(process.cwd(), 'cross-browser-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  
  if (failedTests.length > 0) {
    process.exit(1);
  }
}

// Run the tests
runCrossBrowserTests().catch(console.error);