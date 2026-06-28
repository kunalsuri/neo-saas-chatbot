#!/usr/bin/env node

/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 * 
 * CDN Setup Script
 * Interactive setup for CDN configuration
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

async function setupCDN() {
  console.log('🚀 Setting up CDN Integration for SaaS AI ChatBot\n');
  
  console.log('CDN providers supported:');
  console.log('1. CloudFlare (Free tier available)');
  console.log('2. AWS CloudFront (Pay-as-you-go)');
  console.log('3. Vercel Edge Network (Integrated)');
  console.log('4. Custom CDN Provider');
  console.log('5. Disable CDN\n');
  
  const provider = await question('Choose CDN provider (1-5): ');
  
  let cdnEnabled = false;
  let cdnBaseUrl = '';
  let cdnRegions = 'us-east-1,eu-west-1,ap-southeast-1';
  
  switch (provider) {
    case '1': // CloudFlare
      console.log('\n📋 CloudFlare Setup:');
      console.log('1. Sign up at https://cloudflare.com');
      console.log('2. Add your domain to CloudFlare');
      console.log('3. Update DNS to CloudFlare nameservers');
      console.log('4. Enable "Auto Minify" and set "Browser Cache TTL" to 1 year\n');
      
      const cfDomain = await question('Enter your domain (e.g., your-domain.com): ');
      if (cfDomain) {
        cdnEnabled = true;
        cdnBaseUrl = `https://${cfDomain}`;
        cdnRegions = 'auto';
      }
      break;
      
    case '2': // AWS CloudFront
      console.log('\n📋 AWS CloudFront Setup:');
      console.log('1. Create CloudFront distribution in AWS Console');
      console.log('2. Set origin to your domain');
      console.log('3. Configure cache behaviors for static assets\n');
      
      const cfUrl = await question('Enter CloudFront distribution URL: ');
      if (cfUrl) {
        cdnEnabled = true;
        cdnBaseUrl = cfUrl.startsWith('http') ? cfUrl : `https://${cfUrl}`;
      }
      break;
      
    case '3': // Vercel
      console.log('\n📋 Vercel Edge Network Setup:');
      console.log('1. Deploy your app to Vercel');
      console.log('2. CDN is automatically enabled\n');
      
      const vercelUrl = await question('Enter your Vercel app URL: ');
      if (vercelUrl) {
        cdnEnabled = true;
        cdnBaseUrl = vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`;
        cdnRegions = 'auto';
      }
      break;
      
    case '4': // Custom
      console.log('\n📋 Custom CDN Setup:');
      const customUrl = await question('Enter your CDN base URL: ');
      const customRegions = await question('Enter CDN regions (comma-separated) [us-east-1,eu-west-1,ap-southeast-1]: ');
      
      if (customUrl) {
        cdnEnabled = true;
        cdnBaseUrl = customUrl.startsWith('http') ? customUrl : `https://${customUrl}`;
        cdnRegions = customRegions || cdnRegions;
      }
      break;
      
    case '5': // Disable
      console.log('\n❌ CDN will be disabled');
      cdnEnabled = false;
      break;
      
    default:
      console.log('❌ Invalid selection. CDN will be disabled.');
      cdnEnabled = false;
  }
  
  // Read existing .env file or create new one
  const envPath = path.join(process.cwd(), '.env');
  let envContent = '';
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Remove existing CDN configuration
  envContent = envContent.replace(/^CDN_ENABLED=.*$/gm, '');
  envContent = envContent.replace(/^CDN_BASE_URL=.*$/gm, '');
  envContent = envContent.replace(/^CDN_REGIONS=.*$/gm, '');
  envContent = envContent.replace(/^VITE_CDN_ENABLED=.*$/gm, '');
  envContent = envContent.replace(/^VITE_CDN_BASE_URL=.*$/gm, '');
  
  // Add new CDN configuration
  const cdnConfig = `
# =============================================================================
# CDN CONFIGURATION
# =============================================================================

# Server-side CDN settings
CDN_ENABLED=${cdnEnabled}
${cdnBaseUrl ? `CDN_BASE_URL=${cdnBaseUrl}` : '# CDN_BASE_URL=https://cdn.your-domain.com'}
CDN_REGIONS=${cdnRegions}

# Client-side CDN settings
VITE_CDN_ENABLED=${cdnEnabled}
${cdnBaseUrl ? `VITE_CDN_BASE_URL=${cdnBaseUrl}` : '# VITE_CDN_BASE_URL=https://cdn.your-domain.com'}
`;
  
  envContent = envContent.trim() + cdnConfig;
  
  // Write updated .env file
  fs.writeFileSync(envPath, envContent);
  
  console.log('\n✅ CDN configuration saved to .env file');
  
  if (cdnEnabled) {
    console.log('\n🎉 CDN Setup Complete!');
    console.log(`📍 CDN Base URL: ${cdnBaseUrl}`);
    console.log(`🌍 Regions: ${cdnRegions}`);
    
    console.log('\nNext steps:');
    console.log('1. Restart your development server: npm run dev');
    console.log('2. Go to Settings > Performance to test CDN integration');
    console.log('3. Monitor performance improvements in the dashboard');
    console.log('4. Deploy to production with CDN enabled');
    
    console.log('\n📚 Documentation: docs/CDN_INTEGRATION.md');
  } else {
    console.log('\n📝 CDN is disabled. You can enable it later by running this script again.');
  }
  
  rl.close();
}

setupCDN().catch(console.error);