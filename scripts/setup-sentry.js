#!/usr/bin/env node

/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 * 
 * Sentry Setup Script
 * This script helps configure Sentry for the SaaS AI ChatBot platform
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupSentry() {
  console.log('🚀 Setting up Sentry Error Monitoring for SaaS AI ChatBot\n');
  
  console.log('Before proceeding, make sure you have:');
  console.log('1. Created a Sentry account at https://sentry.io');
  console.log('2. Created a new project for your application');
  console.log('3. Have your DSN ready from the project settings\n');
  
  const proceed = await question('Do you want to continue? (y/N): ');
  if (proceed.toLowerCase() !== 'y' && proceed.toLowerCase() !== 'yes') {
    console.log('Setup cancelled.');
    rl.close();
    return;
  }
  
  console.log('\n📝 Please provide your Sentry configuration:\n');
  
  const dsn = await question('Enter your Sentry DSN: ');
  if (!dsn || !dsn.startsWith('https://')) {
    console.log('❌ Invalid DSN format. Please provide a valid Sentry DSN.');
    rl.close();
    return;
  }
  
  const environment = await question('Environment (development/production) [development]: ') || 'development';
  
  // Read existing .env file or create new one
  const envPath = path.join(process.cwd(), '.env');
  let envContent = '';
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Remove existing Sentry configuration
  envContent = envContent.replace(/^SENTRY_DSN=.*$/gm, '');
  envContent = envContent.replace(/^VITE_SENTRY_DSN=.*$/gm, '');
  
  // Add new Sentry configuration
  const sentryConfig = `
# =============================================================================
# ERROR MONITORING (SENTRY)
# =============================================================================

# Server-side error monitoring
SENTRY_DSN=${dsn}

# Client-side error monitoring
VITE_SENTRY_DSN=${dsn}
`;
  
  envContent = envContent.trim() + sentryConfig;
  
  // Write updated .env file
  fs.writeFileSync(envPath, envContent);
  
  console.log('\n✅ Sentry configuration added to .env file');
  
  // Create sentry.properties file for CLI
  const sentryPropsContent = `defaults.url=https://sentry.io/
defaults.org=your-org-slug
defaults.project=your-project-slug
auth.token=your-auth-token
`;
  
  const createProps = await question('\nDo you want to create sentry.properties for CLI integration? (y/N): ');
  if (createProps.toLowerCase() === 'y' || createProps.toLowerCase() === 'yes') {
    fs.writeFileSync(path.join(process.cwd(), 'sentry.properties'), sentryPropsContent);
    console.log('📄 Created sentry.properties file (remember to update with your actual values)');
  }
  
  console.log('\n🎉 Sentry setup complete!');
  console.log('\nNext steps:');
  console.log('1. Start your development server: npm run dev');
  console.log('2. Go to Settings > Developer tab to test Sentry integration');
  console.log('3. Check your Sentry dashboard for incoming events');
  console.log('4. Configure alerts and notifications in your Sentry project');
  console.log('\n📚 Documentation: docs/ERROR_MONITORING.md');
  
  rl.close();
}

setupSentry().catch(console.error);