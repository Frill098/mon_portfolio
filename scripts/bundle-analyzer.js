#!/usr/bin/env node

/**
 * Bundle Analyzer Script
 * Analyzes the Next.js bundle size and provides optimization recommendations
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function analyzeBundleSize() {
  console.log('📦 Analyzing bundle size...');
  
  try {
    // Build the project first
    console.log('Building project...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Check if .next directory exists
    const nextDir = path.join(process.cwd(), '.next');
    if (!fs.existsSync(nextDir)) {
      throw new Error('.next directory not found. Make sure the build completed successfully.');
    }
    
    // Analyze static files
    const staticDir = path.join(nextDir, 'static');
    if (fs.existsSync(staticDir)) {
      console.log('\n📊 Static Assets Analysis:');
      analyzeDirectory(staticDir, 'Static');
    }
    
    // Analyze server chunks
    const serverDir = path.join(nextDir, 'server');
    if (fs.existsSync(serverDir)) {
      console.log('\n🖥️  Server Chunks Analysis:');
      analyzeDirectory(serverDir, 'Server');
    }
    
    // Provide optimization recommendations
    console.log('\n💡 Optimization Recommendations:');
    console.log('1. Use next/image for all images to enable automatic optimization');
    console.log('2. Implement code splitting for large components');
    console.log('3. Use dynamic imports for components that are not immediately needed');
    console.log('4. Consider using a CDN for static assets');
    console.log('5. Enable compression in your hosting environment');
    
  } catch (error) {
    console.error('❌ Bundle analysis failed:', error.message);
    process.exit(1);
  }
}

function analyzeDirectory(dir, label) {
  const files = getAllFiles(dir);
  const fileSizes = files.map(file => {
    const stats = fs.statSync(file);
    return {
      path: path.relative(process.cwd(), file),
      size: stats.size,
      sizeKB: Math.round(stats.size / 1024 * 100) / 100
    };
  });
  
  // Sort by size (largest first)
  fileSizes.sort((a, b) => b.size - a.size);
  
  const totalSize = fileSizes.reduce((sum, file) => sum + file.size, 0);
  const totalSizeKB = Math.round(totalSize / 1024 * 100) / 100;
  
  console.log(`${label} Total Size: ${totalSizeKB} KB`);
  
  // Show top 10 largest files
  const topFiles = fileSizes.slice(0, 10);
  if (topFiles.length > 0) {
    console.log(`Top ${Math.min(10, topFiles.length)} largest files:`);
    topFiles.forEach((file, index) => {
      console.log(`  ${index + 1}. ${file.path} (${file.sizeKB} KB)`);
    });
  }
}

function getAllFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        traverse(fullPath);
      } else {
        files.push(fullPath);
      }
    });
  }
  
  traverse(dir);
  return files;
}

// Run the analysis
analyzeBundleSize();