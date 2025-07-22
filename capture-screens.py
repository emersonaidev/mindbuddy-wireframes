#!/usr/bin/env python3
"""
Script to capture screenshots of HTML screens using Playwright
This will create proper visual representations of the screens
"""

import asyncio
from pathlib import Path

# Try to use Playwright if available
try:
    from playwright.async_api import async_playwright
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False
    print("Playwright not installed. Install with: pip install playwright && playwright install")

# Define the screens structure
screens = {
    'onboarding': [
        ('Welcome', 'v1/screens/auth/welcome.html'),
        ('How It Works', 'v1/screens/auth/how-it-works.html'),
        ('Choose Data', 'v1/screens/auth/choose-data.html'),
        ('Connect Data', 'v1/screens/auth/connect-data.html'),
        ('Success', 'v1/screens/auth/success.html')
    ],
    'authentication': [
        ('Login', 'v1/screens/auth/login.html'),
        ('Create Account', 'v1/screens/auth/create-account.html'),
        ('Email Verification', 'v1/screens/auth/email-verification.html'),
        ('Forgot Password', 'v1/screens/auth/forgot-password.html'),
        ('SSO Apple', 'v1/screens/auth/sso-apple.html'),
        ('SSO Google', 'v1/screens/auth/sso-google.html')
    ],
    'dashboard': [
        ('Dashboard', 'v1/screens/dashboard/main.html'),
        ('Insights', 'v1/screens/insights/main.html')
    ],
    'health': [
        ('Health Overview', 'v1/screens/health/main.html'),
        ('Resilience Score', 'v1/screens/health/resilience-score.html'),
        ('Heart Rate Detail', 'v1/screens/health/heart-rate-detail.html'),
        ('HRV Detail', 'v1/screens/health/hrv-detail.html'),
        ('Sleep Detail', 'v1/screens/health/sleep-detail.html'),
        ('Activity Detail', 'v1/screens/health/activity-detail.html')
    ],
    'rewards': [
        ('Rewards Hub', 'v1/screens/rewards/main.html'),
        ('Earn More', 'v1/screens/rewards/earn-more.html'),
        ('Exchange', 'v1/screens/rewards/exchange.html'),
        ('Withdraw', 'v1/screens/rewards/withdraw.html'),
        ('History', 'v1/screens/rewards/history.html')
    ],
    'profile': [
        ('Profile', 'v1/screens/profile/main.html'),
        ('Personal Info', 'v1/screens/profile/personal-info.html'),
        ('Security', 'v1/screens/profile/security.html'),
        ('Notifications', 'v1/screens/profile/notifications.html'),
        ('Data Permissions', 'v1/screens/profile/data-permissions.html'),
        ('Data Reputation Score', 'v1/screens/profile/data-reputation-score.html'),
        ('Connected Devices', 'v1/screens/profile/connected-devices.html'),
        ('Wallet Connection', 'v1/screens/profile/wallet-connection.html'),
        ('Subscription', 'v1/screens/profile/subscription.html'),
        ('Help Center', 'v1/screens/profile/help-center.html')
    ],
    'errors': [
        ('Empty State', 'v1/screens/errors/empty-state.html'),
        ('Generic Error', 'v1/screens/errors/generic-error.html'),
        ('Network Error', 'v1/screens/errors/network-error.html'),
        ('Permission Denied', 'v1/screens/errors/permission-denied.html'),
        ('Loading', 'v1/screens/errors/loading.html')
    ],
    'legal': [
        ('Terms & Conditions', 'v1/screens/legal/terms.html'),
        ('Privacy Policy', 'v1/screens/legal/privacy.html'),
        ('Security & Compliance', 'v1/screens/legal/security-compliance.html')
    ]
}

