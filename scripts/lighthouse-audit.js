#!/usr/bin/env node

/**
 * Lighthouse Performance Audit Script
 * Run this script to perform automated Lighthouse audits
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

async function runLighthouseAudit() {
  const url = process.argv[2] || 'http://localhost:3000';
  
  console.log(`🚀 Running Lighthouse audit for: ${url}`);
  
  // Launch Chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
  });
  
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };
  
  try {
    // Run Lighthouse audit
    const runnerResult = await lighthouse(url, options);
    
    // Extract scores
    const { lhr } = runnerResult;
    const scores = {
      performance: Math.round(lhr.categories.performance.score * 100),
      accessibility: Math.round(lhr.categories.accessibility.score * 100),
      bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
      seo: Math.round(lhr.categories.seo.score * 100),
    };
    
    console.log('\n📊 Lighthouse Scores:');
    console.log(`Performance: ${scores.performance}/100`);
    console.log(`Accessibility: ${scores.accessibility}/100`);
    console.log(`Best Practices: ${scores.bestPractices}/100`);
    console.log(`SEO: ${scores.seo}/100`);
    
    // Save detailed report
    const reportPath = path.join(process.cwd(), 'lighthouse-report.html');
    fs.writeFileSync(reportPath, runnerResult.report);
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    
    // Check if scores meet minimum requirements
    const minScores = { performance: 90, accessibility: 95, bestPractices: 90, seo: 95 };
    const failedCategories = [];
    
    Object.entries(minScores).forEach(([category, minScore]) => {
      if (scores[category] < minScore) {
        failedCategories.push(`${category}: ${scores[category]} (min: ${minScore})`);
      }
    });
    
    if (failedCategories.length > 0) {
      console.log('\n❌ Some categories did not meet minimum requirements:');
      failedCategories.forEach(category => console.log(`  - ${category}`));
      process.exit(1);
    } else {
      console.log('\n✅ All categories meet minimum requirements!');
    }
    
  } catch (error) {
    console.error('❌ Lighthouse audit failed:', error);
    process.exit(1);
  } finally {
    await chrome.kill();
  }
}

// Run the audit
runLighthouseAudit().catch(console.error);