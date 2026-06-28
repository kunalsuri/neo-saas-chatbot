#!/usr/bin/env node

/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 * 
 * Sentry Integration Verification Script
 * Verifies that Sentry is properly configured and working
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 Verifying Sentry Integration...\n');

// Check if dependencies are installed
console.log('1. Checking dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const requiredDeps = ['@sentry/react', '@sentry/node'];
  const missingDeps = requiredDeps.filter(dep => !deps[dep]);
  
  if (missingDeps.length > 0) {
    console.log('❌ Missing dependencies:', missingDeps.join(', '));
    console.log('   Run: npm install @sentry/react @sentry/node');
    process.exit(1);
  }
  
  console.log('✅ All required dependencies installed');
} catch (error) {
  console.log('❌ Error checking dependencies:', error.message);
  process.exit(1);
}

// Check if configuration files exist
console.log('\n2. Checking configuration files...');
const configFiles = [
  'server/shared/config/sentry.ts',
  'client/src/lib/sentry.ts',
  'client/src/lib/errorReporting.ts'
];

for (const file of configFiles) {
  if (!fs.existsSync(file)) {
    console.log(`❌ Missing configuration file: ${file}`);
    process.exit(1);
  }
}
console.log('✅ All configuration files present');

// Check if environment variables are documented
console.log('\n3. Checking environment configuration...');
const envFiles = ['.env.production.example', '.env.development.example'];
let hasEnvConfig = false;

for (const envFile of envFiles) {
  if (fs.existsSync(envFile)) {
    const content = fs.readFileSync(envFile, 'utf8');
    if (content.includes('SENTRY_DSN') && content.includes('VITE_SENTRY_DSN')) {
      hasEnvConfig = true;
      break;
    }
  }
}

if (!hasEnvConfig) {
  console.log('❌ Environment configuration not found in example files');
  process.exit(1);
}
console.log('✅ Environment configuration documented');

// Test build
console.log('\n4. Testing build...');
try {
  execSync('npm run build', { stdio: 'pipe' });
  console.log('✅ Build successful');
} catch (error) {
  console.log('❌ Build failed');
  console.log('Error:', error.message);
  process.exit(1);
}

// Check if test panel exists
console.log('\n5. Checking development tools...');
const testPanelPath = 'client/src/features/settings/components/SentryTestPanel.tsx';
if (!fs.existsSync(testPanelPath)) {
  console.log('❌ Sentry test panel not found');
  process.exit(1);
}
console.log('✅ Development test panel available');

// Check documentation
console.log('\n6. Checking documentation...');
const docFiles = ['docs/ERROR_MONITORING.md', 'README_SENTRY_SETUP.md'];
for (const docFile of docFiles) {
  if (!fs.existsSync(docFile)) {
    console.log(`❌ Missing documentation: ${docFile}`);
    process.exit(1);
  }
}
console.log('✅ Documentation complete');

console.log('\n🎉 Sentry integration verification complete!');
console.log('\nNext steps:');
console.log('1. Configure your Sentry DSN: npm run setup:sentry');
console.log('2. Start development server: npm run dev');
console.log('3. Test integration: Settings > Developer > Sentry Test Panel');
console.log('4. Check your Sentry dashboard for events');