async def capture_screen(page, html_path, output_path):
    """Capture a single screen"""
    try:
        # Navigate to the HTML file
        file_url = f"file://{Path(html_path).absolute()}"
        await page.goto(file_url)
        
        # Wait for content to load
        await page.wait_for_timeout(1000)
        
        # Take screenshot
        await page.screenshot(path=output_path, full_page=False)
        
        return True
    except Exception as e:
        print(f"Error capturing {html_path}: {e}")
        return False

async def capture_all_screens():
    """Capture all screens using Playwright"""
    if not PLAYWRIGHT_AVAILABLE:
        print("Playwright is required for screen capture.")
        return
    
    async with async_playwright() as p:
        # Launch browser
        browser = await p.chromium.launch(headless=True)
        
        # Create a page with iPhone 14 Pro viewport
        context = await browser.new_context(
            viewport={'width': 393, 'height': 852},
            device_scale_factor=2
        )
        page = await context.new_page()
        
        # Create output directories
        base_dir = Path('.')
        output_base = Path('screen-captures')
        
        for category in screens.keys():
            (output_base / category).mkdir(parents=True, exist_ok=True)
        
        total_captured = 0
        total_failed = 0
        
        print("Capturing screens...")
        
        for category, screen_list in screens.items():
            print(f"\nProcessing {category}...")
            category_dir = output_base / category
            
            for screen_name, html_path in screen_list:
                html_file = base_dir / html_path
                png_filename = f"{screen_name.lower().replace(' ', '-')}.png"
                png_file = category_dir / png_filename
                
                if html_file.exists():
                    if await capture_screen(page, html_file, png_file):
                        print(f"  ✓ {screen_name} -> {png_filename}")
                        total_captured += 1
                    else:
                        print(f"  ✗ {screen_name} (capture failed)")
                        total_failed += 1
                else:
                    print(f"  ✗ {screen_name} (file not found: {html_path})")
                    total_failed += 1
        
        await browser.close()
        
        print(f"\n{'='*50}")
        print(f"Capture complete!")
        print(f"Total captured: {total_captured}")
        print(f"Total failed: {total_failed}")
        print(f"Screenshots saved in: {output_base.absolute()}")

def create_figma_import_instructions():
    """Create instructions for importing to Figma"""
    instructions = """# Importing Screens to Figma

Since the SVG conversion has issues with complex HTML/CSS, here are alternative approaches:

## Option 1: Manual Screenshots
1. Open index.html in your browser
2. Click on each wireframe to open focus mode
3. Take screenshots using browser developer tools:
   - Chrome: DevTools > Device Toolbar > Set to iPhone 14 Pro (393x852)
   - Take screenshot using the camera icon
4. Import PNG files to Figma

## Option 2: Use Figma HTML to Design Plugin
1. Install "HTML to Design" plugin in Figma
2. Copy the HTML content from each screen file
3. Paste into the plugin to convert to Figma layers

## Option 3: Browser Extension
1. Use "Figma to HTML" or similar browser extensions
2. Navigate to each screen
3. Capture and import directly to Figma

## Option 4: Design Recreation
Given the clean, minimalist design of MindBuddy:
1. Create a base iPhone 14 Pro frame (393x852)
2. Use the screenshots as reference
3. Recreate using Figma's native components

## Screen Organization
Organize your Figma file with these pages:
- Onboarding (5 screens)
- Authentication (6 screens)
- Dashboard (2 screens)
- Health (6 screens)
- Rewards (5 screens)
- Profile (10 screens)
- Errors (5 screens)
- Legal (3 screens)

Total: 42 screens
"""
    
    with open('FIGMA_IMPORT_GUIDE.md', 'w') as f:
        f.write(instructions)
    
    print("\nCreated FIGMA_IMPORT_GUIDE.md with import instructions")

if __name__ == "__main__":
    # Create import instructions
    create_figma_import_instructions()
    
    # Try to capture screens if Playwright is available
    if PLAYWRIGHT_AVAILABLE:
        asyncio.run(capture_all_screens())
    else:
        print("\nTo capture screens automatically, install Playwright:")
        print("pip install playwright")
        print("playwright install")