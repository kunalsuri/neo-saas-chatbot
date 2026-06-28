# Copyright (c) 2026 Kunal Suri (CEA LIST). All rights reserved.
# Licensed under the Apache License 2.0 (see LICENSE file)

# Modern and interactive first-time setup script for The NEO SaaS AI ChatBot Platform
# Designed for Windows PowerShell environments.

$ErrorActionPreference = "Stop"
$utf8 = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = $utf8

# Clear screen for a neat start
Clear-Host

# Aesthetics & Colors Helpers
function Write-Header ($text) {
    Write-Host ""
    Write-Host "======================================================================" -ForegroundColor Cyan
    Write-Host "   $text" -ForegroundColor White -Bold
    Write-Host "======================================================================" -ForegroundColor Cyan
}

function Write-Step ($stepNum, $text) {
    Write-Host ""
    Write-Host "[$stepNum/6] $text..." -ForegroundColor Cyan
}

function Write-Success ($text) {
    Write-Host "  [OK] $text" -ForegroundColor Green
}

function Write-Warning ($text) {
    Write-Host "  [!]  $text" -ForegroundColor Yellow
}

function Write-ErrorMsg ($text) {
    Write-Host "  [ERR] $text" -ForegroundColor Red
}

function Write-Info ($text) {
    Write-Host "  [i]  $text" -ForegroundColor Gray
}

# Safe input choice helper
function Get-Choice ($val, $default) {
    if ([string]::IsNullOrWhiteSpace($val)) {
        return $default
    }
    return $val.Trim().ToLower()
}

# 1. Title ASCII Banner
Write-Host "  _   _ _____  ___     ____    _      _    ____   " -ForegroundColor Green
Write-Host " | \ | | ____|/ _ \   / ___|  / \    / \  / ___|  " -ForegroundColor Green
Write-Host " |  \| |  _| | | | |  \___ \ / _ \  / _ \ \___ \  " -ForegroundColor Green
Write-Host " | |\  | |___| |_| |   ___) / ___ \/ ___ \ ___) | " -ForegroundColor Green
Write-Host " |_| \_|_____|\___/   |____/_/   \_\_/   \_\____/  " -ForegroundColor Green
Write-Host ""
Write-Host "                       The NEO SaaS AI ChatBot Platform" -ForegroundColor Green
Write-Host "                      Developed by Kunal Suri @ 2026" -ForegroundColor Green

Write-Header "THE NEO SAAS - LOCAL DEVELOPMENT SETUP"

# 2. Check Node.js and NPM requirements
Write-Step 1 "Checking System Prerequisites"

# Check Node.js
$nodeInstalled = $false
try {
    $nodeVersion = node -v 2>$null
    if ($nodeVersion) {
        $nodeInstalled = $true
        $cleanVer = $nodeVersion.Trim().TrimStart('v')
        $major = [int]($cleanVer.Split('.')[0])
        
        if ($major -ge 20) {
            Write-Success "Node.js v$cleanVer is installed (Recommended: v20+)"
        } elseif ($major -ge 18) {
            Write-Success "Node.js v$cleanVer is installed (Minimum: v18+)"
        } else {
            Write-Warning "Node.js v$cleanVer is installed, but v20+ is highly recommended."
        }
    }
} catch {
    # Catch any runtime failures
}

if (-not $nodeInstalled) {
    Write-ErrorMsg "Node.js is not installed or not in your PATH."
    Write-Info "Please download and install Node.js v20.x or higher from https://nodejs.org/"
    Exit 1
}

# Check npm
$npmInstalled = $false
try {
    $npmVersion = npm -v 2>$null
    if ($npmVersion) {
        $npmInstalled = $true
        $cleanNpmVer = $npmVersion.Trim()
        Write-Success "npm v$cleanNpmVer is installed"
    }
} catch {}

if (-not $npmInstalled) {
    Write-ErrorMsg "npm is not installed or not in your PATH."
    Write-Info "npm is typically installed with Node.js. Please verify your Node.js installation."
    Exit 1
}

# 3. Setup Environment Variables
Write-Step 2 "Configuring Environment Variables"
if (Test-Path .env) {
    Write-Success ".env file already exists"
} else {
    Write-Info "Creating .env file from template..."
    if (Test-Path .env.development.example) {
        Copy-Item .env.development.example .env -Force
        Write-Success "Created .env file from .env.development.example"
        Write-Warning "Please edit .env file with your actual API keys and database URL if needed."
    } else {
        Write-ErrorMsg "Could not find .env.development.example file to copy!"
    }
}

# 4. Setup Synthetic Local Data
Write-Step 3 "Configuring Private Runtime Data Directory"
$dataDir = "./data"
$templatesDir = "./docs/setup-templates"

if (-not (Test-Path $dataDir)) {
    Write-Info "Creating $dataDir folder..."
    New-Item -ItemType Directory -Path $dataDir -Force | Out-Null
    Write-Success "Created data folder"
} else {
    Write-Success "Data folder already exists"
}

# Copy files from templates to data if they don't exist
if (Test-Path $templatesDir) {
    $templateFiles = Get-ChildItem -Path $templatesDir -Filter *.json
    $copiedCount = 0
    foreach ($file in $templateFiles) {
        $destPath = Join-Path $dataDir $file.Name
        if (-not (Test-Path $destPath)) {
            Copy-Item $file.FullName $destPath -Force
            $copiedCount++
        }
    }
    if ($copiedCount -gt 0) {
        Write-Success "Seeded $copiedCount database template files into local $dataDir folder"
    } else {
        Write-Success "All database files are already present in local $dataDir folder"
    }
} else {
    Write-Warning "Templates folder $templatesDir not found. Database files will be auto-generated at startup."
}

