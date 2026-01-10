#!/usr/bin/env node

/**
 * Optimization Verification Script
 * Verifies that all optimizations are properly implemented
 */

const fs = require('fs');
const path = require('path');

function verifyOptimizations() {
  console.log('🔍 Verifying Portfolio Optimizations...\n');
  
  const checks = [
    verifyNextConfig,
    verifyManifest,
    verifyRobots,
    verifySitemap,
    verifyFavicons,
    verifySecurityHeaders,
    verifyPerformanceMonitoring,
    verifyBuildScripts,
  ];
  
  let passed = 0;
  let failed = 0;
  
  checks.forEach(check => {
    try {
      const result = check();
      if (result.success) {
        console.log(`✅ ${result.name}: ${result.message}`);
        passed++;
      } else {
        console.log(`❌ ${result.name}: ${result.message}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${check.name}: Error - ${error.message}`);
      failed++;
    }
  });
  
  console.log(`\n📊 Verification Summary:`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
  
  if (failed > 0) {
    console.log('\n⚠️  Some optimizations need attention. Check the failed items above.');
    process.exit(1);
  } else {
    console.log('\n🎉 All optimizations are properly implemented!');
  }
}

function verifyNextConfig() {
  const configPath = path.join(process.cwd(), 'next.config.ts');
  
  if (!fs.existsSync(configPath)) {
    return { name: 'Next.js Config', success: false, message: 'next.config.ts not found' };
  }
  
  const config = fs.readFileSync(configPath, 'utf8');
  
  const checks = [
    { pattern: /formats.*webp.*avif/, name: 'Image formats' },
    { pattern: /compress:\s*true/, name: 'Compression' },
    { pattern: /poweredByHeader:\s*false/, name: 'Security headers' },
    { pattern: /optimizePackageImports/, name: 'Package optimization' },
  ];
  
  const failedChecks = checks.filter(check => !check.pattern.test(config));
  
  if (failedChecks.length > 0) {
    return {
      name: 'Next.js Config',
      success: false,
      message: `Missing: ${failedChecks.map(c => c.name).join(', ')}`
    };
  }
  
  return { name: 'Next.js Config', success: true, message: 'All optimizations configured' };
}

function verifyManifest() {
  const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
  
  if (!fs.existsSync(manifestPath)) {
    return { name: 'PWA Manifest', success: false, message: 'manifest.json not found' };
  }
  
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    const requiredFields = ['name', 'short_name', 'start_url', 'display', 'theme_color', 'icons'];
    const missingFields = requiredFields.filter(field => !manifest[field]);
    
    if (missingFields.length > 0) {
      return {
        name: 'PWA Manifest',
        success: false,
        message: `Missing fields: ${missingFields.join(', ')}`
      };
    }
    
    return { name: 'PWA Manifest', success: true, message: 'Complete PWA configuration' };
  } catch (error) {
    return { name: 'PWA Manifest', success: false, message: 'Invalid JSON format' };
  }
}

function verifyRobots() {
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  
  if (!fs.existsSync(robotsPath)) {
    return { name: 'Robots.txt', success: false, message: 'robots.txt not found' };
  }
  
  const robots = fs.readFileSync(robotsPath, 'utf8');
  
  if (!robots.includes('Sitemap:')) {
    return { name: 'Robots.txt', success: false, message: 'Missing sitemap reference' };
  }
  
  return { name: 'Robots.txt', success: true, message: 'Properly configured' };
}

function verifySitemap() {
  const sitemapPath = path.join(process.cwd(), 'app', 'sitemap.ts');
  
  if (!fs.existsSync(sitemapPath)) {
    return { name: 'Sitemap', success: false, message: 'sitemap.ts not found' };
  }
  
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  
  if (!sitemap.includes('MetadataRoute.Sitemap')) {
    return { name: 'Sitemap', success: false, message: 'Invalid sitemap format' };
  }
  
  return { name: 'Sitemap', success: true, message: 'Dynamic sitemap configured' };
}

function verifyFavicons() {
  const faviconFiles = [
    'favicon.ico',
    'apple-touch-icon.png',
    'favicon-32x32.png',
    'favicon-16x16.png',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png'
  ];
  
  const publicDir = path.join(process.cwd(), 'public');
  const missingFiles = faviconFiles.filter(file => !fs.existsSync(path.join(publicDir, file)));
  
  if (missingFiles.length > 0) {
    return {
      name: 'Favicons',
      success: false,
      message: `Missing files: ${missingFiles.join(', ')}`
    };
  }
  
  return { name: 'Favicons', success: true, message: 'All favicon formats present' };
}

function verifySecurityHeaders() {
  const configPath = path.join(process.cwd(), 'next.config.ts');
  const config = fs.readFileSync(configPath, 'utf8');
  
  const securityHeaders = [
    'X-Frame-Options',
    'X-Content-Type-Options',
    'Referrer-Policy',
    'Permissions-Policy'
  ];
  
  const missingHeaders = securityHeaders.filter(header => !config.includes(header));
  
  if (missingHeaders.length > 0) {
    return {
      name: 'Security Headers',
      success: false,
      message: `Missing headers: ${missingHeaders.join(', ')}`
    };
  }
  
  return { name: 'Security Headers', success: true, message: 'All security headers configured' };
}

function verifyPerformanceMonitoring() {
  const performancePath = path.join(process.cwd(), 'lib', 'performance.ts');
  const monitorPath = path.join(process.cwd(), 'components', 'PerformanceMonitor.tsx');
  
  if (!fs.existsSync(performancePath)) {
    return { name: 'Performance Monitoring', success: false, message: 'performance.ts not found' };
  }
  
  if (!fs.existsSync(monitorPath)) {
    return { name: 'Performance Monitoring', success: false, message: 'PerformanceMonitor.tsx not found' };
  }
  
  const performance = fs.readFileSync(performancePath, 'utf8');
  
  if (!performance.includes('web-vitals')) {
    return { name: 'Performance Monitoring', success: false, message: 'Web Vitals not configured' };
  }
  
  return { name: 'Performance Monitoring', success: true, message: 'Complete monitoring setup' };
}

function verifyBuildScripts() {
  const packagePath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const requiredScripts = ['analyze', 'lighthouse', 'perf:audit'];
  const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
  
  if (missingScripts.length > 0) {
    return {
      name: 'Build Scripts',
      success: false,
      message: `Missing scripts: ${missingScripts.join(', ')}`
    };
  }
  
  return { name: 'Build Scripts', success: true, message: 'All performance scripts available' };
}

// Run verification
verifyOptimizations();