# 5. Install Dependencies
Write-Step 4 "Installing Project Dependencies"
$runInstall = $false

if (Test-Path node_modules) {
    Write-Success "Dependencies are already installed (node_modules folder exists)."
    Write-Host "Would you like to run 'npm install' to update them? (y/N): " -NoNewline
    $installChoice = Read-Host
    if ((Get-Choice $installChoice "n") -eq 'y') {
        $runInstall = $true
    } else {
        Write-Info "Skipping dependency installation."
    }
} else {
    Write-Host "Would you like to run 'npm install' now? (Y/n): " -NoNewline
    $installChoice = Read-Host
    if ((Get-Choice $installChoice "y") -eq 'y') {
        $runInstall = $true
    } else {
        Write-Warning "Skipped dependency installation."
    }
}

if ($runInstall) {
    Write-Info "Running 'npm install' in progress, please wait..."
    try {
        cmd.exe /c npm install
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Dependencies installed successfully!"
        } else {
            Write-ErrorMsg "Dependency installation failed (Exit Code: $LASTEXITCODE)."
            Exit 1
        }
    } catch {
        Write-ErrorMsg "Failed to run npm install: $_"
        Exit 1
    }
}

# 6. Rebuild client
Write-Step 5 "Building Client Assets"
$runBuild = $false

if (Test-Path dist) {
    Write-Success "Build assets already exist (dist folder is present)."
    Write-Host "Would you like to rebuild client and server? (y/N): " -NoNewline
    $buildChoice = Read-Host
    if ((Get-Choice $buildChoice "n") -eq 'y') {
        $runBuild = $true
    } else {
        Write-Info "Skipping build."
    }
} else {
    Write-Host "Would you like to run 'npm run build' now? (Y/n): " -NoNewline
    $buildChoice = Read-Host
    if ((Get-Choice $buildChoice "y") -eq 'y') {
        $runBuild = $true
    } else {
        Write-Warning "Skipped building assets."
    }
}

if ($runBuild) {
    Write-Info "Running 'npm run build' in progress, please wait..."
    try {
        cmd.exe /c npm run build
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Client and server built successfully!"
        } else {
            Write-ErrorMsg "Project build failed (Exit Code: $LASTEXITCODE)."
            Exit 1
        }
    } catch {
        Write-ErrorMsg "Failed to run npm run build: $_"
        Exit 1
    }
}

# 7. Port check
Write-Step 6 "Verifying Port Availability (Port 5000)"
$portInUse = $false
$owningPids = @()

try {
    # Check connections on port 5000
    $connections = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
    if ($connections) {
        $portInUse = $true
        foreach ($conn in $connections) {
            $owningPids += $conn.OwningProcess
        }
        $owningPids = $owningPids | Select-Object -Unique
    }
} catch {
    # Fallback to netstat if Get-NetTCPConnection fails or is restricted
    try {
        $netstat = netstat -ano | Select-String ":5000\s+"
        if ($netstat) {
            $portInUse = $true
            foreach ($line in $netstat) {
                $parts = $line.ToString().Split(' ', [System.StringSplitOptions]::RemoveEmptyEntries)
                if ($parts.Length -eq 5) {
                    $owningPids += [int]$parts[4]
                }
            }
            $owningPids = $owningPids | Select-Object -Unique
        }
    } catch {}
}

if ($portInUse) {
    Write-Warning "Port 5000 is currently occupied."
    foreach ($pid in $owningPids) {
        $procName = "Unknown"
        try {
            $procName = (Get-Process -Id $pid -ErrorAction SilentlyContinue).ProcessName
        } catch {}
        Write-Info "Process using Port 5000: $procName (PID: $pid)"
    }
    
    Write-Host "Would you like to terminate these process(es) to free up Port 5000? (y/N): " -NoNewline
    $killChoice = Read-Host
    if ((Get-Choice $killChoice "n") -eq 'y') {
        foreach ($pid in $owningPids) {
            try {
                Stop-Process -Id $pid -Force
                Write-Success "Terminated PID $pid"
            } catch {
                Write-ErrorMsg "Failed to terminate PID $pid. You may need to run this shell as Administrator."
            }
        }
    } else {
        Write-Warning "Port 5000 is still occupied. The server may fail to start if port conflict persists."
    }
} else {
    Write-Success "Port 5000 is free and ready to use."
}

# 8. Setup Completion
Write-Header "SETUP COMPLETE & LAUNCH READY!"
Write-Host ">> Congratulations! The NEO SaaS AI ChatBot Platform is set up." -ForegroundColor Green
Write-Host ""
Write-Host "To start the development server now, type 'Y'."
Write-Host "Otherwise, you can start it later using: npm run dev"
Write-Host ""
Write-Host "Would you like to start the server now? (Y/n): " -NoNewline
$runChoice = Read-Host

if ((Get-Choice $runChoice "y") -eq 'y') {
    Write-Info "Starting development server in a new window..."
    try {
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal
        Write-Success "Development server launched!"
        Write-Host ""
        Write-Host ">> You can access the interface at: http://localhost:5000" -ForegroundColor Green
        Write-Host ">> To stop the server later, close the new PowerShell window." -ForegroundColor Yellow
        Write-Host ""
    } catch {
        Write-ErrorMsg "Failed to launch server in a new window: $_"
        Write-Info "Starting in this window instead. Press Ctrl+C to exit."
        cmd.exe /c npm run dev
    }
} else {
    Write-Host "Start the server later by running:" -ForegroundColor Gray
    Write-Host "  npm run dev" -ForegroundColor Cyan
    Write-Host ""
}
